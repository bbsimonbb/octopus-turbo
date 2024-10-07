import { createGraph } from "../Graph.js";
import { test, expect } from "vitest";
export {};

test("a downstream node adds 2 to an upstream", async () => {
  const graph = createGraph();
  const upstreamNode = graph.addNode("upstream", {
    anInteger: 1,
    setVal(newVal: number) {
      upstreamNode.anInteger = newVal;
    },
  });

  const downstreamNode = graph.addNode(
    "downstream",
    {
      downstreamInt: 5,
    },
    {
      reup({ upstream }) {
        downstreamNode.downstreamInt = upstream.anInteger + 2;
        return true;
      },
    }
  );
  graph.build();

  await upstreamNode.setVal(14);
  expect(downstreamNode.downstreamInt).toBe(16);
});

test("a reporting node picks up its input", async () => {
  const graph = createGraph();
  let targetNodesCount = 0;
  let upstream = graph.addNode("upstream", {
    anInt: 0,
    setInt(newVal) {
      upstream.anInt = newVal;
    },
  });
  graph.addNode(
    "downstream",
    {
      anInt: 0,
    },
    {
      reup(nodeArray) {
        targetNodesCount = nodeArray.length;
      },
      reupFilterFunc(nodeName, nodeVal) {
        return true; // grab everything
      },
    }
  );
  graph.build();

  await upstream.setInt(14);

  expect(targetNodesCount).toBe(1);
});

test("Node dispose() methods are called when dispose is called on the graph", async () => {
  const graph = createGraph();
  let disposeWasCalled = false;
  graph.addNode(
    "downstream",
    {},
    {
      dispose() {
        disposeWasCalled = true;
      },
    }
  );
  graph.build();
  graph.dispose();
  expect(disposeWasCalled).toBe(true);
});

/**
 * A function in an object in a node can be called in a downstream node
 */
test("A function in an object in a node can be called in a downstream node", async () => {
  const graph = createGraph();
  let wasCalled = false;
  const upstreamNode = graph.addNode("upstream", {
    anInteger: 1,
    setVal(newVal: number) {
      upstreamNode.anInteger = newVal;
    },
    anObj: {
      aFunc() {
        wasCalled = true;
      },
    },
  });

  const downstreamNode = graph.addNode(
    "downstream",
    {
      downstreamInt: 5,
    },
    {
      reup({ upstream }) {
        upstream.anObj.aFunc();
      },
    }
  );
  graph.build();

  await upstreamNode.setVal(14);
  expect(wasCalled).toBe(true);
});

/**
 * A graph that has a reporting node, that picks up a plain node,
 * that depends on the reporting node, WON'T BUILD
 */
