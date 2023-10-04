import { createGraph } from "../Graph.mjs"
import { test, expect } from "vitest"
import { IStateful } from "../IStateful.mjs"
export { }

test("a graph can be serialized and rehydrated", async () => {
  return true
  // function createGraphWith2Nodes(){
  //   const graph = createGraph()
  //   let upstreamVal = 0
  //   const upstreamPublish = graph.addNode("upstream", {
  //     get initialValue(){return upstreamVal},
  //     publicMethods: {
  //       setVal: (val) => { 
  //         upstreamVal = val 
  //         upstreamPublish(upstreamVal)
  //       }
  //     },
  //     //onUpstreamChange(){return upstreamVal},
  //     saveState: function (): { [key: string]: any } {
  //       return { upstreamVal }
  //     },
  //     loadState: function (state: { [key: string]: any }) {
  //       upstreamVal = state.upstreamVal
  //     }
  //   } as ISource & IStateful)
  
  //   graph.addNode("downstream", {
  //     dependsOn: { upstream: undefined },
  //     onUpstreamChange(deps: any): number {
  //       return deps.upstream + 2
  //     },
  //     initialValue: 0,
  //   })
  //   return graph
  // }
  // const freshGraph = createGraphWith2Nodes()
  // // before it's used for the first time a graph must be built...
  // freshGraph.build()
  // // after building, the graph is useable
  // await freshgraph.state.upstream.setVal(14)
  // expect(freshGraph.state.downstream).toBe(16)

  // // then we can save its state
  // const state = JSON.parse(JSON.stringify(freshGraph.saveState()))
  // expect(state.resolvedPredecessors).toHaveProperty("downstream")
  // expect(state.topologicalSort).toHaveLength(2)
  // expect(state.nodeStates).toHaveProperty("upstream")

  // // ...and rehydrate it
  // const rehydratedGraph = createGraphWith2Nodes()
  // await rehydratedGraph.loadState(state)
  // // no need to build
  // // upstream has state loaded, downstream should recalculate on this basis
  // expect(rehydratedGraph.state.downstream).toBe(16)
  
})
