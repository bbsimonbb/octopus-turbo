import graph from "./bareReactiveGraph";
import { INode } from "octopus-state-graph";
import { IOption, IOptionMethods } from "../IOption.js";

const val: IOption = {
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
};

let node: INode<IOption, IOptionMethods> = {
  val,
  methods: {
    selectItem(index: number) {
      val.selectedIndex = index;
      val.touched = true;
      val.valid = true;
      val.optionValues.forEach((el, i) => {
        el.selected = i === index;
      });
      val.selectedValue = val.optionValues[index];
    },
  },
};
const base = graph.addNode("base", node);
export { base };
