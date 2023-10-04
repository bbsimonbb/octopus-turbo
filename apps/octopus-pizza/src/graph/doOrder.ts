import { IGraph, INode } from "octopus-state-graph"

class Inputs {
  allValid = false
}
class Output {
  constructor(val:boolean){
    this.submitBlocked = val
  }
  submitBlocked = false
}

export function addDoOrder(graph: IGraph) {
  let canSubmit = false
  let submitBlocked = false
  const node = {
    val: {
      submitBlocked:false,
      go() {
        if(canSubmit){
          alert("Excellent choice! Enjoy your pizza.")
        }
        else {
          alert("There are some problems with your order.")
        }
      }
    },
    recalculate(allValid: any) {
      this.val.submitBlocked = allValid
    },
  }
  graph.addNode("doOrder", node)
}
