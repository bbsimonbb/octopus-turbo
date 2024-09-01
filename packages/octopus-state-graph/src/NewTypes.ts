import { INodeWrapper } from "./INodeWrapper";

export interface INodeKernel<SerializedShape> {
  reup?: (precedents: any) => boolean | void | Promise<boolean | void>;
  reupFilterFunc?: (nodeName: string, nodeValue: any) => boolean | object;
  saveState?: () => SerializedShape;
  loadState?: (state: SerializedShape) => void;
  dispose?: () => void;
}

export interface INodeInternal {
  raw?: object; // may not be present initially if wrapper registered before node
  kernel?: INodeKernel<unknown>; // not present if wrapper added before node
  resolvedPredecessors: string[];
  wrappers: INodeWrapper[];
}

export type JustTheValues<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
export type JustTheFunctions<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};
