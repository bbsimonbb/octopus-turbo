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
  const node: INode<Inputs,Output> = {
    initialValue: new Output(true),
    publicMethods: {
      go() {
        if(canSubmit){
          alert("Excellent choice! Enjoy your pizza.")
          submitBlocked = false
        }
        else {
          alert("There are some problems with your order.")
          submitBlocked = true
        }
        publishChange(new Output(submitBlocked))
      },
    },
    dependsOn: new Inputs(),
    onUpstreamChange(inputs) {
      canSubmit = inputs.allValid
      return new Output(submitBlocked)
    },
  }
  const publishChange = graph.addNode("doOrder", node)
}
