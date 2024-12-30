import { reactive } from "vue";
import { IOption } from "../IOption";
import graph from "../bareReactiveGraph";

export interface ITip {
  tipAsPct: boolean;
  optionPrice: number;
  valid: boolean;
  touched: boolean;
  parsedUserInput: number | null;
  setTipAsPct: (tipAsPct: boolean) => void;
  tipAmountOnChange: (newVal: number | null) => void;
}

const node: ITip = {
  tipAsPct: true,
  optionPrice: 0,
  valid: true,
  touched: false,
  parsedUserInput: null,
  setTipAsPct(tipAsPct: boolean): void {
    node.tipAsPct = tipAsPct;
    node.touched = true;
  },
  tipAmountOnChange(newVal: number | null): void {
    node.parsedUserInput = newVal;
    node.tipAsPct = false;
    node.touched = true;
  },
};

export const tip = reactive(
  graph.addNode("tip", node, {
    reup({ pizza }: { pizza: IOption }) {
      if (node.tipAsPct) {
        node.optionPrice = pizza?.valid ? (pizza?.optionPrice || 0) * 0.1 : 0;
        node.valid = true;
      } else {
        if (node.parsedUserInput === null) {
          node.optionPrice = 0;
          node.valid = false;
        } else {
          node.optionPrice = node.parsedUserInput || 0;
          node.valid = true;
        }
      }
    },
  })
);
