import graph from "./bareReactiveGraph";
import { IValid } from "./allValid";
import { makeAutoObservable } from "mobx";
import { ONode } from "octopus-state-graph";

// some private state
let canGo = false;
const node: ONode = {
  // this force displaying of error messages
  submitBlocked: false,
  async go() {
    if (canGo) {
      await alert("Excellent choice! Enjoy your pizza.");
      window.location.reload();
      // reset submit blocked when everything has worked
      node.submitBlocked = false;
    } else {
      alert("There are some problems with your order.");
      // remember that submission has been tried
      node.submitBlocked = true;
    }
  },
  _o: {
    reup({ allValid }: { allValid: IValid }) {
      canGo = allValid.valid;
    },
  },
};
export const doOrder = makeAutoObservable(graph.addNode("doOrder", node));
