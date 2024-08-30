import { createGraph } from "../Graph.js";
import { test, expect } from "vitest";
import { IGraph } from "../IGraph.js";
export {};

test("a graph can be serialized and rehydrated", async () => {
  const graph = createGraph();
  const upstreamVal = {};
  const upstreamNode = graph.addNode("upstream", {
    anInteger: 0,
    setVal(newVal: number) {
      upstreamNode.anInteger = newVal;
    },
    _o: {
      saveState: function () {
        return upstreamNode.anInteger;
      },
      loadState: function (state) {
        upstreamNode.anInteger = state;
      },
    },
  });

  const downstreamNode = graph.addNode("downstream", {
    anInteger: 0,
    _o: {
      reup({ upstream }) {
        downstreamNode.anInteger = upstream.anInteger + 2;
      },
    },
    // downstreamNode is trivial to recalculate, so we won't bother saving state.
    // graph.loadState does a full traversal after calling loadState() on all nodes
  });
  graph.build();

  await upstreamNode.setVal(14);
  expect(downstreamNode.anInteger).toBe(16);

  // save the state
  const graphState = graph.saveState(1);
  expect(graphState.resolvedPredecessors).toHaveProperty("downstream");
  expect(graphState.resolvedPredecessors.downstream).toHaveLength(1);
  expect(graphState.resolvedPredecessors.downstream[0]).toBe("upstream");
  expect(graphState.topologicalSort).toHaveLength(2);
  expect(graphState.nodeStates).toHaveProperty("upstream");

  //saveState() returns an object ready serialize, but doesn't serialize it. We need to freeze it ourselves or it will keep changing.
  const freezeDried = JSON.stringify(graphState);
  await upstreamNode.setVal(20);
  expect(downstreamNode.anInteger).toBe(22);

  // loadState should be called on a graph that already has all it's nodes added.
  await graph.loadState(JSON.parse(freezeDried), 1);
  // upstream has serialized value
  expect(upstreamNode.anInteger).toBe(14);
  // downstream has reupped after rehydration
  expect(downstreamNode.anInteger).toBe(16);
});

function add2Nodes(graph: IGraph) {
  const upstreamNode = graph.addNode("upstream", {
    anInteger: 0,
    setVal(newVal: number) {
      upstreamNode.anInteger = newVal;
    },
    _o: {
      saveState: function () {
        return upstreamNode.anInteger;
      },
      loadState: function (state) {
        upstreamNode.anInteger = state;
      },
    },
  });

  const intermediateNode = graph.addNode("intermediate", {
    anInteger: 0,
    _o: {
      reup({ upstream }) {
        intermediateNode.anInteger = upstream.anInteger + 2;
      },
    },
    // intermediateNode is trivial to recalculate, so we won't bother saving state.
    // graph.loadState does a full traversal after calling loadState() on all nodes
  });
  return { upstreamNode, intermediateNode };
}

test("a graph rehydrated into a newer version with additional nodes still loads", async () => {
  const graph = createGraph();
  const { upstreamNode, intermediateNode } = add2Nodes(graph);

  graph.build();
  await upstreamNode.setVal(14);
  expect(intermediateNode.anInteger).toBe(16);

  // save the state
  const graphState = graph.saveState(1);
  expect(graphState.resolvedPredecessors).toHaveProperty("intermediate");
  expect(graphState.resolvedPredecessors.intermediate).toHaveLength(1);
  expect(graphState.resolvedPredecessors.intermediate[0]).toBe("upstream");
  expect(graphState.topologicalSort).toHaveLength(2);
  expect(graphState.nodeStates).toHaveProperty("upstream");

  //saveState() returns an object ready serialize, but doesn't serialize it. We need to freeze it ourselves or it will keep changing.
  const freezeDried = JSON.stringify(graphState);
  await upstreamNode.setVal(20);
  expect(intermediateNode.anInteger).toBe(22);
  {
    // loadState should be called on a graph that already has all it's nodes added.
    const graph2 = createGraph();
    const { upstreamNode, intermediateNode } = add2Nodes(graph2);

    const downstreamNode = graph2.addNode("downstream", {
      anInteger: 0,
      setVal(newVal: number) {
        downstreamNode.anInteger = newVal;
      },
      _o: {
        reup({ upstream, intermediate }) {
          console.log(upstreamNode);
        },
        saveState: function () {
          return downstreamNode.anInteger;
        },
        loadState: function (state) {
          downstreamNode.anInteger = state;
        },
      },
    });
    // freezeDried is missing downstream!
    await graph2.loadState(JSON.parse(freezeDried), 2);
    // upstream has serialized value
    expect(upstreamNode.anInteger).toBe(14);
    // intermediate has reupped after rehydration
    expect(intermediateNode.anInteger).toBe(16);

    // call a method on the newly added node...
    downstreamNode.setVal(15);
  }
});
