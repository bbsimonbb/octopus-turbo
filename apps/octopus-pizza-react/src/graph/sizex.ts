import graph from "./bareReactiveGraph.js";
import { makeAutoObservable } from "mobx";

// size
const node = {
  choices: [
    {
      id: "small",
      coef: 1,
      selected: false,
    },
    {
      id: "medium",
      coef: 1.2,
      selected: false,
    },
    {
      id: "large",
      coef: 1.4,
      selected: false,
    },
  ],
  selectedIndex: 0,
  touched: false,
  valid: false,
  selectItem(index: number) {
    node.selectedIndex = index;
    node.touched = true;
    node.valid = true;
    node.choices.forEach((el, i) => {
      el.selected = i === index;
    });
  },
};
export const size = makeAutoObservable(graph.addNode("size", node));
