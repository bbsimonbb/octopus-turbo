var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/INode.ts
function isReportingNode(node) {
  return node.options && node.options.dependsOn !== void 0;
}

// src/Graph.ts
import { DirectedAcyclicGraph } from "typescript-graph";

// src/IStateful.ts
function isStateful(thing) {
  return thing.loadState && thing.saveState;
}

// src/Graph.ts
var isBrowser = Object.getPrototypeOf(Object.getPrototypeOf(globalThis)) !== Object.prototype;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, "");
  let result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);
  if (result === null)
    result = [];
  return result;
}
function createGraph(stateWrappingFunction = (x) => x) {
  const state = stateWrappingFunction({});
  const graph = new DirectedAcyclicGraph((n) => n.name);
  const nodes = {};
  let resolvedPredecessors = {};
  const methods = {};
  let sortedNodeNames = [];
  const edges = [];
  const nodeWrappers = {};
  let octopusDevtoolsPresent = false;
  if (isBrowser) {
    window.addEventListener("message", (ev) => {
      var _a;
      10;
      if ((_a = ev == null ? void 0 : ev.data) == null ? void 0 : _a.octopusDevtoolsPresent) {
        octopusDevtoolsPresent = true;
      }
    });
  }
  const onWrapperChanged = (nodeName, publishVal) => __async(this, null, function* () {
    if (state[nodeName] && !compareShape(state[nodeName], publishVal)) {
      console.warn(
        `onWrapperChanged ${nodeName}, the new shape returned is not equal to the old one. Here are the two values, old one first...`
      );
    }
    yield fullTraversal(sortedNodeNames.findIndex((el) => el === nodeName) + 1);
  });
  function addNode(nodeName, node) {
    if (!nodeName)
      throw new Error(`We can't add a node without a name.`);
    nodes[nodeName] = node;
    graph.insert({ name: nodeName });
    if (node.methods) {
      node.methods = new Proxy(node.methods, {
        get(target, property, receiver) {
          if (typeof target[property] === "function") {
            return target[property].bind(target);
          } else {
            return Reflect.get(target, property, receiver);
          }
        }
      });
      for (const prop in node.methods) {
        if (Object.prototype.hasOwnProperty.call(node.methods, prop) && typeof node.methods[prop] === "function") {
          node.methods[prop] = new Proxy(node.methods[prop], {
            apply: function(target, thisArg, argArray) {
              return __async(this, null, function* () {
                yield target(...argArray);
                assignValueToOutput(nodeName, node.val);
                fullTraversal(sortedNodeNames.indexOf(nodeName));
              });
            }
          });
        }
      }
      const newMethods = node.methods;
      methods[nodeName] = __spreadValues(__spreadValues({}, methods[nodeName]), newMethods);
    }
    return { val: node.val, methods: node.methods };
  }
  const build = () => {
    const reportingNodes = Object.fromEntries(
      Object.entries(nodes).filter(
        ([name, node]) => node.options && typeof node.options.dependsOn === "function"
      )
    );
    const plainNodes = Object.fromEntries(
      Object.entries(nodes).filter(
        ([name, node]) => !node.options || typeof node.options.dependsOn !== "function"
      )
    );
    for (const nodeName in plainNodes) {
      const node = plainNodes[nodeName];
      if (node.reup) {
        resolvedPredecessors[nodeName] = getParamNames(node.reup);
        resolvedPredecessors[nodeName].forEach((predecessor) => {
          graph.addEdge(predecessor, nodeName);
          edges.push({ from: predecessor, to: nodeName });
        });
      }
    }
    for (const nodeName in nodes) {
      const currNode = nodes[nodeName];
      assignValueToOutput(nodeName, currNode.val);
    }
    for (const nodeName in reportingNodes) {
      const reportingNode = reportingNodes[nodeName];
      resolvedPredecessors[nodeName] = Object.entries(state).filter(
        ([targetName, targetVal]) => nodeName !== targetName && reportingNode.options.dependsOn(targetName, targetVal)
      ).map(([key, val]) => key);
      resolvedPredecessors[nodeName].forEach((predecessor) => {
        graph.addEdge(predecessor, nodeName);
        edges.push({ from: predecessor, to: nodeName });
      });
    }
    sortedNodeNames = graph.topologicallySortedNodes().map((n) => n.name);
    const wrappersWithoutNodes = Object.entries(nodeWrappers).map(([key, val]) => key).filter((wrapperForNode) => !nodes[wrapperForNode]);
    if (wrappersWithoutNodes.length)
      console.warn(
        "While building the graph, we can't help but notice that wrappers have been supplied for the following nodes that don't exist... " + wrappersWithoutNodes.join(", ")
      );
  };
  function assignValueToOutput(nodeName, value) {
    if (typeof value === "object")
      state[nodeName] = JSON.parse(JSON.stringify(value));
    else if (state[nodeName] !== void 0 && value !== void 0)
      state[nodeName] = value;
  }
  const wrapNode = (nodeToWrap, wrapper) => {
    Object.defineProperty(nodeWrappers, nodeToWrap, {
      value: wrapper,
      configurable: true,
      enumerable: true,
      writable: true
    });
    if (wrapper.publicMethods) {
      const newMethods = wrapper.publicMethods;
      methods[nodeToWrap] = __spreadValues(__spreadValues({}, methods[nodeToWrap]), newMethods);
    }
    return (publishVal) => {
      onWrapperChanged(nodeToWrap, publishVal);
    };
  };
  const executeOneNode = (currNodeName) => __async(this, null, function* () {
    const currNode = nodes[currNodeName];
    let predecessorOutput = null;
    predecessorOutput = [];
    if (resolvedPredecessors[currNodeName] && resolvedPredecessors[currNodeName].length)
      resolvedPredecessors[currNodeName].forEach((pName) => {
        predecessorOutput.push(JSON.parse(JSON.stringify(state[pName])));
      });
    try {
      if (!isReportingNode(currNode)) {
        yield currNode.reup(...predecessorOutput);
      } else {
        yield currNode.reup(predecessorOutput);
      }
      if (nodeWrappers[currNodeName])
        yield nodeWrappers[currNodeName].wrappingFunction(currNode.val);
      assignValueToOutput(currNodeName, currNode.val);
    } catch (Ex) {
      console.error(`Error executing node ${currNodeName}. Error follows`);
      console.error(Ex);
    }
  });
  const fullTraversal = (startingFrom = 0) => __async(this, null, function* () {
    for (let i = startingFrom; i < sortedNodeNames.length; i++) {
      const currNodeName = sortedNodeNames[i];
      if (nodes[currNodeName].reup && (i === startingFrom || resolvedPredecessors[currNodeName] && resolvedPredecessors[currNodeName].length > 0))
        yield executeOneNode(currNodeName);
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
            initiator: sortedNodeNames[startingFrom]
          }
        };
        const messageCopy = JSON.parse(JSON.stringify(message));
        for (const node in methods) {
          messageCopy.data.methods[node] = Object.getOwnPropertyNames(
            methods[node]
          );
        }
        window.postMessage(messageCopy, "*");
      }
    }
  });
  function publicFullTraversal() {
    return __async(this, null, function* () {
      yield fullTraversal();
      return;
    });
  }
  function compareShape(a, b) {
    if (whatIs(a) !== whatIs(b))
      return false;
    if (typeof a === "object") {
      const aKeys = Object.keys(a).sort();
      const bKeys = Object.keys(b).sort();
      return JSON.stringify(aKeys) === JSON.stringify(bKeys);
    }
    return true;
  }
  function whatIs(value) {
    return Object.prototype.toString.call(value).replace(/^\[object\s+([a-z]+)\]$/i, "$1").toLowerCase();
  }
  function loadState(storedState) {
    return __async(this, null, function* () {
      sortedNodeNames = storedState.topologicalSort;
      resolvedPredecessors = storedState.resolvedPredecessors;
      for (const nodeName of sortedNodeNames) {
        const currNode = nodes[nodeName];
        if (isStateful(currNode)) {
          currNode.loadState(storedState.nodeStates[nodeName]);
        }
        if (currNode.val)
          state[nodeName] = currNode.val;
      }
      yield fullTraversal();
      return {
        state,
        methods,
        build,
        addNode,
        wrapNode,
        fullTraversal: publicFullTraversal,
        loadState,
        saveState
      };
    });
  }
  function saveState() {
    const returnVal = {
      resolvedPredecessors,
      topologicalSort: sortedNodeNames,
      nodeStates: {}
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
    saveState
  };
}
export {
  createGraph
};
