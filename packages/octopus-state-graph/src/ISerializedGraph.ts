export interface ISerializedGraph {
  resolvedPredecessors: { [nodeName: string]: string[] };
  topologicalSort: string[];
  nodeStates: { [nodeName: string]: any };
  savedAtVersion: number;
}
