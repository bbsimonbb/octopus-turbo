import { IGraph, INode, ISource } from "octopus-state-graph"
import { IOption } from "../IOption"

export interface ITip {
  tipAsPct: boolean
  optionPrice: number
  valid: boolean
  touched: boolean
  parsedUserInput: number | null
}
class Inputs {
  pizza: IOption | null = null
}
export function addTip(graph: IGraph) {
  var returnVal: ITip = {
    tipAsPct: true,
    optionPrice: 0,
    valid: true,
    touched: false,
    parsedUserInput: null,
  }
  function recalculate() {
    if (returnVal.tipAsPct) {
      returnVal.optionPrice = _inputs.pizza?.valid?(_inputs.pizza?.optionPrice || 0) * 0.1:0
      returnVal.valid = true
    } else {
      if (returnVal.parsedUserInput === null) {
        returnVal.optionPrice = 0
        returnVal.valid = false
      } else {
        returnVal.optionPrice = returnVal.parsedUserInput || 0
        returnVal.valid = true
      }
    }
  }
  var _inputs: Inputs
  const node: INode<Inputs, ITip> = {
    initialValue: returnVal,
    dependsOn: new Inputs(),
    onUpstreamChange(inputs) {
      _inputs = inputs
      recalculate()
      return returnVal
    },
    publicMethods: {
      setTipAsPct(val: boolean) {
        returnVal.tipAsPct = val
        recalculate()
        publishChange(returnVal)
      },
      tipAmountOnChange(newVal: number | null) {
        returnVal.parsedUserInput = newVal
        returnVal.tipAsPct = false
        returnVal.touched = true
        recalculate()
        publishChange(returnVal)
      },
    },
  }
  const publishChange = graph.addNode("tip", node)
}
