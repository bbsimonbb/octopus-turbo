import { IGraph, INode, ISource } from "octopus-state-graph"

export interface IDelivery {
  checked: boolean
  optionPrice: number
  deliveryAddress: string|null
   valid: boolean
   touched:boolean
}
export function addDelivery(graph: IGraph) {
  var returnVal: IDelivery = {
    checked: false,
    optionPrice: 0,
    deliveryAddress:null,
    valid: true,
    touched:false
  }
  function recalculate() {
    returnVal.optionPrice = returnVal.checked ? 5 : 0
    returnVal.valid = !returnVal.checked || !!returnVal.deliveryAddress
  }
  const node: ISource<IDelivery> = {
    initialValue: returnVal,
    publicMethods: {
      setChecked(newVal:boolean) {
        returnVal.checked = newVal
        recalculate()
        publishChange(returnVal)
      },
      setDeliveryAddress(newVal:string){
        returnVal.deliveryAddress = newVal
        returnVal.touched = true
        recalculate()
        publishChange(returnVal)
      },
      deliveryOn() {
        returnVal.checked = true
        recalculate()
        publishChange(returnVal)
      },
    },
  }
  const publishChange = graph.addNode("delivery", node)
}
