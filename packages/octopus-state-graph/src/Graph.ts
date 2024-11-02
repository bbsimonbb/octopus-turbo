/* eslint-disable no-debugger */
import { IGraph, IGraphOptions } from "./IGraph.js";
import { INamed } from "./INode.js";
import { DirectedAcyclicGraph } from "typescript-graph";
import { ISerializedGraph } from "./ISerializedGraph.js";
import { isStateful, IStateful } from "./IStateful.js";
import { INodeWrapper } from "./INodeWrapper.js";
import {
  INodeInternal,
  INodeKernel,
  JustTheFunctions,
  JustTheValues,
} from "./NewTypes.js";

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
  // just-an-object, let's move away from this completely. Everything is in nodes.
  //const state: any = {}; //stateWrapper ? stateWrapper({}) : {};

  // Create the graph https://segfaultx64.github.io/typescript-graph/
  const tsGraph = new DirectedAcyclicGraph<INamed>((n: INamed) => n.name);

  // Not obvious how to address nodes once in the graph, so I'll add them to my own container as well.
  const nodes: Record<string, INodeInternal> = {};

  // this array will be keyed on nodeName
  // just-an-object, let's move away from this completely. Everything is in nodes.
  //const methods = {};

  // topological sort permits traversal
  let sortedNodeNames: string[] = [];
  const edges: [{ from: string; to: string }?] = [];

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
  // const onWrapperChanged = async (nodeName: string, publishVal: any) => {
  //   if (state[nodeName] && !compareShape(state[nodeName], publishVal)) {
  //     console.warn(
  //       `onWrapperChanged ${nodeName}, the new shape returned is not equal to the old one. Here are the two values, old one first...`
  //     );
  //   }

  //   // start traversing from node,
  //   await fullTraversal(sortedNodeNames.findIndex((el) => el === nodeName) + 1);
  // };

  function addNode<T extends object>(
    nodeName: string,
    node: T,
    kernel?: INodeKernel
  ): T {
    if (!nodeName) throw new Error(`We can't add a node without a name.`);
    if (!node)
      throw new Error(
        `Missing argument "node" for node "${nodeName}". addNode() requires a node.`
      );
    // their might already be an entry for the node name if a wrapper has been added
    nodes[nodeName] = {
      ...nodes[nodeName],
      kernel: kernel,
      raw: node,
      resolvedPredecessors: [],
      wrappers: [],
    };
    tsGraph.insert({ name: nodeName });

    wrapMethodsWithProxy(nodeName, node);
    return node;
  }

  function wrapANode(target: string, wrapper: INodeWrapper) {
    if (!nodes[target])
      nodes[target] = { wrappers: [], resolvedPredecessors: [] };
    nodes[target].wrappers.push(wrapper);
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

  function wrapMethodsWithProxy(nodeName: string, node: object) {
    // If a top level property is a function, bind it to the target
    // just-an-object: don't know if this ever worked. To bind functions, you need to proxy
    // the object that contains them. Don't want to do this unless I need to.
    // Simpler for methods to reference their containing object by name.
    // node.methods = new Proxy(node.methods, {
    //   get(target, property, receiver) {
    //     if (typeof target[property as string] === "function") {
    //       return target[property as string].bind(target);
    //     } else {
    //       return Reflect.get(target, property, receiver);
    //     }
    //   },
    // });

    // here, we automate calling reup after any method called on node
    for (const prop in node) {
      if (
        Object.prototype.hasOwnProperty.call(node, prop) &&
        typeof node[prop] === "function"
      ) {
        node[prop] = new Proxy(node[prop], {
          apply: async function (target, thisArg, argArray) {
            // execute the method
            reupWrapper
              ? await reupWrapper(target)(...argArray)
              : await target(...argArray);
            // copy the result
            //assignValueToOutput(nodeName, node.val);
            // magic step. Launch a full traversal starting with node itself.
            await traverse(sortedNodeNames.indexOf(nodeName));
          },
        });
      }
    }
  }

  /**
   * BUILD
   */
  const build = () => {
    for (const currNodeName in nodes) {
      const node = nodes[currNodeName];
      if (node.kernel?.reup) {
        // reporting node
        if (node.kernel.reupFilterFunc) {
          // predecessors for reporting nodes
          node.resolvedPredecessors = Object.entries(nodes)
            // ...those nodes that match the reporting filter function
            .filter(
              ([targetName, targetNode]) =>
                currNodeName !== targetName &&
                node.kernel.reupFilterFunc(targetName, targetNode.raw)
            )
            // (just add the names)
            .map(([key, val]) => key);
        } else {
          // predecessors for plain nodes
          node.resolvedPredecessors = getParamNames(node.kernel.reup);
        }
      }

      // for each reporting wrapper
      for (const [filterFunc, wrapper] of unbuiltReportingWrappers) {
        // if the current node matches the filter func
        if (filterFunc(currNodeName, node.raw)) {
          nodes[currNodeName].wrappers.push(wrapper);
        }
      }
      // once all the wrappers are in for a node, we can add any dependencies from the wrapper to the node
      if (nodes[currNodeName].wrappers.length) {
        for (const wrapper of nodes[currNodeName].wrappers) {
          const wrapperPredecessors = getParamNames(wrapper.wrapperFunc, 1);
          // if both wrapper and node have predecessors, merge the two arrays
          if (
            wrapperPredecessors.length &&
            nodes[currNodeName].resolvedPredecessors
          )
            nodes[currNodeName].resolvedPredecessors = Array.from(
              new Set(
                nodes[currNodeName].resolvedPredecessors.concat(
                  wrapperPredecessors
                )
              )
            );
          else if (wrapperPredecessors.length)
            nodes[currNodeName].resolvedPredecessors = wrapperPredecessors;
        }
        // ... and sort them...
        nodes[currNodeName].wrappers.sort(
          (a, b) => (a.priority || 0) - (b.priority || 0)
        );
      }

      // store initial value. Moved this to build() to give nodes a chance to load serialized state
      //assignValueToOutput(currNodeName, node.val);

      addEdges(currNodeName);
      if (node.kernel?.reup && reupWrapper)
        node.kernel.reup = reupWrapper(node.kernel.reup);
    }

    sortedNodeNames = tsGraph.topologicallySortedNodes().map((n) => n.name);

    //check for orphaned wrappers
    const wrappersWithoutNodes = Object.entries(nodes).filter(
      ([_, node]) => !node.raw
    );

    if (wrappersWithoutNodes.length)
      console.warn(
        "While building the graph, we can't help but notice that wrappers have been supplied for the following nodes that don't exist... " +
          wrappersWithoutNodes.join(", ")
      );
  };

  function addEdges(nodeName: string) {
    nodes[nodeName].resolvedPredecessors.forEach((predecessor) => {
      if (predecessor === "$nodeName") return;
      try {
        tsGraph.addEdge(predecessor, nodeName);
        edges.push({ from: predecessor, to: nodeName });
      } catch (err) {
        const newMessage = `Octopus cannot create edge from ${predecessor} to ${nodeName}\n${err.message}`;
        throw new Error(newMessage);
      }
    });
  }

  // what do we think about this? It makes a copy. Since radically simple, user code mutates val directly,
  // then pass a reference to this object???
  // function assignValueToOutput(nodeName: string, value: any): void {
  //   if (typeof value === "object")
  //     //state[nodeName] = Object.assign({}, value)
  //     state[nodeName] = JSON.parse(JSON.stringify(value));
  //   // sinks don't put anything in state
  //   else if (state[nodeName] !== undefined && value !== undefined)
  //     state[nodeName] = value;
  // }

  // just-an-object
  function justTheValues<T>(node: T): JustTheValues<T> {
    const result = {} as JustTheValues<T>;
    for (const key in node) {
      if (typeof node[key] !== "function") {
        result[key as any as keyof JustTheValues<T>] =
          node[key as any as keyof JustTheValues<T>];
      }
    }
    return result;
  }

  function justTheFunctions<T>(node: T): JustTheFunctions<T> {
    const result = {} as JustTheFunctions<T>;
    for (const key in node) {
      if (typeof node[key] === "function") {
        result[key as any as keyof JustTheFunctions<T>] =
          node[key as any as keyof JustTheFunctions<T>];
      }
    }
    return result;
  }

  function withoutKernel<T>(node: T): JustTheFunctions<T> {
    const result = {} as JustTheFunctions<T>;
    for (const key in node) {
      if (typeof node[key] === "function") {
        result[key as any as keyof JustTheFunctions<T>] =
          node[key as any as keyof JustTheFunctions<T>];
      }
    }
    return result;
  }

  const executeOneNode = async (currNodeName: string) => {
    const currNode = nodes[currNodeName];
    let predecessorOutput: any = null;
    // radically simple, reup now takes an array.
    predecessorOutput = {};
    if (
      nodes[currNodeName].resolvedPredecessors &&
      nodes[currNodeName].resolvedPredecessors.length
    ) {
      nodes[currNodeName].resolvedPredecessors.forEach((pName) => {
        let predecessorState;
        // reporting wrappers may need to know the names of the nodes they wrap.
        // They do this by adding the reserved prop '$nodeName' to the predecessors object
        if (pName === "$nodeName") predecessorState = currNodeName;
        // just-an-object. The state to pass is the node, minus methods, minus kernel
        else predecessorState = justTheValues(nodes[pName].raw);
        Object.defineProperty(predecessorOutput, pName, {
          value: predecessorState,
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
      if (currNode.kernel?.reup) {
        if (!currNode.kernel.reupFilterFunc) {
          await currNode.kernel.reup(predecessorOutput);
        }
        // radically simple, reporting nodes don't know or care about the names of their inputs, we'll give them an array they can iterate over
        else {
          await currNode.kernel.reup(Object.values(predecessorOutput));
        }
      }
      /** ****************************      CALL THE WRAPPERS      **********************************
       * radically simple. We used to pass the newVal. Now we just pass the node val for modification
       */
      if (nodes[currNodeName].wrappers)
        for (const wrapper of nodes[currNodeName].wrappers) {
          await wrapper.wrapperFunc(currNode.raw, predecessorOutput);
        }

      //assignValueToOutput(currNodeName, currNode.val);
    } catch (Ex) {
      console.error(`Error executing node ${currNodeName}. Error follows`);
      console.error(Ex);
    }
  };

  const traverse = async (startingFrom = 0) => {
    //console.log(`Full traversal starting from ${sortedNodeNames[startingFrom]}`)
    if (!sortedNodeNames.length)
      throw new Error("Graph not built or loaded. We cannot traverse.");
    for (let i = startingFrom; i < sortedNodeNames.length; i++) {
      const currNodeName = sortedNodeNames[i];
      //console.log(`traversing ${i} - ${currNode}`)
      if (
        i !== startingFrom && // not the initiating node
        nodes[currNodeName].resolvedPredecessors.length === 0 && // and no predecessors
        startingFrom !== 0 // and this is not a full traversal
      )
        break;
      await executeOneNode(currNodeName);
    }
    // only send traversal report if debug is set
    if (debug) {
      const state = objectMap(nodes, (aNode) => {
        return justTheValues(aNode.raw);
      });
      const methods = objectMap(nodes, (aNode) => {
        const entries = Object.entries(justTheFunctions(aNode.raw));
        return entries.map(([k, v]) => k);
      });
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
          // for (const node in methods) {
          //   messageCopy.data.methods[node] = Object.getOwnPropertyNames(
          //     methods[node]
          //   );
          // }
          window.postMessage(messageCopy, "*");
        }
        if (standAloneDevtools) {
          const newCopy = JSON.parse(JSON.stringify(message));
          // for (const node in methods) {
          //   newCopy.data.methods[node] = Object.getOwnPropertyNames(
          //     methods[node]
          //   );
          // }
          standAloneDevtools.postMessage(newCopy, "*");
        }
      }
    }
  };
  // we'll expose this version with no parameter
  async function publicFullTraversal() {
    await traverse();
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
    /**
     * The idea was to serialize resolved predecessors, but what about reporting wrappers. We decide which nodes they go on
     * during build(), and this is not easily serializable because we put the function directly in the wrappers array. We don't have
     * a name for them. If this is to work again, we need to identify wrappers by name, like we do for nodes. There is a test for this.
     */
    if (false && currentGraphVersion === storedState.savedAtVersion) {
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

      for (const [key, val] of Object.entries(
        storedState.resolvedPredecessors
      )) {
        nodes[key].resolvedPredecessors = val;
      }
      sortedNodeNames.forEach((nodeName) => addEdges(nodeName));
    } else {
      build();
    }

    for (const nodeName of sortedNodeNames) {
      const currNode = nodes[nodeName];
      if (isStateful(currNode.kernel)) {
        currNode.kernel.loadState(storedState.nodeStates[nodeName]);
      }
      // for sources, initialValue is the only way of getting a value out, so we'll read it
      // after loading state.
      //if (currNode.val) state[nodeName] = currNode.val;
    }
    // after state has been loaded, we traverse. Everything will
    // reup, taking account of loaded values. Recalculation
    // needs to be async
    await traverse();

    return {
      // state,
      // methods,
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
        if (node.kernel?.reup) node.kernel.reup = reupWrapper(node.kernel.reup);
      }
      return loadedGraph;
    } else return _loadState(storedState, currentGraphVersion);
  }
  function objectMap(obj, func) {
    const entries = Object.entries(obj);
    return Object.fromEntries(entries.map(([k, v]) => [k, func(v)]));
  }
  function saveState(currentGraphVersion): ISerializedGraph {
    const resolvedPredecessors = objectMap(
      nodes,
      (val) => val.resolvedPredecessors
    );
    const returnVal = {
      resolvedPredecessors,
      topologicalSort: sortedNodeNames,
      nodeStates: {},
      savedAtVersion: currentGraphVersion,
    };

    for (const nodeName of Object.getOwnPropertyNames(nodes)) {
      const currNode = nodes[nodeName];
      if (isStateful(currNode.kernel))
        returnVal.nodeStates[nodeName] = currNode.kernel.saveState();
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
      if (nodes[currNodeName].kernel?.dispose) {
        try {
          await nodes[currNodeName].kernel.dispose();
        } catch (e) {
          console.error(
            `Error disposing of ${currNodeName}. Error follows. Disposing continues.`
          );
        }
      }
    }
  }
  return {
    // state,
    // methods,
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
