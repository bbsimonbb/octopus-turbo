import { createGraph } from "../Graph.js";
import { test, expect } from "vitest";
import { INode } from "../INode.js";
export {};

/**
 * Wrapper added by name to single node, modifies that node's output
 */
test("a wrapper adds 3 to a downstream node.", async () => {
  const graph = createGraph();
  const val = {
    anInteger: 0,
  };
  const upstreamNode = graph.addNode("upstream", {
    val,
    methods: {
      async setVal(newVal: number) {
        val.anInteger = newVal;
      },
    },
  });

  const downstreamNode = graph.addNode("downstream", {
    val: {
      downstreamInt: 5,
    },
    reup({ upstream }) {
      this.val.downstreamInt = upstream.anInteger + 2;
      return true;
    },
  });

  graph.wrapNodes("downstream", {
    wrapperFunc: (val) => {
      val.downstreamInt = val.downstreamInt + 3;
    },
  });
  graph.build();

  await upstreamNode.methods.setVal(14);

  expect(downstreamNode.val.downstreamInt).toBe(19);
  expect(graph.state.downstream.downstreamInt).toBe(19);
});

/**
 * If the wrapper function is async, it will be waited for.
 */
test("An async wrapper will be waited for", async () => {
  const graph = createGraph();
  const val = {
    anInteger: 0,
  };
  const upstreamNode = graph.addNode("upstream", {
    val,
    methods: {
      async setVal(newVal: number) {
        val.anInteger = newVal;
      },
    },
  });

  const downstreamNode = graph.addNode("downstream", {
    val: {
      downstreamInt: 5,
    },
    reup({ upstream }) {
      this.val.downstreamInt = upstream.anInteger + 2;
      return true;
    },
  });

  graph.wrapNodes("downstream", {
    wrapperFunc: async (val) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          val.downstreamInt = val.downstreamInt + 3;
          resolve();
        }, 10);
      });
    },
  });
  graph.build();

  await upstreamNode.methods.setVal(14);

  expect(downstreamNode.val.downstreamInt).toBe(19);
  expect(graph.state.downstream.downstreamInt).toBe(19);
});

/**
 * The same wrapper can be added to an array of targets
 */
test("a wrapper adds 3 to both nodes", async () => {
  const graph = createGraph();
  const val = {
    anInt: 0,
  };
  const upstreamNode = graph.addNode("upstream", {
    val,
    methods: {
      setVal(newVal: number) {
        val.anInt = newVal;
      },
    },
  });

  const downstreamNode = graph.addNode("downstream", {
    val: {
      anInt: 5,
    },
    reup({ upstream }) {
      this.val.anInt = upstream.anInt + 2;
      return true;
    },
  });

  graph.wrapNodes(["upstream", "downstream"], {
    wrapperFunc: (val) => {
      val.anInt = val.anInt + 3;
    },
  });
  graph.build();

  await upstreamNode.methods.setVal(14);

  expect(downstreamNode.val.anInt).toBe(22);
  expect(graph.state.downstream.anInt).toBe(22);
});

/**
 * The same wrapper can be added to x nodes chosen with a filter func
 */
test("The same wrapper can be added to x nodes chosen with a filter func", async () => {
  const graph = createGraph();
  const val = {
    anInt: 2,
  };
  const upstreamNode = graph.addNode("upstream", {
    val,
    methods: {
      setVal(newVal: number) {
        val.anInt = newVal;
      },
    },
  });

  const downstreamNode = graph.addNode("downstream", {
    val: {
      anInt: 5,
    },
    reup({ upstream }) {
      this.val.anInt = upstream.anInt + 2;
      return true;
    },
  });

  graph.wrapNodes(target=>!!target.anInt, {
    wrapperFunc: (val) => {
      val.anInt = val.anInt + 3;
    },
  });
  graph.build();

  await upstreamNode.methods.setVal(14);

  expect(downstreamNode.val.anInt).toBe(22);
  expect(graph.state.downstream.anInt).toBe(22);
});

