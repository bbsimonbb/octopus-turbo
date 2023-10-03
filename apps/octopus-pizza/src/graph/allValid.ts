import { IGraph, INode } from "octopus-state-graph"
import { IReportingNode } from "octopus-state-graph/lib/INode.mjs"

interface IValid {
  valid: boolean
}
interface IInputs {
  [key: string]: IValid
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
  const node: IReportingNode<IInputs, boolean> = {
    initialValue: false,
    dependsOn(nodeName, publishedVal) {
      return isIValid(publishedVal)
    },
    onUpstreamChange(deps) {
      var allValid = true

      for (const [key, val] of Object.entries(deps)) {
        allValid = allValid && !!val.valid
      }
      return allValid
    },
  }
  graph.addNode("allValid", node)
}
