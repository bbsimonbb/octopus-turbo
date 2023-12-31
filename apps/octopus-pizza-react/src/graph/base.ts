import graph from "./bareReactiveGraph";
import { INode } from "octopus-state-graph";
import { IOption, IOptionMethods } from "../IOption.js";
import {makeAutoObservable} from "mobx"

const val: IOption = makeAutoObservable({
  choices: [
    {
      id: "bianca",
      selected: false,
    },
    {
      id: "rossa",
      selected: false,
    },
  ],
  selectedIndex: undefined,
  valid: false,
  touched: false,
});

const node: INode<IOption, IOptionMethods> = {
  val,
  methods: {
    selectItem(index: number) {
      val.selectedIndex = index;
      val.touched = true;
      val.valid = true;
    },
  },
};
const base = graph.addNode("base", node);
export { base };
