import { INode } from "./INode.js"
import { INodeWrapper } from "./INodeWrapper.js"
import { ISerializedGraph } from "./ISerializedGraph.js"

export interface IGraph {
  state: { [nodeName: string]: any }
  methods: any
  addNode: <ValShape,MethodsShape>(nodeName: string, node: INode<ValShape,MethodsShape>) => INode<ValShape,MethodsShape>
  wrapNode: (nodeToWrap: string, wrapper: INodeWrapper) => (publish: any) => void
  build: () => void
  fullTraversal: () => Promise<void>
  loadState: (storedState: ISerializedGraph) => Promise<IGraph> /*IGraph*/
  saveState: () => ISerializedGraph
  registerDevtools: (devtools: Window)=>void
}
