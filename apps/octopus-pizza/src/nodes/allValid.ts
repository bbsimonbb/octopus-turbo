import { reactive } from "vue";
import graph from "../bareReactiveGraph";
import { IReportingNode } from "octopus-state-graph";

export interface IValid {
  valid: boolean;
}
function isIValid(someObject: any) {
  return someObject.valid !== undefined;
}

/* --------------- Reporting Node -----------------------
dependsOn is a function that will examine each node already added and return true if the node is a dependency.
Then, any change in a dependency will trigger onUpstreamChange as usual.
Here, everything that has an optionPrice is a dependency
*/
const val: IValid = reactive( { valid: false });

const node: IReportingNode<IValid,null> = {
  val,
  options: {
    dependsOn(nodeName, publishedVal) {
      return isIValid(publishedVal);
    },
  },
  reup(nodes) {
    var allValid = true;
    for (const [key, val] of Object.entries(nodes)) {
      allValid = allValid && !!(val as IValid).valid;
    }
    val.valid = allValid;
  },
};
const allValid = graph.addNode("allValid", node);
export { allValid };
