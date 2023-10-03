import { IGraph, INode } from "octopus-state-graph"
import { IReportingNode } from "octopus-state-graph/lib/INode.mjs"

interface IPricedOption {
  optionPrice: number
  valid: boolean
}
interface IInputs {
  [key: string]: IPricedOption
}
function isPricedOption(someObject: any) {
  return someObject.optionPrice !== undefined
}

/* --------------- Reporting Node -----------------------
dependsOn is a function that will examine each node already added and return true if the node is a dependency.
Then, any change in a dependency will trigger onUpstreamChange as usual.
Here, everything that has an optionPrice is a dependency
*/
export function addTotalPrice(graph: IGraph) {
  const node: IReportingNode<IInputs, number> = {
    initialValue: 0,
    dependsOn(nodeName, publishedVal) {
      return isPricedOption(publishedVal)
    },
    onUpstreamChange(inputs: IInputs) {
      var totalPrice = 0

      for (const [key, val] of Object.entries(inputs)) {
        totalPrice += val.valid ? (val.optionPrice || 0) : 0
      }
      return totalPrice
    },
  }
  graph.addNode("totalPrice", node)
}
