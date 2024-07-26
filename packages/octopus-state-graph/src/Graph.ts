/* eslint-disable no-debugger */
import { IGraph, IGraphOptions } from "./IGraph.js";
import { INamed, INode, isReportingNode } from "./INode.js";
import { DirectedAcyclicGraph } from "typescript-graph";
import { ISerializedGraph } from "./ISerializedGraph.js";
import { isStateful, IStateful } from "./IStateful.js";
import { INodeWrapper } from "./INodeWrapper.js";

interface INodeContainer {
  [nodeName: string]: INode;
}

const isBrowser =
  Object.getPrototypeOf(Object.getPrototypeOf(globalThis)) !== Object.prototype;

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const PROPS = /\({(?<args>[^}]*)}/;
const PROPS_2ND_ARG = /\((([^,{]*)|({[^}]*})),{(?<args>[^}]*)}/;
const WHITESPACE = /\s+/g;

/**
 * Extracts the property names from a destructuring assignment in a function's argument list.
 * Rollup renaming obliges us to use this destructuring assignment rather than a plain argument list.
 * reup() functions take just one argument. If a wrapper needs to add predecessors to a node,
 * the object containing these will be the second argument after the nodeVal
 * @param func The reup or wrapperFunc from which we needed
 * @param position 0 default or 1 for wrappers, where the nodeVal is the first arg
 * @returns
 */
export function getParamNames(func: Function, position?: Number) {
  const fnStr = func
    .toString()
    .replaceAll(STRIP_COMMENTS, "")
    .replaceAll(WHITESPACE, "");
  let props: RegExpExecArray;
  if (position === 1) {
    props = PROPS_2ND_ARG.exec(fnStr);
  } else {
    props = PROPS.exec(fnStr);
  }

  if (!props?.groups?.args) return [];
  const result = props.groups.args
    .split(",")
    // rollup will rename the destructuring assignments
    .map((p) => (p.indexOf(":") !== -1 ? p.substring(0, p.indexOf(":")) : p));
  //console.log(result)
  return result;
}

