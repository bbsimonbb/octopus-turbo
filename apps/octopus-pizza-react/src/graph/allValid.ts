import graph from "./bareReactiveGraph";
import { ONode } from "octopus-state-graph";
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

const node: ONode = {
  valid: false,
  _o: {
    reupFilterFunc(nodeName, publishedVal) {
      return isIValid(publishedVal);
    },
    reup(nodes: ONode[]) {
      let allValid = true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_, val] of Object.entries(nodes)) {
        allValid = allValid && !!(val as IValid).valid;
      }
      node.valid = allValid;
    },
  },
};
const allValid = makeAutoObservable(graph.addNode("allValid", node));
export { allValid };
