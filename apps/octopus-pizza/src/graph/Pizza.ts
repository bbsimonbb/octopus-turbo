import { INode } from "octopus-state-graph";
import { IGraph } from "octopus-state-graph/lib/IGraph.mjs";
import { IOption } from "../IOption.js";

export interface IPizza extends IOption {
  canChoose: boolean;
}

export function addPizzaNode(graph: IGraph) {
  const node: INode<IOption> = {
    val: {
      optionValues: [
        {
          valueName: "4 Stagioni",
          base: "bianca",
          basePrice: 6.5,
          price: 0,
          imageUrl: "stagioni4.avif",
          selected: false,
          hide: false,
        },
        {
          valueName: "Gorgonzola",
          base: "bianca",
          basePrice: 5.5,
          price: 0,
          imageUrl: "gorgonzola.jpg",
          selected: false,
          hide: false,
        },
        {
          valueName: "Margherita",
          base: "rossa",
          basePrice: 4,
          price: 0,
          imageUrl: "margherita.webp",
          selected: false,
          hide: false,
        },
        {
          valueName: "Prosciutto",
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
        if (!this.optionValues[index].hide) {
          this.selectedIndex = index;
          this.selectedValue = this.optionValues[index];
          this.optionValues.forEach((el, i) => {
            el.selected = i === index;
          });
          this.touched = true;
        }
      },
    },
    recalculate(size: IOption, base: IOption) {
      if (this.val) {
        this.val.optionValues.forEach((val) => {
          val.price =
            val.basePrice * size?.optionValues[size?.selectedIndex || 0].coef;
          val.hide = val.base !== base?.selectedValue?.valueName;
        });
        this.val.canChoose = !!size?.valid && !!base?.valid;
        this.val.optionPrice = this.val.selectedValue?.price;
        this.val.valid =
          !!this.val.selectedValue && !this.val.selectedValue?.hide;
      }
    },
  };
  graph.addNode("pizza", node);
}
