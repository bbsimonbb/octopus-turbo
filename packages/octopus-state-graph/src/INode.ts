// https://en.wikipedia.org/wiki/Glossary_of_graph_theory

import { IGraph } from "./IGraph.js"

export interface INode<ValShape = any, MethodsShape = any, SerializedShape = any> {
  val?: ValShape
  reup?: (...args: any[]) => boolean | void | Promise<boolean | void>
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
