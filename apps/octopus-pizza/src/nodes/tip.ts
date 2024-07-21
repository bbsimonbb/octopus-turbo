import { INode } from "octopus-state-graph";
import { IOption } from "../IOption";
import graph from "../bareReactiveGraph";
import { reactive } from "vue";
export interface ITip {
  tipAsPct: boolean;
  optionPrice: number;
  valid: boolean;
  touched: boolean;
  parsedUserInput: number | null;
}
class Inputs {
  pizza: IOption | null = null;
}
const val: ITip = reactive({
  tipAsPct: true,
  optionPrice: 0,
  valid: true,
  touched: false,
  parsedUserInput: null,
});
const node: INode<ITip> = {
  val,
  reup({ pizza }: { pizza: IOption }) {
    if (val) {
      if (val.tipAsPct) {
        val.optionPrice = pizza?.valid ? (pizza?.optionPrice || 0) * 0.1 : 0;
        val.valid = true;
      } else {
        if (val.parsedUserInput === null) {
          val.optionPrice = 0;
          val.valid = false;
        } else {
          val.optionPrice = val.parsedUserInput || 0;
          val.valid = true;
        }
      }
    }
  },
  methods: {
    setTipAsPct(tipAsPct: boolean): void {
      val.tipAsPct = tipAsPct;
      val.touched = true;
    },
    tipAmountOnChange(newVal: number | null): void {
      val.parsedUserInput = newVal;
      val.tipAsPct = false;
      val.touched = true;
    },
  },
};
export const tip = graph.addNode("tip", node);
