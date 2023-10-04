import { IGraph, INode } from "octopus-state-graph";


export function addDelivery(graph: IGraph) {
  const node = {
    val: {
      checked: false,
      optionPrice: 0,
      deliveryAddress: '',
      valid: true,
      touched: false,
      setChecked(newVal: boolean) {
        this.checked = newVal
      },
      setDeliveryAddress(newVal: string) {
        this.deliveryAddress = newVal;
        this.touched = true
      },
      deliveryOn() {
        this.checked = true;
      },
    },
    recalculate() {
      this.val.optionPrice = this.val.checked ? 5 : 0;
      this.val.valid = !this.val.checked || !!this.val.deliveryAddress;
    }
  };
  graph.addNode("delivery", node);
}
