
import graph from "./bareReactiveGraph"
import { base } from "./base"
import { delivery } from "./delivery"
import { addPizzaNode } from "./Pizza"
import { addSizeNode } from "./Size"
import { addTip } from "./tip"
import { totalPrice} from "./totalPrice"
import {allValid} from "./allValid"
import { doOrder } from "./doOrder"

const a = allValid.val
const b = base.val
const d = delivery.val
const o = doOrder.val
const t = totalPrice.val

export default function () {
  addTip(graph)
  addPizzaNode(graph)
  addSizeNode(graph)

  graph.build()
  graph.fullTraversal()

  return graph
}
