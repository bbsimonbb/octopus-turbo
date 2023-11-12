// https://en.wikipedia.org/wiki/Glossary_of_graph_theory

import { IGraph } from "./IGraph.js"

export interface INode<ValShape = any, MethodsShape = any, SerializedShape = any> {
  val?: ValShape
  reup?: (...args: any[]) => boolean | void
  methods?: MethodsShape
  options?: INodeOptions
  saveState?: () => SerializedShape
  loadState?: (state: SerializedShape) => void
}

export interface INodeOptions {
  dependsOn?: (nodeName: string, nodeValue: any) => boolean | object
}

interface IReportingNodeOptions extends INodeOptions {
  dependsOn: (nodeName: string, nodeValue: any) => boolean | object
}

export type IReportingNode<ValShape = any, MethodsShape = any> = INode<ValShape, MethodsShape> & {
  val: ValShape
  reup: (nodeArray: any[]) => boolean | void
  options: INodeOptions
}

export function isReportingNode(node: INode): node is IReportingNode {
  return (node as IReportingNode).options && node.options.dependsOn !== undefined
}







export interface INamed {
  name: string
}

/***************             Before radically simple                **********************************/


// export interface ISource<OutType = any> {
//   //name: string
//   // initialValue lets the graph know what shape the node returns.
//   // It is read during build(), and after loadState() during rehydration
//   initialValue: OutType
//   publicMethods?: any
// }
// //export interface IStatefulSource extends ISource, IStateful {}
// export interface INode<DirectPredecessors = any, OutType = any> {
//   //name: string
//   initialValue: OutType
//   publicMethods?: any
//   dependsOn: DirectPredecessors | string[] | ((Nodes) => boolean) // for a regular node, dependsOn AND onUpstreamChange are required. Otherwise, use an ISource
//   onUpstreamChange(directPredecessors: DirectPredecessors): OutType | Promise<OutType>
// }

// export interface IReportingNode<DirectPredecessors = any, OutType = any> extends INode {
//   dependsOn: (nodeName: string, nodeValue: any) => boolean
//   onUpstreamChange(directPredecessors: DirectPredecessors): OutType | Promise<OutType>
// }

// // for completeness
// export interface ISink<DirectPredecessors = any> {
//   //name: string
//   publicMethods?: any
//   dependsOn: DirectPredecessors | string[] | ((Nodes) => boolean)
//   onUpstreamChange(directPredecessors: DirectPredecessors): void
// }

// export interface IReportingSink<DirectPredecessors = any> extends INode {
//   dependsOn: (nodeName: string, nodeValue: any) => boolean
//   onUpstreamChange(directPredecessors: DirectPredecessors): void
// }

// export interface IValueNode {
//   initialValue:any
// }

// export interface ITraversable{
//   dependsOn : Function | object,
//   onUpstreamChange : Function
// }

// export function isNode(node:  ISource<any> |INode<any, any> | IReportingNode<any, any> | ISink<any> | IReportingSink<any>): node is INode<any, any> {
//   return (node as INode).dependsOn !== undefined
//   // IReportingNode extends INode, little bit funky, alternative would be to have ITraversable
//   //&& typeof (node as INode).dependsOn === "object" // string array and object literals both have typeof object
// }

// export function isSource(node:  ISource<any> |INode<any, any> | IReportingNode<any, any> | ISink<any> | IReportingSink<any>): node is ISource<any> {
//   return (node as ISource).initialValue !== undefined && (node as INode).dependsOn === undefined
// }

// export function isTraversable(node: any): node is ITraversable {
//   return (node as INode).dependsOn !== undefined
//   && (node as INode).onUpstreamChange !== undefined
// }
// // which nodes get published to output when added
// export function isValueNode(node:any): node is IValueNode{
//   return (node as INode).initialValue !== undefined
// }