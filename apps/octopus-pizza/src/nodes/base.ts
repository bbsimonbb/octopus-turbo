import { reactive } from "vue";
import graph from "../bareReactiveGraph";

const base = reactive(
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
      base.choices.forEach((el, i) => {
        el.selected = i === index;
      });
    },
  })
);

export { base };
