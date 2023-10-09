/* eslint-disable @typescript-eslint/no-explicit-any */
import graph from "./bareReactiveGraph";
import { IReportingNode } from "octopus-state-graph/lib/INode.mjs";
import { IOption } from "../IOption";
import { makeAutoObservable} from "mobx"

interface IPricedOption {
  optionPrice: number;
  valid: boolean;
}

function isPricedOption(someObject: any) {
  return someObject.optionPrice !== undefined;
}

/* --------------- Reporting Node -----------------------
dependsOn is a function that will examine each node already added and return true if the node is a dependency.
Then, any change in a dependency will trigger onUpstreamChange as usual.
Here, everything that has an optionPrice is a dependency
*/

const val = makeAutoObservable({ total: 0 });
const node: IReportingNode<any> = {
  val,
  recalculate(inputs:IPricedOption[]) {
    let totalPrice = 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
