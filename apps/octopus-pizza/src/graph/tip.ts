import { IGraph, INode } from "octopus-state-graph";
import { IOption } from "../IOption";

export interface ITip {
  tipAsPct: boolean;
  optionPrice: number;
  valid: boolean;
  touched: boolean;
  parsedUserInput: number | null;
  setTipAsPct: (val: boolean) => void;
  tipAmountOnChange(newVal: number | null): void;
}
class Inputs {
  pizza: IOption | null = null;
}
export function addTip(graph: IGraph) {
  const node: INode<ITip> = {
    val: {
      tipAsPct: true,
      optionPrice: 0,
      valid: true,
      touched: false,
      parsedUserInput: null,
      setTipAsPct(val: boolean): void {
        this.tipAsPct = val;
      },
      tipAmountOnChange(newVal: number | null): void {
        this.parsedUserInput = newVal;
        this.tipAsPct = false;
        this.touched = true;
      },
    },
    recalculate(pizza: IOption) {
      if (this?.val) {
        if (this.val.tipAsPct) {
          this.val.optionPrice = pizza?.valid
            ? (pizza?.optionPrice || 0) * 0.1
            : 0;
          this.val.valid = true;
        } else {
          if (this.val.parsedUserInput === null) {
            this.val.optionPrice = 0;
            this.val.valid = false;
          } else {
            this.val.optionPrice = this.val.parsedUserInput || 0;
            this.val.valid = true;
          }
        }
      }
    },
  };
  graph.addNode("tip", node);
}
