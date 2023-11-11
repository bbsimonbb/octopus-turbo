/* eslint-disable no-debugger */
import { IGraph } from "./IGraph.mjs";
import { INamed, INode, isReportingNode } from "./INode.mjs";
import { INodeWrapper } from "./INodeWrapper.mjs";
import { DirectedAcyclicGraph } from "typescript-graph";
import { ISerializedGraph } from "./ISerializedGraph.mjs";
import { isStateful, IStateful } from "./IStateful.mjs";

interface INodeContainer {
  [nodeName: string]: INode;
}

const isBrowser =
  Object.getPrototypeOf(Object.getPrototypeOf(globalThis)) !== Object.prototype;

// https://stackoverflow.com/a/9924463/1585345
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, "");
  let result = fnStr
    .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
    .match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

// https://stackoverflow.com/a/6472397/1585345
// tried a load of things to decouple graph from Vue. Ideally consumers could make the output reactive when this function
// returns, but I never succeeded.
export function createGraph(
  stateWrappingFunction: (any) => any = (x) => x
): IGraph {
  // we pass in Vue.reactive(). Best solution I found for using the output in Vue. Should also work for mobx-react observable.

  // radically simple, we need get the reactive proxy in first. This is way to simple unfortunately.
  const state: any = stateWrappingFunction({});
  //const state = {};

  // Create the graph https://segfaultx64.github.io/typescript-graph/
  //const graph = new DirectedGraph<INode|ISource>((n: INode|ISource) => n.name)
  const graph = new DirectedAcyclicGraph<INamed>((n: INamed) => n.name);
  // Not obvious how to address nodes once in the graph, so I'll add them to my own container as well.
  const nodes: INodeContainer = {};
  let resolvedPredecessors: { [nodeName: string]: string[] } = {};

  // this array will be keyed on nodeName
  const methods = {};
  // topological sort permits traversal
  let sortedNodeNames: string[] = [];
  const edges: [{ from: string; to: string }?] = [];
  //var nodeOnUpstreamChangeHandlers = {}
  const nodeWrappers = {};
  let octopusDevtoolsPresent = false;
  if (isBrowser) {
    window.addEventListener("message", (ev) => {
      10;
      if (ev?.data?.octopusDevtoolsPresent) {
        //console.log("Octopus devtools has signalled its presence")
        octopusDevtoolsPresent = true;
      }
    });
  }
  // const onNodeChanged = async (nodeName: string, publishVal: any) => {
  //   /******************************      CALL THE WRAPPER      ***********************************/
  //   // todo for radically simple, make this work again with mutation, wrapper will no longer return a val
  //   //if (nodeWrappers[nodeName] && publishVal) publishVal = nodeWrappers[nodeName](publishVal)

  //   // start traversing from node,
  //   await fullTraversal(sortedNodeNames.findIndex((el) => el === nodeName) + 1)
  // }

  // wrappers can initiate changes, if for example, management changes
  const onWrapperChanged = async (nodeName: string, publishVal: any) => {
    if (state[nodeName] && !compareShape(state[nodeName], publishVal)) {
      console.warn(
        `onWrapperChanged ${nodeName}, the new shape returned is not equal to the old one. Here are the two values, old one first...`
      );
      //console.warn(state[nodeName])
      //console.warn(nodeName)
    }
    // copy new val to output
    //state[nodeName] = JSON.parse(JSON.stringify(publishVal))
    //val(nodeName, publishVal)
    // start traversing from node,
    await fullTraversal(sortedNodeNames.findIndex((el) => el === nodeName) + 1);
  };

  function addNode(nodeName: string, node: INode) {
    if (!nodeName) throw new Error(`We can't add a node without a name.`);
    nodes[nodeName] = node;
    graph.insert({ name: nodeName });

    // radically simple. We need to get the value reactive first, so our framework knows
    // about mutations
    //node.val = stateWrappingFunction(node.val);

    if (node.methods) {
      // If a top level property is a function, bind it to the target
      node.methods = new Proxy(node.methods, {
        get(target, property, receiver) {
          if (typeof target[property] === "function") {
            return target[property].bind(target);
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
              // execute the handler
              await target(...argArray);
              // copy the result
              assignValueToOutput(nodeName, node.val)
              // magic step. Launch a full traversal starting with node itself.
              fullTraversal(sortedNodeNames.indexOf(nodeName));
            },
          });
        }
      }

      // the wrapper might have been added before the node
      const newMethods = node.methods;
      methods[nodeName] = { ...methods[nodeName], ...newMethods };
    }
    return { val: node.val, methods: node.methods };
  }

  const build = () => {
    const reportingNodes = Object.fromEntries(
      Object.entries(nodes).filter(
        ([name, node]) =>
          node.options && typeof node.options.dependsOn === "function"
      )
    ) as { [k: string]: INode };
    const plainNodes = Object.fromEntries(
      Object.entries(nodes).filter(
        ([name, node]) =>
          !node.options || typeof node.options.dependsOn !== "function"
      )
    ) as { [k: string]: INode };

    for (const nodeName in plainNodes) {
      // for each node, we'll store in the graph the list of dependency names
      const node = plainNodes[nodeName];
      if (node.reup) {
        // radically simple !
        resolvedPredecessors[nodeName] = getParamNames(node.reup);
        resolvedPredecessors[nodeName].forEach((predecessor) => {
          graph.addEdge(predecessor, nodeName);
          edges.push({ from: predecessor, to: nodeName });
        });
      }
    }
    // store initial value. Moved this to build() to give nodes a chance to load serialized state
    for (const nodeName in nodes) {
      const currNode = nodes[nodeName];
      // radically simple. We need to give framework a chance to observe the changes, we don't want framework's proxy on the "node's" copy of it's value, which it will continue to modify directly.
      assignValueToOutput(nodeName, currNode.val)
    }
    // reporting nodes. One day we might like to sort these?
    for (const nodeName in reportingNodes) {
      const reportingNode = reportingNodes[nodeName];
      resolvedPredecessors[nodeName] = Object.entries(state)
        .filter(
          ([targetName, targetVal]) =>
            nodeName !== targetName &&
            reportingNode.options.dependsOn(targetName, targetVal)
        )
        .map(([key, val]) => key);
      resolvedPredecessors[nodeName].forEach((predecessor) => {
        graph.addEdge(predecessor, nodeName);
        edges.push({ from: predecessor, to: nodeName });
      });
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
  // what do we think about this? It makes a copy. Since radically simple, user code mutates val directly, then pass a reference to this object???
  function assignValueToOutput(nodeName: string, value: any): void {
    if (typeof value === "object")
      //state[nodeName] = Object.assign({}, value)
      state[nodeName] = JSON.parse(JSON.stringify(value))
    // sinks don't put anything in state
    else if (state[nodeName] !== undefined && value !== undefined) state[nodeName] = value
  }
  const wrapNode = (nodeToWrap: string, wrapper: INodeWrapper) => {
    // save wrapping function
    Object.defineProperty(nodeWrappers, nodeToWrap, {
      value: wrapper,
      configurable: true,
      enumerable: true,
      writable: true,
    });

    // add publicMethods to node's
    if (wrapper.publicMethods) {
      const newMethods = wrapper.publicMethods;
      methods[nodeToWrap] = { ...methods[nodeToWrap], ...newMethods };
    }

    // call the wrapping function with the wrapped node's current value (initial value)
    // potential gotcha? we're not unleashing a traversal because we're still constructing things, but maybe we should.
    // can't do this. wrapping function might be async, node might not exist yet
    // const newVal = wrapper.wrappingFunction(state[nodeToWrap])
    // assignValueToOutput(nodeToWrap, newVal)

    // return a publishChanges function. Wrappers can also interact with outside world.
    return (publishVal: any) => {
      onWrapperChanged(nodeToWrap, publishVal); // this is async, but we don't care about the result (the node doesn't care)
    };
  };
  const executeOneNode = async (currNodeName: string) => {
    const currNode = nodes[currNodeName];
    let predecessorOutput: any = null;
    // radically simple, reup now takes an array. For plain nodes, order will be important!
    predecessorOutput = [];
    if (
      resolvedPredecessors[currNodeName] &&
      resolvedPredecessors[currNodeName].length
    )
      resolvedPredecessors[currNodeName].forEach((pName) => {
        predecessorOutput.push(JSON.parse(JSON.stringify(state[pName])));
      });

    try {
      /******************************       CALL THE NODE        ***********************************/

      if (!isReportingNode(currNode)) {
        await currNode.reup(...predecessorOutput);
      }
      // radically simple, reporting nodes don't know or care about the names of their inputs, we'll give them an array they can iterate over
      else {
        await currNode.reup(predecessorOutput);

      }
      /******************************      CALL THE WRAPPER      ***********************************/
      // radically simple. We used to pass the newVal. Now we just pass the node val for modification
      if (nodeWrappers[currNodeName])
        await nodeWrappers[currNodeName].wrappingFunction(currNode.val);

      // check shape
      // if (state[currNodeName] !== undefined && !compareShape(state[currNodeName], newVal)) {
      //   console.warn(`Traversing ${currNodeName}, the new shape returned is not equal to the old one.`)
      //   //console.warn(`Old type ${whatIs(state[currNodeName])}, new type ${whatIs(newVal)}`)
      //   //console.warn(state[currNodeName])
      //   //console.warn(newVal)
      // }
      // // copy to output
      // if (isValueNode(currNode)) val(currNodeName, newVal)
      // else if (newVal !== undefined) console.warn(`${currNodeName} is a sink and should not return a value from onUpstreamChange(). The return value will be ignored.`)
      // radically simple
      assignValueToOutput(currNodeName, currNode.val)
    } catch (Ex) {
      console.error(`Error executing node ${currNodeName}. Error follows`);
      console.error(Ex);
    }
  };

  const fullTraversal = async (startingFrom = 0) => {
    //console.log(`Full traversal starting from ${sortedNodeNames[startingFrom]}`)
    for (let i = startingFrom; i < sortedNodeNames.length; i++) {
      const currNodeName = sortedNodeNames[i];
      //console.log(`traversing ${i} - ${currNode}`)
      // radically simple, a full traversal starts with the node which has just changed. It needs to reup whether or not it has inputs. The others, only if they have inputs.
      if (
        nodes[currNodeName].reup &&
        (i === startingFrom ||
          (resolvedPredecessors[currNodeName] &&
            resolvedPredecessors[currNodeName].length > 0))
      )
        await executeOneNode(currNodeName);
    }
    if (isBrowser && /:[0-9]+$/gm.test(window.location.origin)) {
      if (octopusDevtoolsPresent) {
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
        //console.log("graph emitting message")
        const messageCopy = JSON.parse(JSON.stringify(message));
        for (const node in methods) {
          messageCopy.data.methods[node] = Object.getOwnPropertyNames(
            methods[node]
          );
        }
        console.log(messageCopy)
        window.postMessage(messageCopy, "*");
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
  async function loadState(storedState: ISerializedGraph) {
    sortedNodeNames = storedState.topologicalSort;
    resolvedPredecessors = storedState.resolvedPredecessors;

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
      wrapNode,
      fullTraversal: publicFullTraversal,
      loadState,
      saveState,
    };
  }
  function saveState(): ISerializedGraph {
    const returnVal = {
      resolvedPredecessors,
      topologicalSort: sortedNodeNames,
      nodeStates: {},
    };

    for (const nodeName of Object.getOwnPropertyNames(state)) {
      const currNode = nodes[nodeName];
      if (isStateful(currNode))
        returnVal.nodeStates[nodeName] = currNode.saveState();
    }
    return returnVal;
  }
  return {
    state,
    methods,
    build,
    addNode,
    wrapNode,
    fullTraversal: publicFullTraversal,
    loadState,
    saveState,
  };
}
