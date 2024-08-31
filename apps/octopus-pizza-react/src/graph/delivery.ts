import { ONode } from "octopus-state-graph";
import graph from "./bareReactiveGraph";
import { makeAutoObservable } from "mobx";

const node: ONode = {
  checked: false,
  optionPrice: 0,
  deliveryAddress: "",
  valid: true,
  touched: false,
  setChecked(newVal: boolean) {
    node.checked = newVal;
  },
  setDeliveryAddress(newVal: string) {
    node.deliveryAddress = newVal;
    node.touched = true;
    if (newVal) node.checked = true;
  },
  deliveryOn() {
    node.checked = true;
  },
  _o: {
    reup() {
      node.optionPrice = node.checked ? 5 : 0;
      node.valid = !node.checked || !!node.deliveryAddress;
    },
  },
};
export const delivery = makeAutoObservable(graph.addNode("delivery", node));
