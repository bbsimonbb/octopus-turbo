import { createGraph } from "../Graph.mjs"
import { test, expect } from "vitest"
export { }

test("a radically simple node can be added", async () => {
  return true
  const graph: any = createGraph()

  const myNode = graph.addNode(
    "proxied", {
      val:{
      someProp: "some value",
      someOnChangeHandler: function (input) {
        this.someProp = input
      },
    },
    // this is the recalculate function for my node
    // recalculate:function (anArg) {
    //   console.log(anArg)
    // }
    }

)
myNode.someOnChangeHandler("hello cobber")

})
