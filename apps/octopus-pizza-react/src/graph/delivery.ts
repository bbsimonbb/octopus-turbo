import graph from "./bareReactiveGraph";
import { action, makeAutoObservable } from "mobx";

const val = makeAutoObservable({
  checked: false,
  optionPrice: 0,
  deliveryAddress: "",
  valid: true,
  touched: false,
});
const node = {
  val,
  recalculate() {
    action(() => {
      val.optionPrice = val.checked ? 5 : 0;
      val.valid = !val.checked || !!val.deliveryAddress;
    })();
  },
  methods: {
    setChecked(newVal: boolean) {
      val.checked = newVal;
    },
    setDeliveryAddress(newVal: string) {
      val.deliveryAddress = newVal;
      val.touched = true;
      if (newVal) val.checked = true;
    },
    deliveryOn() {
      val.checked = true;
    },
  },
};
export const delivery = graph.addNode("delivery", node);
