import { IGraph, INode } from "octopus-state-graph"
import { IValid } from "./allValid"

export function addDoOrder(graph: IGraph) {
  const val = {
    submitBlocked:false,
  }
  const node = {
    val,
    recalculate(allValid: IValid) {
      val.submitBlocked = !allValid.valid
    },
    methods:{
      go() {
        if(!val.submitBlocked){
          alert("Excellent choice! Enjoy your pizza.")
        }
        else {
          alert("There are some problems with your order.")
        }
      }
    }
  }
  graph.addNode("doOrder", node)
}
