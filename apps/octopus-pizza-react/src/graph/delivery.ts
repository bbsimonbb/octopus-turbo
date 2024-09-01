import graph from "./bareReactiveGraph";
import { makeAutoObservable } from "mobx";

export const delivery = makeAutoObservable(
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
