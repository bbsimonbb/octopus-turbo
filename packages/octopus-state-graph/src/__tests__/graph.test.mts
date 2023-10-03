import { createGraph } from "../Graph.mjs"
import { test, expect } from "vitest"
import { IStateful } from "../IStateful.mjs"
import { INode } from "../INode.mjs"
export { }

test("a downstream node adds 2 to an upstream", async () => {
  const graph = createGraph()
  const upstreamNode = graph.addNode("upstream", {
    val: {
      anInteger: 0,
      setVal(newVal: number) {
        this.anInteger = newVal
      }
    }
  })

  const downstreamNode = graph.addNode("downstream", {
    val: {
      downstreamInt: 5
    },
    recalculate(upstream) {
      this.val.downstreamInt = upstream.anInteger + 2
      return true
    }
  })
  graph.build()

  await upstreamNode.setVal(14)
  expect(graph.state.downstream.downstreamInt).toBe(16)
})

// test("a graph can be serialized and rehydrated", async () => {
//   const graph = createGraph()
//   {
//     let upstreamVal = 0
//     const node = {
//       initialValue: upstreamVal,
//       publicMethods: {
//         setVal(val) {
//           upstreamVal = val
//           publishChanges(upstreamVal)
//         },
//       },
//       saveState: function (): { [key: string]: any } {
//         return { upstreamVal }
//       },
//       loadState: function (state: { [key: string]: any }) {
//         upstreamVal = state.upstreamVal
//       },
//     } as ISource & IStateful
//     const publishChanges = graph.addNode("upstream", node)
//   }

//   graph.addNode("downstream", {
//     dependsOn: { upstream: undefined },
//     onUpstreamChange(deps: any): number {
//       return deps.upstream + 2
//     },
//     initialValue: 0,
//   })
//   graph.build()

//   await graph.methods.upstream.setVal(14)
//   expect(graph.state.downstream).toBe(16)
//   // downstream has an initial value, so should be present in the state
//   expect(Object.entries(graph.state).length).toBe(2)
// })

test("a reporting node picks up its input", async () => {
  const graph = createGraph()
  let targetNodesCount = 0
  const upstream = graph.addNode("upstream", {
    val: {
      anInt: 0,
      setInt(newVal) { this.anInt = newVal }
    }
  })

  graph.addNode("downstream", {
    val: {
      anInt: 0
    },
    recalculate(nodeArray) {
      targetNodesCount = nodeArray.length
    },
    options: {
      dependsOn(nodeName, nodeVal) {
        return true // grab everything
      }
    }
  })
  graph.build()

  await upstream.setInt(14)

  expect(targetNodesCount).toBe(1)
})

// test("sinks mustn't put anything in state", async () => {
//   const graph = createGraph()
//   {
//     let upstreamVal = 0
//     const node = {
//       initialValue: upstreamVal,
//       publicMethods: {
//         setVal(val) {
//           upstreamVal = val
//           publishChanges(upstreamVal)
//         },
//       },
//       saveState: function (): { [key: string]: any } {
//         return { upstreamVal }
//       },
//       loadState: function (state: { [key: string]: any }) {
//         upstreamVal = state.upstreamVal
//       },
//     } as ISource & IStateful
//     const publishChanges = graph.addNode("upstream", node)
//   }
//   let sideEffect = 0
//   graph.addNode("downstream", {
//     dependsOn: { upstream: undefined },
//     onUpstreamChange(deps: any): void {
//       sideEffect = deps.upstream + 2
//     }
//   })
//   graph.build()

//   await graph.methods.upstream.setVal(14)
//   expect(sideEffect).toBe(16)
//   // downstream is a sink, so should not be present in the state
//   expect(Object.entries(graph.state).length).toBe(1)
// })
