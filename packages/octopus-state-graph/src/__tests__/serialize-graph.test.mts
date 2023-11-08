import { createGraph } from "../Graph.mjs"
import { test, expect } from "vitest"
import { IStateful } from "../IStateful.mjs"
export { }

test("a graph can be serialized and rehydrated", async () => {
  const graph = createGraph()
  const upstreamVal = {
    anInteger: 0,
  }
  const upstreamNode = graph.addNode("upstream", {
    val: upstreamVal,
    methods: {
      setVal(newVal: number) {
        upstreamVal.anInteger = newVal
      }
    },
    saveState: function () {
      return upstreamVal 
    },
    loadState: function (state) {
      // don't (can't) overwrite val
      Object.assign(upstreamVal, state)
    },
  })

  const downstreamVal={
    anInteger:0
  }
  const downstreamNode = graph.addNode("downstream", {
    val: downstreamVal,
    reup(upstream) {
      downstreamVal.anInteger = upstream.anInteger + 2
    },
    // downstreamNode is trivial to recalculate, so we won't bother saving state. 
    // graph.loadState does a full traversal after calling loadState() on all nodes
  })
  graph.build()

  await upstreamNode.methods.setVal(14)
  expect(downstreamNode.val.anInteger).toBe(16)
  // downstream has an initial value, so should be present in the state
  expect(Object.entries(graph.state).length).toBe(2)

  // save the state
  const graphState = graph.saveState()
  expect(graphState.resolvedPredecessors).toHaveProperty("downstream")
  expect(graphState.resolvedPredecessors.downstream).toHaveLength(1)
  expect(graphState.resolvedPredecessors.downstream[0]).toBe('upstream')
  expect(graphState.topologicalSort).toHaveLength(2)
  expect(graphState.nodeStates).toHaveProperty("upstream")

  //saveState() returns an object ready serialize, but doesn't serialize it. We need to freeze it ourselves or it will keep changing.
  const freezeDried = JSON.stringify(graphState)
  await upstreamNode.methods.setVal(20)
  expect(downstreamNode.val.anInteger).toBe(22)

  // loadState should be called on a graph that already has all it's nodes added.
  graph.loadState(JSON.parse(freezeDried))
  // upstream has serialized value
  expect(upstreamNode.val.anInteger).toBe(14)
  // downstream has reupped after rehydration
  expect(downstreamNode.val.anInteger).toBe(16)

})
