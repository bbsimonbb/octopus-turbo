import { IGraph, INode } from "octopus-state-graph";
import { IOption } from "../IOption.js";
import { reactive } from "vue";
import graph from "./bareReactiveGraph.js"

// size
  const val = reactive({
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
  });
  let node: INode<IOption> = {
    val,
    methods: {
      selectItem(index: number) {
        val.selectedIndex = index;
        val.touched = true;
        val.valid = true;
        val.optionValues.forEach((el, i) => {
          el.selected = i === index;
        });
      },
    },
  };
  export const size = graph.addNode("size", node);
