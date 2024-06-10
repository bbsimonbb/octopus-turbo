import { createGraph } from "../Graph.js"
import { test, expect } from "vitest"
import { INode } from "../INode.js"
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
    reup({upstream}) {
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


/* Pure graphs can have sinks that publish nothing, but if we make
val optional we impose the obligation to test for val on so much stuff.
For the rare times you want a sink, create a node with type empty object
<INode<Record<string, never>>>
https://www.totaltypescript.com/the-empty-object-type-in-typescript
*/
test("nodes must provide a val", () => {
  function addEmptyNode() {
    const graph = createGraph()
    // @ts-ignore
    graph.addNode("hasNoValue", {})
  }
  expect(() => addEmptyNode()).toThrow()
})


test("Node dispose() methods are called when dispose is called on the graph", async () => {
  const graph = createGraph()
  let disposeWasCalled = false
  graph.addNode("downstream", {
    val:{},
    dispose() {
      disposeWasCalled = true
    }
  })
  graph.build()
  graph.dispose()
  expect(disposeWasCalled).toBe(true)
})