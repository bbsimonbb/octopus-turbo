import { IGraph, INode } from "octopus-state-graph";

export function addDelivery(graph: IGraph) {
  const val = {
    checked: false,
    optionPrice: 0,
    deliveryAddress: "",
    valid: true,
    touched: false,
  };
  const node = {
    val,
    recalculate() {
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
  graph.addNode("delivery", node);
}
