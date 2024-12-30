import { getParamNames } from "../Graph.js"
import { test, expect } from "vitest"
export { }

test("a function with destructuring and renaming is correctly parsed", () => {
  function reup({upstream : e, downstream : f}){
    
  }
  const args = getParamNames(reup)
  expect(args).toEqual(["upstream","downstream"])
})