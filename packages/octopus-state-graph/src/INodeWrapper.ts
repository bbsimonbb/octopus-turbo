/**
 * @member wrapperFunc is called after the wrapped node's reup() function
 * and passed the node's val, which it can modify. If node values are being
 * watched by your front end framework (mobx, vue), wrapperFuncs must mutate
 * and not replace nodeVal.
 * @member priority lowest first. priority 1 executes before priority 2. Plain
 * wrappers without priority will execute in the order in which they were added.
 * @member name Not essential. A name may be handy for debugging and might appear
 * one day in devtools.
 */
export interface INodeWrapper {
  wrapperFunc: (nodeVal: any, precedessors: any) => void | Promise<void>;
  priority?: number;
  name?: string;
}
export type WrapperFilterFunc = (key:string, val:any)=>boolean
