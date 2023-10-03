import { INode } from "octopus-state-graph"
import { IGraph } from "octopus-state-graph/lib/IGraph.mjs"
import { IOption } from "../IOption.js"

export interface IPizza extends IOption {
  canChoose:boolean
}
class Inputs {
  size: IOption | null = null
  base: IOption | null = null
}
export function addPizzaNode(graph: IGraph) {
  let returnVal: IPizza = {
    optionValues: [
      {
        valueName: "4 Stagioni",
        base: "bianca",
        basePrice: 6.5,
        imageUrl: "stagioni4.avif",
        selected: false,
        hide: false,
      },
      {
        valueName: "Gorgonzola",
        base: "bianca",
        basePrice: 5.5,
        imageUrl: "gorgonzola.jpg",
        selected: false,
        hide: false,
      },
      {
        valueName: "Margherita",
        base: "rossa",
        basePrice: 4,
        imageUrl: "margherita.webp",
        selected: false,
        hide: false,
      },
      {
        valueName: "Prosciutto",
        base: "rossa",
        basePrice: 4.5,
        imageUrl: "prosciutto.webp",
        selected: false,
        hide: false,
      },
    ],
    selectedValue: undefined,
    selectedIndex: -1,
    optionPrice: 0,
    valid: false,
    touched: false,
    canChoose: false
  }
  function recalculate() {
    returnVal.optionPrice = returnVal.selectedValue?.price
    returnVal.valid = !!returnVal.selectedValue && !returnVal.selectedValue?.hide
  }
  let node: INode<Inputs, IPizza> = {
    initialValue: returnVal,
    dependsOn: new Inputs(),
    onUpstreamChange(inputs) {
      returnVal.optionValues.forEach((val) => {
        val.price = val.basePrice * inputs.size?.optionValues[inputs.size?.selectedIndex || 0].coef
        val.hide = val.base !== inputs.base?.selectedValue?.valueName
      })
      returnVal.canChoose = !!inputs.size?.valid && !!inputs.base?.valid
      recalculate()
      return returnVal
    },
    publicMethods: {
      selectItem(index: number) {
        // can't select pizzas that are hidden
        if (!returnVal.optionValues[index].hide) {
          returnVal.selectedIndex = index
          returnVal.selectedValue = returnVal.optionValues[index]
          returnVal.optionValues.forEach((el, i) => {
            el.selected = i === index
          })
          returnVal.touched = true
        }
        recalculate()
        publishChange(returnVal)
      },
    },
  }
  let publishChange = graph.addNode("pizza", node)
}
