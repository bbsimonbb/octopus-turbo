import graph from "./bareReactiveGraph";
import { IGraph, INode } from "octopus-state-graph";
import { IValid } from "./allValid";

let canGo = false;
const val = {
  // this force displaying of error messages
  submitBlocked: false,
};
const node = {
  val,
  recalculate(allValid: IValid) {
    canGo = allValid.valid;
  },
  methods: {
    go() {
      if (canGo) {
        alert("Excellent choice! Enjoy your pizza.");
        // reset submit blocked when everything has worked
        val.submitBlocked = false;
      } else {
        alert("There are some problems with your order.");
        // remember that submission has been tried
        val.submitBlocked = true;
      }
    },
  },
};
export const doOrder = graph.addNode("doOrder", node);
