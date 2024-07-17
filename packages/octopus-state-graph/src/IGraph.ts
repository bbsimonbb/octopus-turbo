import { INode } from "./INode.js"
import { ISerializedGraph } from "./ISerializedGraph.js"
import { INodeWrapper, WrapperFilterFunc } from "./INodeWrapper.js"


export interface IGraphOptions{
  debug?: boolean
  reupWrapper?: (any) => any
}

export interface IGraph {
  state: { [nodeName: string]: any }
  methods: any
  addNode: <ValShape,MethodsShape>(nodeName: string, node: INode<ValShape,MethodsShape>) => INode<ValShape,MethodsShape>
  wrapNodes: (nodesToWrap: string|string[]|WrapperFilterFunc, wrapper:INodeWrapper) => void
  build: () => void
  fullTraversal: () => Promise<void>
  loadState: (storedState: ISerializedGraph, currentGraphVersion:number) => Promise<IGraph> /*IGraph*/
  saveState: (currentGraphVersion:number) => ISerializedGraph
  registerDevtools: (devtools: Window, origin: string)=>void
  dispose:()=>Promise<void>
}
