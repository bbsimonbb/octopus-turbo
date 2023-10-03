import { INode } from "./INode.mjs"
import { INodeWrapper } from "./INodeWrapper.mjs"
import { ISerializedGraph } from "./ISerializedGraph.mjs"

export interface IGraph {
  state: { [nodeName: string]: any }
  methods: any
  addNode: <Shape>(nodeName: string, node: INode<Shape>) => Shape
  wrapNode: (nodeToWrap: string, wrapper: INodeWrapper) => (publish: any) => void
  build: () => void
  fullTraversal: () => Promise<void>
  loadState: (storedState: ISerializedGraph) => Promise<void> /*IGraph*/
  saveState: () => ISerializedGraph
}
