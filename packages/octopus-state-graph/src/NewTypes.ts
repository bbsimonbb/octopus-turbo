import { INodeWrapper } from "./INodeWrapper";

export interface INodeKernel<SerializedShape> {
  reup?: (precedents: any) => boolean | void | Promise<boolean | void>;
  reupFilterFunc?: (nodeName: string, nodeValue: any) => boolean | object;
  saveState?: () => SerializedShape;
  loadState?: (state: SerializedShape) => void;
  dispose?: () => void;
}

export interface INode2 {
  _o?: INodeKernel<unknown>;
}
export type ONode<T extends INode2 = INode2> = T & Record<string, any>;

export interface INodeInternal {
  raw?: WithoutKernel<INode2>; // may not be present initially if wrapper registered before node
  _o?: INodeKernel<unknown>; // not present if wrapper added before node
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
export type JustTheFunctions<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

export type WithoutKernel<T> = {
  [K in keyof T as K extends "_o" ? never : K]: T[K];
};
