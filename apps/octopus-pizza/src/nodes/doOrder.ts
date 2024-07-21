import graph from "../bareReactiveGraph";
import { IGraph, INode } from "octopus-state-graph";
import { IValid } from "./allValid";
import { reactive } from "vue";

let canGo = false;
const val = reactive({
  // this force displaying of error messages
  submitBlocked: false,
});
const node = {
  val,
  reup({ allValid }: { allValid: IValid }) {
    canGo = allValid.valid;
  },
  methods: {
    async go() {
      if (canGo) {
        await alert("Excellent choice! Enjoy your pizza.");
        window.location.reload();
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
