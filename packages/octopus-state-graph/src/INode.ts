// https://en.wikipedia.org/wiki/Glossary_of_graph_theory


/* Pure graphs can have sinks that publish nothing, but if we make
val optional we impose the obligation to test for val on so much stuff.
I'm not going to get into the warren of typescript inheritance.
For the rare times you want a sink, create a node with type empty object
<INode<Record<string, never>>>
https://www.totaltypescript.com/the-empty-object-type-in-typescript
*/
export interface INode<ValShape = any, MethodsShape = any, SerializedShape = any> {
  val: ValShape
  reup?: (...args: any[]) => boolean | void | Promise<boolean | void>
  methods?: MethodsShape
  options?: INodeOptions
  saveState?: () => SerializedShape
  loadState?: (state: SerializedShape) => void
  dispose?: () => void
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
