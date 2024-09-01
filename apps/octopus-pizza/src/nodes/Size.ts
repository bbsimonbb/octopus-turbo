import { reactive } from "vue";
import graph from "../bareReactiveGraph";

// size
export const size = reactive(
  graph.addNode("size", {
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
      size.selectedIndex = index;
      size.touched = true;
      size.valid = true;
      size.choices.forEach((el, i) => {
        el.selected = i === index;
      });
    },
  })
);
