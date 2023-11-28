import { INode } from "octopus-state-graph";
import { IOption } from "../IOption.js";
import graph from "./bareReactiveGraph.js";
import { action, makeAutoObservable } from "mobx";
import { IChoice } from "../IChoice.js";


type pizzaKeys = "4 Stagioni" |
  "Gorgonzola" |
  "Margherita" |
  "Prosciutto"

interface IPizzaChoice extends IChoice {
  id: pizzaKeys
  basePrice: number
}
export interface IPizzaOption extends IOption<IPizzaChoice> {
  canChoose: boolean;
}

const val: IPizzaOption = makeAutoObservable({
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
  selectedIndex: undefined,
  optionPrice: 0,
  valid: false,
  touched: false,
  canChoose: false,
});
const node: INode<IPizzaOption> = {
  val,
  reup(size: IOption, base: IOption) {
    action(() => {
      if (val) {
        let pizzaChoice:IPizzaChoice|null
        if(val.selectedIndex !== undefined)
        pizzaChoice = val.choices[val.selectedIndex]
        else pizzaChoice = null
        let baseChoice:IChoice|null
        if(base.selectedIndex !== undefined)
        baseChoice = base.choices[base.selectedIndex]
        else baseChoice = null
        val.choices.forEach((val) => {
          val.price =
            val.basePrice * size?.choices[size?.selectedIndex || 0].coef;
          val.hide = val.base !== baseChoice?.id;
        });
        val.canChoose = !!size?.valid && !!base?.valid;
        val.optionPrice = pizzaChoice?.price;
        val.valid = !!pizzaChoice && !pizzaChoice?.hide;
      }
    })();
  },
  methods: {
    selectItem(index: number) {
      action(() => {
        // can't select pizzas that are hidden
        if (!val.choices[index].hide) {
          val.selectedIndex = index;
          val.choices.forEach((el, i) => {
            el.selected = i === index;
          });
          val.touched = true;
        }
      })();
    },
  },
};
export const pizza = graph.addNode("pizza", node);
