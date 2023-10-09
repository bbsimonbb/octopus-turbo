import graph from "./bareReactiveGraph";
import {action, makeAutoObservable} from "mobx"

const val = makeAutoObservable({
  checked: false,
  optionPrice: 0,
  deliveryAddress: "",
  valid: true,
  touched: false,
});
const node = {
  val,
  recalculate: action(()=> {
    val.optionPrice = val.checked ? 5 : 0;
    val.valid = !val.checked || !!val.deliveryAddress;
  }),
  methods: {
    setChecked: action((newVal: boolean)=>{
      val.checked = newVal;
    }),
    setDeliveryAddress: action((newVal: string)=>{
      val.deliveryAddress = newVal;
      val.touched = true;
      if (newVal) val.checked = true;
    }),
    deliveryOn: action(()=>{
      val.checked = true;
    }),
  },
};
export const delivery = graph.addNode("delivery", node);
