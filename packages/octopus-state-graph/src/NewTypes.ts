import { INodeWrapper } from "./INodeWrapper";

export interface INodeKernel<SerializedShape> {
  reup?: (precedents: any) => boolean | void | Promise<boolean | void>;
  reupFilterFunc: (nodeName: string, nodeValue: any) => boolean | object;
  saveState?: () => SerializedShape;
  loadState?: (state: SerializedShape) => void;
  dispose?: () => void;
}

export interface INode2 {
  _o: INodeKernel<unknown>;
}

export interface INodeInternal {
  raw?: INode2; // may not be present initially if wrapper registered before node
  resolvedPredecessors: string[];
  wrappers: INodeWrapper[];
}

export type JustTheValues<T> = {
  [K in keyof T as T[K] extends Function
    ? never
    : K extends "_o"
    ? never
    : K]: T[K];
};
