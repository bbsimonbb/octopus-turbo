import graph from "./bareReactiveGraph";
import { IReportingNode } from "octopus-state-graph";
import {action, makeAutoObservable} from "mobx"

export interface IValid {
  valid: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isIValid(someObject: any) {
  return someObject.valid !== undefined;
}

/* --------------- Reporting Node -----------------------
dependsOn is a function that will examine each node already added and return true if the node is a dependency.
Then, any change in a dependency will trigger onUpstreamChange as usual.
Here, everything that has an optionPrice is a dependency
*/
const val: IValid = makeAutoObservable( { valid: false });

const node: IReportingNode<IValid,null> = {
  val,
  options: {
    dependsOn(nodeName, publishedVal) {
      return isIValid(publishedVal);
    },
  },
  recalculate: action((nodes)=>{
    let allValid = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, val] of Object.entries(nodes)) {
      allValid = allValid && !!(val as IValid).valid;
    }
    val.valid = allValid;
  }),
};
const allValid = graph.addNode("allValid", node);
export { allValid };
