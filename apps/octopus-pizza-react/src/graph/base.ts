import graph from "./bareReactiveGraph";
import { ONode } from "octopus-state-graph";
import { makeAutoObservable } from "mobx";

const node: ONode = {
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
  selectItem(index: number) {
    node.selectedIndex = index;
    node.touched = true;
    node.valid = true;
  },
};
const base = makeAutoObservable(graph.addNode("base", node));
export { base };
