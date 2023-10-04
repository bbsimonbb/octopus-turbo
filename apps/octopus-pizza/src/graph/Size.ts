import { IGraph, INode } from "octopus-state-graph";
import { IOption } from "../IOption.js";

// size
export function addSizeNode(graph: IGraph) {
  let node: INode<IOption> = {
    val: {
      optionValues: [
        {
          valueName: "small",
          coef: 1,
          selected: false,
        },
        {
          valueName: "medium",
          coef: 1.2,
          selected: false,
        },
        {
          valueName: "large",
          coef: 1.4,
          selected: false,
        },
      ],
      selectedIndex: 0,
      touched: false,
      valid: false,
      selectItem(index: number) {
        this.selectedIndex = index;
        this.touched = true;
        this.valid = true;
        this.optionValues.forEach((el, i) => {
          el.selected = i === index;
        });
      },
    },
  }
  graph.addNode("size", node);
}
