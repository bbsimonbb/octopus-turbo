/* eslint-disable @typescript-eslint/no-unused-vars */

import graph from "./bareReactiveGraph"
import { base } from "./base"
import { delivery } from "./delivery"
import { pizza } from "./Pizza"
import { size } from "./Size"
import { tip } from "./tip"
import { totalPrice} from "./totalPrice"
import {allValid} from "./allValid"
import { doOrder } from "./doOrder"

const a = allValid.val
const b = base.val
const d = delivery.val
const o = doOrder.val
const t = totalPrice.val
const ti = tip.val
const p = pizza.val
const s = size.val

export default function () {

  graph.build()
  graph.fullTraversal()

  return graph
}
