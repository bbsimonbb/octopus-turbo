import { createGraph } from "octopus-state-graph"
import { reactive } from "vue"

var graph = createGraph(reactive)

export default graph