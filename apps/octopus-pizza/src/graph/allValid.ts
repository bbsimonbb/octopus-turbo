import { IGraph, INode } from "octopus-state-graph"
import { IReportingNode } from "octopus-state-graph/lib/INode.mjs"

export interface IValid {
  valid: boolean
}
function isIValid(someObject: any) {
  return someObject.valid !== undefined
}

/* --------------- Reporting Node -----------------------
dependsOn is a function that will examine each node already added and return true if the node is a dependency.
Then, any change in a dependency will trigger onUpstreamChange as usual.
Here, everything that has an optionPrice is a dependency
*/
export function addAllValid(graph: IGraph) {
  const val : IValid = {valid:false}
  const node: IReportingNode<IValid> = {
    val,
    options:{
      dependsOn(nodeName, publishedVal) {
      return isIValid(publishedVal)
    }},
    recalculate(nodes){
      var allValid = true
      for (const [key, val] of Object.entries(nodes)) {
        allValid = allValid && !! (val as IValid).valid
      }
      val.valid = allValid
    },
  }
  graph.addNode("allValid", node)
}
