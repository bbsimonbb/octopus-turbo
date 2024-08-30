import { INode } from "./INode.js";
import { ISerializedGraph } from "./ISerializedGraph.js";
import { INodeWrapper, WrapperFilterFunc } from "./INodeWrapper.js";
import { INode2, WithoutKernel } from "./NewTypes.js";

export interface IGraphOptions {
  debug?: boolean;
  reupWrapper?: (any) => any;
}

export interface IGraph {
  /**
   *
   * @param nodeName  must be a valid javascript identifier
   * @param node an object with functions, values and a kernel, _o.
   * @returns the node. We remove the kernel, whose methods are only for octopus. We proxy the methods, so we can trigger
   * a traversal after they're called.
   */
  addNode: <T extends INode2 & Record<string, any>>(
    nodeName: string,
    node: T
  ) => WithoutKernel<T>;
  /**
   * A node can have zero, one or many wrappers. The wrappers will be sorted by order of priority, then called after the node's
   * reup() returns.
   * @param nodesToWrap nodeName, or an array of nodeNames, or a filter function of the form (nodeName, nodeVal)=> boolean
   * @param wrapper The wrapping function that can modify the wrapped node's value.
   * @returns void
   */
  wrapNodes: (
    nodesToWrap: string | string[] | WrapperFilterFunc,
    wrapper: INodeWrapper
  ) => void;
  build: () => void;
  fullTraversal: () => Promise<void>;
  loadState: (
    storedState: ISerializedGraph,
    currentGraphVersion: number
  ) => Promise<IGraph> /*IGraph*/;
  saveState: (currentGraphVersion: number) => ISerializedGraph;
  registerDevtools: (devtools: Window, origin: string) => void;
  dispose: () => Promise<void>;
}
