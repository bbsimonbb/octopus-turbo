import { IGraph, ISource } from "octopus-state-graph"
import { IOption } from "../IOption.js"

// size
export function addSizeNode(graph: IGraph) {
  let returnVal : IOption = {
    optionValues: [
      {
        valueName: "small",
        coef: 1,
        selected: false
      },
      {
        valueName: "medium",
        coef: 1.2,
        selected: false
      },
      {
        valueName: "large",
        coef: 1.4,
        selected: false
      },
    ],
    selectedIndex: 0,
    touched: false,
    valid: false
  }
  let node:ISource<IOption> = {
    initialValue: returnVal,
    publicMethods: {
      selectItem(index: number) {
        returnVal.selectedIndex = index
        returnVal.touched = true
        returnVal.valid = true
        returnVal.optionValues.forEach((el, i) => {
          el.selected = i === index
        })
        publishChange(returnVal)
      },
    },
  }
  let publishChange = graph.addNode("size", node)
}