// https://stackoverflow.com/a/6472397/1585345
// tried a load of things to decouple graph from Vue. Ideally consumers could make the output reactive when this function
// returns, but I never succeeded.
export function createGraph(options?: IGraphOptions): IGraph {
  const { reupWrapper, debug } = options || {};
  // we pass in Vue.reactive(). Best solution I found for using the output in Vue. Should also work for mobx-react observable.

  // radically simple, we need get the reactive proxy in first. This is way to simple unfortunately.
  const state: any = {}; //stateWrapper ? stateWrapper({}) : {};

  // Create the graph https://segfaultx64.github.io/typescript-graph/
  const graph = new DirectedAcyclicGraph<INamed>((n: INamed) => n.name);

  // Not obvious how to address nodes once in the graph, so I'll add them to my own container as well.
  const nodes: Record<string, INode> = {};
  let resolvedPredecessors: { [nodeName: string]: string[] } = {};

  // this array will be keyed on nodeName
  const methods = {};

  // topological sort permits traversal
  let sortedNodeNames: string[] = [];
  const edges: [{ from: string; to: string }?] = [];

  /**
   * nodeWrappers is an object with nodeNames for keys, and an array of wrappers
   * which will be sorted by priority at build time.
   */
  const nodeWrappers: Record<string, INodeWrapper[]> = {};

  /**
   * wrappers can pick their targets with a filtering function, like
   * reporting nodes. These wrappers will be applied at build time,
   * when all plain nodes have been added. We'll park them here in the meantime.
   * (The type is an array of tuples [filteringFunction, wrappingFunction])
   */
  const unbuiltReportingWrappers: [Function, INodeWrapper][] = [];

  let octopusDevtoolsPresent = false;
  if (isBrowser) {
    window.addEventListener("message", (ev) => {
      if (ev?.data?.octopusDevtoolsPresent) {
        //console.log("Octopus devtools has signalled its presence")
        octopusDevtoolsPresent = true;
      }
    });
  }

  // wrappers can initiate changes, if for example, management changes
  const onWrapperChanged = async (nodeName: string, publishVal: any) => {
    if (state[nodeName] && !compareShape(state[nodeName], publishVal)) {
      console.warn(
        `onWrapperChanged ${nodeName}, the new shape returned is not equal to the old one. Here are the two values, old one first...`
      );
    }

    // start traversing from node,
    await fullTraversal(sortedNodeNames.findIndex((el) => el === nodeName) + 1);
  };

  function addNode(nodeName: string, node: INode) {
    if (!nodeName) throw new Error(`We can't add a node without a name.`);
    if (!node)
      throw new Error(
        `Missing argument "node" for node "${nodeName}". addNode() requires a node.`
      );
    if (!node.val)
      throw new Error(
        `"node" must have a "val" property. If the node "${nodeName}" publishes nothing, supply an empty object.`
      );
    nodes[nodeName] = node;
    graph.insert({ name: nodeName });

    wrapMethodsWithProxy(nodeName, node);

    return { val: node.val, methods: node.methods };
  }
  function wrapANode(target: string, wrapper: INodeWrapper) {
    if (!nodeWrappers[target])
      Object.defineProperty(nodeWrappers, target, {
        value: [],
        configurable: true,
        enumerable: true,
        writable: true,
      });
    nodeWrappers[target].push(wrapper);
  }

  const wrapNodes = (
    nodesToWrap: string | string[] | Function,
    wrapper: INodeWrapper
  ) => {
    // wrap one node identified by name, we just pop the wrapper directly into the final wrappers object, keyed on the node name
    if (typeof nodesToWrap === "string") {
      wrapANode(nodesToWrap, wrapper);
    }
    // apply the same wrapper to a number of named nodes
    else if (typeof nodesToWrap === "object") {
      for (const target of nodesToWrap) {
        wrapANode(target, wrapper);
      }
    }
    // "reporting" wrapper. Put to one side and we'll figure out which nodes during build
    else if (typeof nodesToWrap === "function") {
      unbuiltReportingWrappers.push([nodesToWrap, wrapper]);
    }
  };

  function wrapMethodsWithProxy(nodeName: string, node: INode) {
    if (node.methods) {
      // If a top level property is a function, bind it to the target
      node.methods = new Proxy(node.methods, {
        get(target, property, receiver) {
          if (typeof target[property as string] === "function") {
            return target[property as string].bind(target);
          } else {
            return Reflect.get(target, property, receiver);
          }
        },
      });

      // here, we automate calling reup after any method called on node
      for (const prop in node.methods) {
        if (
          Object.prototype.hasOwnProperty.call(node.methods, prop) &&
          typeof node.methods[prop] === "function"
        ) {
          node.methods[prop] = new Proxy(node.methods[prop], {
            apply: async function (target, thisArg, argArray) {
              // execute the method
              reupWrapper
                ? await reupWrapper(target(...argArray))
                : await target(...argArray);
              // copy the result
              assignValueToOutput(nodeName, node.val);
              // magic step. Launch a full traversal starting with node itself.
              await fullTraversal(sortedNodeNames.indexOf(nodeName));
            },
          });
        }
      }

      // the wrapper might have been added before the node
      const newMethods = node.methods;
      methods[nodeName] = { ...methods[nodeName], ...newMethods };
    }
  }

  /**
   * BUILD
   */
  const build = () => {
    for (const nodeName in nodes) {
      const node = nodes[nodeName];
      if (node.reup) {
        // radically simple !
        if (node.options && typeof node.options.dependsOn === "function") {
          // predecessors for reporting nodes
          resolvedPredecessors[nodeName] = Object.entries(nodes)
            // ...those nodes that match the reporting filter function
            .filter(
              ([targetName, targetNode]) =>
                nodeName !== targetName &&
                node.options.dependsOn(targetName, targetNode.val)
            )
            // (just add the names)
            .map(([key, val]) => key);
        } else {
          // predecessors for plain nodes
          resolvedPredecessors[nodeName] = getParamNames(node.reup);
        }
      }

      // for each reporting wrapper
      for (const [filterFunc, wrapper] of unbuiltReportingWrappers) {
        // if the current node matches the filter func
        if (filterFunc(nodeName, node.val)) {
          if (!nodeWrappers[nodeName]) nodeWrappers[nodeName] = [];
          nodeWrappers[nodeName].push(wrapper);
        }
      }
      // once all the wrappers are in for a node, we can add any dependencies from the wrapper to the node
      if (nodeWrappers[nodeName]) {
        for (const wrapper of nodeWrappers[nodeName]) {
          const wrapperPredecessors = getParamNames(wrapper.wrapperFunc, 1);
          // if both wrapper and node have predecessors, merge the two arrays
          if (wrapperPredecessors.length && resolvedPredecessors[nodeName])
            resolvedPredecessors[nodeName] = Array.from(
              new Set(
                resolvedPredecessors[nodeName].concat(wrapperPredecessors)
              )
            );
          else if (wrapperPredecessors.length)
            resolvedPredecessors[nodeName] = wrapperPredecessors;
        }
        // ... and sort them...
        nodeWrappers[nodeName].sort(
          (a, b) => (a.priority || 0) - (b.priority || 0)
        );
      }

      // store initial value. Moved this to build() to give nodes a chance to load serialized state
      assignValueToOutput(nodeName, node.val);

      addEdges(nodeName);
      if (node.reup && reupWrapper) node.reup = reupWrapper(node.reup);
    }

    sortedNodeNames = graph.topologicallySortedNodes().map((n) => n.name);

    //check for orphaned wrappers
    const wrappersWithoutNodes = Object.entries(nodeWrappers)
      .map(([key, val]) => key)
      .filter((wrapperForNode) => !nodes[wrapperForNode]);
    if (wrappersWithoutNodes.length)
      console.warn(
        "While building the graph, we can't help but notice that wrappers have been supplied for the following nodes that don't exist... " +
          wrappersWithoutNodes.join(", ")
      );
  };

  function addEdges(nodeName: string) {
    resolvedPredecessors[nodeName]?.forEach((predecessor) => {
      if (predecessor === "$nodeName") return;
      try {
        graph.addEdge(predecessor, nodeName);
        edges.push({ from: predecessor, to: nodeName });
      } catch (err) {
        const newMessage = `Octopus cannot create edge from ${predecessor} to ${nodeName}\n${err.message}`;
        throw new Error(newMessage);
      }
    });
  }

  // what do we think about this? It makes a copy. Since radically simple, user code mutates val directly,
  // then pass a reference to this object???
  function assignValueToOutput(nodeName: string, value: any): void {
    if (typeof value === "object")
      //state[nodeName] = Object.assign({}, value)
      state[nodeName] = JSON.parse(JSON.stringify(value));
    // sinks don't put anything in state
    else if (state[nodeName] !== undefined && value !== undefined)
      state[nodeName] = value;
  }

  const executeOneNode = async (currNodeName: string) => {
    const currNode = nodes[currNodeName];
    let predecessorOutput: any = null;
    // radically simple, reup now takes an array.
    predecessorOutput = {};
    if (
      resolvedPredecessors[currNodeName] &&
      resolvedPredecessors[currNodeName].length
    ) {
      resolvedPredecessors[currNodeName].forEach((pName) => {
        let predecessorState;
        // reporting wrappers may need to know the names of the nodes they wrap.
        // They do this by adding the reserved prop '$nodeName' to the predecessors object
        if (pName === "$nodeName") predecessorState = currNodeName;
        else predecessorState = state[pName];
        // if (!predecessorState)
        //   debugger
        Object.defineProperty(predecessorOutput, pName, {
          value: JSON.parse(JSON.stringify(predecessorState)),
          configurable: true,
          enumerable: true,
          writable: true,
        });
      });
    }

    try {
      /** ****************************       CALL THE NODE        **********************************
       * Nodes without a reup may still have wrappers that need to execute. Call reup if it exists.
       */
      if (currNode.reup) {
        if (!isReportingNode(currNode)) {
          await currNode.reup(predecessorOutput);
        }
        // radically simple, reporting nodes don't know or care about the names of their inputs, we'll give them an array they can iterate over
        else {
          await currNode.reup(Object.values(predecessorOutput));
        }
      }
      /** ****************************      CALL THE WRAPPERS      **********************************
       * radically simple. We used to pass the newVal. Now we just pass the node val for modification
       */
      if (nodeWrappers[currNodeName])
        for (const wrapper of nodeWrappers[currNodeName]) {
          await wrapper.wrapperFunc(currNode.val, predecessorOutput);
        }

      assignValueToOutput(currNodeName, currNode.val);
    } catch (Ex) {
      console.error(`Error executing node ${currNodeName}. Error follows`);
      console.error(Ex);
    }
  };

  const fullTraversal = async (startingFrom = 0) => {
    //console.log(`Full traversal starting from ${sortedNodeNames[startingFrom]}`)
    if (!sortedNodeNames.length)
      throw new Error("Graph not built or loaded. We cannot traverse.");
    for (let i = startingFrom; i < sortedNodeNames.length; i++) {
      const currNodeName = sortedNodeNames[i];
      //console.log(`traversing ${i} - ${currNode}`)
      // radically simple, a full traversal starts with the node which has just changed. It needs to reup whether or not it has inputs. The others, only if they have inputs.
      if (
        nodes[currNodeName] &&
        (i === startingFrom ||
          (resolvedPredecessors[currNodeName] &&
            resolvedPredecessors[currNodeName].length > 0))
      )
        await executeOneNode(currNodeName);
    }
    // only send traversal report if debug is set
    if (debug) {
      if (octopusDevtoolsPresent || standAloneDevtools) {
        const message = {
          source: "octopus",
          topic: "traversalReport",
          version: 1,
          data: {
            sortedNodeNames,
            edges,
            state,
            methods,
            initiator: sortedNodeNames[startingFrom],
          },
        };
        if (octopusDevtoolsPresent) {
          const messageCopy = JSON.parse(JSON.stringify(message));
          for (const node in methods) {
            messageCopy.data.methods[node] = Object.getOwnPropertyNames(
              methods[node]
            );
          }
          window.postMessage(messageCopy, "*");
        }
        if (standAloneDevtools) {
          const newCopy = JSON.parse(JSON.stringify(message));
          for (const node in methods) {
            newCopy.data.methods[node] = Object.getOwnPropertyNames(
              methods[node]
            );
          }
          standAloneDevtools.postMessage(newCopy, "*");
        }
      }
    }
  };
  // we'll expose this version with no parameter
  async function publicFullTraversal() {
    await fullTraversal();
    return;
  }
  function compareShape(a, b) {
    if (whatIs(a) !== whatIs(b)) return false;
    if (typeof a === "object") {
      const aKeys = Object.keys(a).sort();
      const bKeys = Object.keys(b).sort();
      return JSON.stringify(aKeys) === JSON.stringify(bKeys);
    }
    return true;
  }
  function whatIs(value) {
    return Object.prototype.toString
      .call(value)
      .replace(/^\[object\s+([a-z]+)\]$/i, "$1")
      .toLowerCase();
  }
  async function _loadState(
    storedState: ISerializedGraph,
    currentGraphVersion: number
  ): Promise<IGraph> {
    if (currentGraphVersion === storedState.savedAtVersion) {
      sortedNodeNames = storedState.topologicalSort;
      const sameLength = sortedNodeNames.length === Object.keys(nodes).length;
      const allSerializedPresent = sortedNodeNames.reduce(
        (acc, curr) => acc && !!nodes[curr],
        true
      );
      if (!sameLength || !allSerializedPresent) {
        throw new Error(
          "The serialized state doesn't match the current graph. Remember to increment the graph version (arg to saveState() and loadState()) to trigger a rebuild."
        );
      }
      resolvedPredecessors = storedState.resolvedPredecessors;
      sortedNodeNames.forEach((nodeName) => addEdges(nodeName));
    } else {
      build();
    }

    for (const nodeName of sortedNodeNames) {
      const currNode = nodes[nodeName];
      if (isStateful(currNode)) {
        currNode.loadState(storedState.nodeStates[nodeName]);
      }
      // for sources, initialValue is the only way of getting a value out, so we'll read it
      // after loading state.
      if (currNode.val) state[nodeName] = currNode.val;
    }
    // after state has been loaded, we traverse. Everything will
    // reup, taking account of loaded values. Recalculation
    // needs to be async
    await fullTraversal();

    return {
      state,
      methods,
      build,
      addNode,
      wrapNodes,
      fullTraversal: publicFullTraversal,
      loadState,
      saveState,
      registerDevtools,
      dispose,
    };
  }

  async function loadState(
    storedState: ISerializedGraph,
    currentGraphVersion: number
  ): Promise<IGraph> {
    if (reupWrapper) {
      const loadedGraph = reupWrapper(_loadState)(
        storedState,
        currentGraphVersion
      );
      console.log("wrapping reups");
      for (const nodeName of sortedNodeNames) {
        const node = nodes[nodeName];
        if (node.reup) node.reup = reupWrapper(node.reup);
      }
      return loadedGraph;
    } else return _loadState(storedState, currentGraphVersion);
  }

  function saveState(currentGraphVersion): ISerializedGraph {
    const returnVal = {
      resolvedPredecessors,
      topologicalSort: sortedNodeNames,
      nodeStates: {},
      savedAtVersion: currentGraphVersion,
    };

    for (const nodeName of Object.getOwnPropertyNames(state)) {
      const currNode = nodes[nodeName];
      if (isStateful(currNode))
        returnVal.nodeStates[nodeName] = currNode.saveState();
    }
    return returnVal;
  }
  let standAloneDevtools: Window;
  let standAloneDevtoolsUrl: string;
  function registerDevtools(devtools: Window, origin: string) {
    standAloneDevtools = devtools;
    standAloneDevtoolsUrl = origin;
  }
  async function dispose() {
    for (let i = 0; i < sortedNodeNames.length; i++) {
      const currNodeName = sortedNodeNames[i];
      // radically simple, a full traversal starts with the node which has just changed. It needs to reup whether or not it has inputs. The others, only if they have inputs.
      if (nodes[currNodeName].dispose) {
        try {
          await nodes[currNodeName].dispose();
        } catch (e) {
          console.error(
            `Error disposing of ${currNodeName}. Error follows. Disposing continues.`
          );
        }
      }
    }
  }
  return {
    state,
    methods,
    build,
    addNode,
    wrapNodes,
    fullTraversal: publicFullTraversal,
    loadState,
    saveState,
    registerDevtools,
    dispose,
  };
}
