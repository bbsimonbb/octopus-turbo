import { reactive } from "vue";
import graph from "./bareReactiveGraph";
import { IGraph, INode } from "octopus-state-graph";

const val = reactive({
  checked: false,
  optionPrice: 0,
  deliveryAddress: "",
  valid: true,
  touched: false,
});
const node = {
  val,
  reup() {
    val.optionPrice = this.val.checked ? 5 : 0;
    val.valid = !this.val.checked || !!this.val.deliveryAddress;
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
