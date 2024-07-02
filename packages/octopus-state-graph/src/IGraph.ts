import { INode } from "./INode.js"
import { ISerializedGraph } from "./ISerializedGraph.js"
import { INodeWrapper } from "./INodeWrapper.js"

export interface IGraph {
  state: { [nodeName: string]: any }
  methods: any
  addNode: <ValShape,MethodsShape>(nodeName: string, node: INode<ValShape,MethodsShape>) => INode<ValShape,MethodsShape>
  wrapNodes: (nodesToWrap: string|string[]|Function, wrapper:INodeWrapper) => void
  build: () => void
  fullTraversal: () => Promise<void>
  loadState: (storedState: ISerializedGraph, currentGraphVersion:number) => Promise<IGraph> /*IGraph*/
  saveState: (currentGraphVersion:number) => ISerializedGraph
  registerDevtools: (devtools: Window, origin: string)=>void
  dispose:()=>Promise<void>
}
