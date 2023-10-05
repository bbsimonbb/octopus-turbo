import graph from "./bareReactiveGraph";
import { IGraph, INode } from "octopus-state-graph";
import { IReportingNode } from "octopus-state-graph/lib/INode.mjs";
import { IOption } from "../IOption";

interface IPricedOption {
  optionPrice: number;
  valid: boolean;
}
interface IInputs {
  [key: string]: IPricedOption;
}
function isPricedOption(someObject: any) {
  return someObject.optionPrice !== undefined;
}

/* --------------- Reporting Node -----------------------
dependsOn is a function that will examine each node already added and return true if the node is a dependency.
Then, any change in a dependency will trigger onUpstreamChange as usual.
Here, everything that has an optionPrice is a dependency
*/

const val = { total: 0 };
const node: IReportingNode<any> = {
  val,
  recalculate(inputs) {
    var totalPrice = 0;

    for (const [key, val] of Object.entries(inputs)) {
      totalPrice += (val as IOption).valid
        ? (val as IOption).optionPrice || 0
        : 0;
    }
    val.total = totalPrice;
  },
  options: {
    dependsOn(nodeName, publishedVal) {
      return isPricedOption(publishedVal);
    },
  },
};
export const totalPrice = graph.addNode("totalPrice", node);
