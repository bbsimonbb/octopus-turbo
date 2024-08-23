import { action } from "mobx";
import { createGraph } from "octopus-state-graph";

const graph = createGraph({ debug: true, reupWrapper: action });

export default graph;
