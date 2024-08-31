import { IOption } from "../IOption.js";
import graph from "./bareReactiveGraph.js";
import { makeAutoObservable } from "mobx";
import { IChoice } from "../IChoice.js";

type pizzaKeys = "4 Stagioni" | "Gorgonzola" | "Margherita" | "Prosciutto";

interface IPizzaChoice extends IChoice {
  id: pizzaKeys;
  basePrice: number;
}
export interface IPizzaOption extends IOption<IPizzaChoice> {
  canChoose: boolean;
}

const node = {
  choices: [
    {
      id: "4 Stagioni",
      base: "bianca",
      basePrice: 6.5,
      price: 0,
      imageUrl: "stagioni4.avif",
      selected: false,
      hide: false,
    },
    {
      id: "Gorgonzola",
      base: "bianca",
      basePrice: 5.5,
      price: 0,
      imageUrl: "gorgonzola.jpg",
      selected: false,
      hide: false,
    },
    {
      id: "Margherita",
      base: "rossa",
      basePrice: 4,
      price: 0,
      imageUrl: "margherita.webp",
      selected: false,
      hide: false,
    },
    {
      id: "Prosciutto",
      base: "rossa",
      basePrice: 4.5,
      price: 0,
      imageUrl: "prosciutto.webp",
      selected: false,
      hide: false,
    },
  ],
  selectedValue: undefined,
  selectedIndex: -1,
  optionPrice: 0,
  valid: false,
  touched: false,
  canChoose: false,
  selectItem(index: number) {
    // can't select pizzas that are hidden
    if (!node.choices[index].hide) {
      node.selectedIndex = index;
      node.choices.forEach((el, i) => {
        el.selected = i === index;
      });
      node.touched = true;
    }
  },
  _o: {
    reup({ size, base }: { size: IOption; base: IOption }) {
      node.choices.forEach((c) => {
        c.price = c.basePrice * size?.choices[size?.selectedIndex || 0].coef;
        if (base.selectedIndex === -1) c.hide = true;
        else {
          const baseChoice = base.choices[base.selectedIndex];
          c.hide = c.base !== baseChoice?.id;
        }
      });
      if (node.selectedIndex !== undefined) {
        const pizzaChoice = node.choices[node.selectedIndex];
        node.optionPrice = pizzaChoice?.price;
        node.valid = !!pizzaChoice && !pizzaChoice?.hide;
      } else {
        node.optionPrice = 0;
        node.valid = false;
        node.canChoose = !!size?.valid && !!base?.valid;
      }
    },
  },
};
export const pizza = makeAutoObservable(graph.addNode("pizza", node));
