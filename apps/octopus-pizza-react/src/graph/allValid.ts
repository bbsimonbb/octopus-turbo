import graph from "./bareReactiveGraph";
import { makeAutoObservable } from "mobx";

export interface IValid {
  valid: boolean;
}

function isIValid(someObject: IValid) {
  return someObject.valid !== undefined;
}

/* --------------- Reporting Node -----------------------
dependsOn is a function that will examine each node already added and return true if the node is a dependency.
Then, any change in a dependency will trigger onUpstreamChange as usual.
Here, everything that has an optionPrice is a dependency
*/

const allValid = makeAutoObservable(
  graph.addNode(
    "allValid",
    {
      valid: false,
    },
    {
      reupFilterFunc(nodeName, node) {
        return isIValid(node);
      },
      reup(nodes) {
        let returnVal = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_, val] of Object.entries(nodes)) {
          returnVal = returnVal && !!(val as IValid).valid;
        }
        allValid.valid = returnVal;
      },
    }
  )
);
export { allValid };
