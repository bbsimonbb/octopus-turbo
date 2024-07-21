
import graph from "./bareReactiveGraph"




export function buildGraph() {
  // nodes are added to the graph in top level code, so 
  // by the time this runs, everything is added.
  graph.build()
  graph.fullTraversal()

  return graph
}