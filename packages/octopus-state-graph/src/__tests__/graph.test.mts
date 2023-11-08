import { createGraph } from "../Graph.mjs"
import { test, expect } from "vitest"
import { IStateful } from "../IStateful.mjs"
import { INode } from "../INode.mjs"
export { }

test("a downstream node adds 2 to an upstream", async () => {
  const graph = createGraph()
  const val = {
    anInteger: 0,
  }
  const upstreamNode = graph.addNode("upstream", {
    val,
    methods: {
      setVal(newVal: number) {
        val.anInteger = newVal
      }
    }
  })

  const downstreamNode = graph.addNode("downstream", {
    val: {
      downstreamInt: 5
    },
    reup(upstream) {
      this.val.downstreamInt = upstream.anInteger + 2
      return true
    }
  })
  graph.build()

  await upstreamNode.methods.setVal(14)
  expect(graph.state.downstream.downstreamInt).toBe(16)
})

test("a reporting node picks up its input", async () => {
  const graph = createGraph()
  let targetNodesCount = 0
  let upstream: INode
  {
    const val = {
      anInt: 0,
    }
    upstream = graph.addNode("upstream", {
      val,
      methods: {
        setInt(newVal) { val.anInt = newVal }
      }
    })
  }
  {
    const val = {
      anInt: 0
    }
    graph.addNode("downstream", {
      val,
      reup(nodeArray) {
        targetNodesCount = nodeArray.length
      },
      options: {
        dependsOn(nodeName, nodeVal) {
          return true // grab everything
        }
      }
    })
  }
  graph.build()

  await upstream.methods.setInt(14)

  expect(targetNodesCount).toBe(1)
})

test("sinks mustn't put anything in state", async () => {
  const graph = createGraph()
  const upstreamVal = { anInt: 0 }
  const node = {
    val: upstreamVal,
    methods: {
      setVal(newVal) {
        upstreamVal.anInt = newVal
      },
    },
    saveState: function (): { [key: string]: any } {
      return { upstreamVal }
    },
    loadState: function (state: { [key: string]: any }) {
      Object.assign(upstreamVal, state.upstreamVal)
    },
  } as INode & IStateful
  const upstreamNode = graph.addNode("upstream", node)

  let sideEffect = 0
  graph.addNode("downstream", {
    reup(upstream: any): void {
      sideEffect = upstream.anInt + 2
    }
  })
  graph.build()

  await upstreamNode.methods.setVal(14)
  expect(sideEffect).toBe(16)
  // downstream is a sink, so should not be present in the state
  expect(Object.entries(graph.state).length).toBe(1)
})
