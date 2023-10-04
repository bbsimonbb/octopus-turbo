import { IGraph, INode } from "octopus-state-graph";
import { IOption } from "../IOption.js";

// size
export function addBaseNode(graph: IGraph) {
  let node: INode<IOption> = {
    val: {
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
      selectItem(index: number) {
        this.selectedIndex = index;
        this.touched = true;
        this.valid = true;
        this.optionValues.forEach((el, i) => {
          el.selected = i === index;
        });
        this.selectedValue = this.optionValues[index];
      },
    }
  }
  graph.addNode("base", node);
}
