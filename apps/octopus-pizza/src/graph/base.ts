import { IGraph, ISource } from "octopus-state-graph"
import { IOption } from "../IOption.js"

// size
export function addBaseNode(graph: IGraph) {
  let returnVal: IOption = {
    optionValues: [
      {
        valueName: "bianca",
        selected: false,
      },
      {
        valueName: "rossa",
        selected: false,
      },
    ],
    selectedIndex: 0,
    selectedValue: undefined,
    valid: false,
    touched: false,
  }
  let node: ISource<IOption> = {
    initialValue: returnVal,
    publicMethods: {
      selectItem(index: number) {
        returnVal.selectedIndex = index
        returnVal.touched = true
        returnVal.valid = true
        returnVal.optionValues.forEach((el, i) => {
          el.selected = i === index
        })
        returnVal.selectedValue = returnVal.optionValues[index]
        publishChange(returnVal)
      },
    },
  }
  let publishChange = graph.addNode("base", node)
}
