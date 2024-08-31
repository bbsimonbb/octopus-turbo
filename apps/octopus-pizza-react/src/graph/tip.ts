import { INode2 } from "octopus-state-graph";
import { IOption } from "../IOption";
import graph from "./bareReactiveGraph";
import { makeAutoObservable } from "mobx";

export interface ITip {
  tipAsPct: boolean;
  optionPrice: number;
  valid: boolean;
  touched: boolean;
  parsedUserInput: number | null;
  setTipAsPct: (tipAsPct: boolean) => void;
  tipAmountOnChange: (newVal: number | null) => void;
}

const node: ITip & INode2 = {
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
  _o: {
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
  },
};
export const tip = makeAutoObservable(graph.addNode("tip", node));
