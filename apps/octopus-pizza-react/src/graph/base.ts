import graph from "./bareReactiveGraph";
import { makeAutoObservable } from "mobx";

const base = makeAutoObservable(
  graph.addNode("base", {
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
    selectedIndex: -1,
    valid: false,
    touched: false,
    selectItem(index: number) {
      base.selectedIndex = index;
      base.touched = true;
      base.valid = true;
    },
  })
);

export { base };
