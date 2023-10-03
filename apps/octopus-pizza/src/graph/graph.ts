import { createGraph } from "octopus-state-graph"
import { reactive } from "vue"
import { addBaseNode } from "./base"
import { addDelivery } from "./delivery"
import { addPizzaNode } from "./Pizza"
import { addSizeNode } from "./Size"
import { addTip } from "./tip"
import { addTotalPrice} from "./totalPrice"
import { addAllValid } from "./allValid"
import { addDoOrder } from "./doOrder"

export default function () {
  var graph = createGraph(reactive)
  addDoOrder(graph)
  addAllValid(graph)
  addTotalPrice(graph)
  addTip(graph)
  addPizzaNode(graph)
  addSizeNode(graph)
  addBaseNode(graph)
  addDelivery(graph)

  graph.build()
  graph.fullTraversal()

  return graph
}
