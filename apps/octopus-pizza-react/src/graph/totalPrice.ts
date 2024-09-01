/* eslint-disable @typescript-eslint/no-explicit-any */
import graph from "./bareReactiveGraph";
import { IOption } from "../IOption";
import { makeAutoObservable } from "mobx";

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

export const totalPrice = makeAutoObservable(
  graph.addNode(
    "totalPrice",
    {
      total: 0,
    },
    {
      reup(inputs: IPricedOption[]) {
        let returnVal = 0;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, val] of Object.entries(inputs)) {
          returnVal += (val as IOption).valid
            ? (val as IOption).optionPrice || 0
            : 0;
        }
        totalPrice.total = returnVal;
      },
      reupFilterFunc(nodeName, publishedVal) {
        return isPricedOption(publishedVal);
      },
    }
  )
);
