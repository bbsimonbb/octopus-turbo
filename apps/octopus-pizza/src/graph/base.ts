import { IGraph, INode } from "octopus-state-graph";
import { IOption } from "../IOption.js";

// size
export function addBaseNode(graph: IGraph) {
  const val : IOption =  {
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
  let node: INode<IOption> = {
    val,
    methods:{
      selectItem(index: number) {
        val.selectedIndex = index;
        val.touched = true;
        val.valid = true;
        val.optionValues.forEach((el, i) => {
          el.selected = i === index;
        });
        val.selectedValue = val.optionValues[index];
      },      
    }
  }
  graph.addNode("base", node);
}
