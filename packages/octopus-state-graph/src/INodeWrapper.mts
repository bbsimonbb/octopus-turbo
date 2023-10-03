
export interface INodeWrapper {
  wrappingFunction: (nodeOutput: any) => any;
  publicMethods?: any;
}
