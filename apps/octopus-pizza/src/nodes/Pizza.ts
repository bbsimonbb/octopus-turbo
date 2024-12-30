import { reactive } from "vue";
import { IOption } from "../IOption";
import { IChoice } from "../IOptionValue";
import graph from "../bareReactiveGraph";

type pizzaKeys = "4 Stagioni" | "Gorgonzola" | "Margherita" | "Prosciutto";

interface IPizzaChoice extends IChoice {
  id: pizzaKeys;
  basePrice: number;
}
export interface IPizzaOption extends IOption<IPizzaChoice> {
  canChoose: boolean;
}

export const pizza = reactive(
  graph.addNode(
    "pizza",
    {
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
      selectedIndex: -1,
      optionPrice: 0,
      valid: false,
      touched: false,
      canChoose: false,
      selectItem(index: number) {
        // can't select pizzas that are hidden
        if (!pizza.choices[index].hide) {
          pizza.selectedIndex = index;
          pizza.choices.forEach((el, i) => {
            el.selected = i === index;
          });
          pizza.touched = true;
        }
      },
    },
    {
      reup({ size, base }: { size: IOption; base: IOption }) {
        pizza.choices.forEach((c) => {
          c.price = c.basePrice * size?.choices[size?.selectedIndex || 0].coef;
          if (base.selectedIndex === -1) c.hide = true;
          else {
            const baseChoice = base.choices[base.selectedIndex];
            c.hide = c.base !== baseChoice?.id;
          }
        });
        if (pizza.selectedIndex !== undefined) {
          const pizzaChoice = pizza.choices[pizza.selectedIndex];
          pizza.optionPrice = pizzaChoice?.price;
          pizza.valid = !!pizzaChoice && !pizzaChoice?.hide;
        } else {
          pizza.optionPrice = 0;
          pizza.valid = false;
        }
        pizza.canChoose = !!size?.valid && !!base?.valid;
      },
    }
  )
);
