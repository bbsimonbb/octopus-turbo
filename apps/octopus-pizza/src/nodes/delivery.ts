import { reactive } from "vue";
import graph from "../bareReactiveGraph";

export const delivery = reactive(
  graph.addNode(
    "delivery",
    {
      checked: false,
      optionPrice: 0,
      deliveryAddress: "",
      valid: true,
      touched: false,
      setChecked(newVal: boolean) {
        delivery.checked = newVal;
      },
      setDeliveryAddress(newVal: string) {
        delivery.deliveryAddress = newVal;
        delivery.touched = true;
        if (newVal) delivery.checked = true;
      },
      deliveryOn() {
        delivery.checked = true;
      },
    },
    {
      reup() {
        delivery.optionPrice = delivery.checked ? 5 : 0;
        delivery.valid = !delivery.checked || !!delivery.deliveryAddress;
      },
    }
  )
);
