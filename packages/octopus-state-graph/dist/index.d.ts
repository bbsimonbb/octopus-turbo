interface INode<ValShape = any, MethodsShape = any, SerializedShape = any> {
    val?: ValShape;
    reup?: (...args: any[]) => boolean | void;
    methods?: MethodsShape;
    options?: INodeOptions;
    saveState?: () => SerializedShape;
    loadState?: (state: SerializedShape) => void;
}
interface INodeOptions {
    dependsOn?: (nodeName: string, nodeValue: any) => boolean | object;
}
type IReportingNode<ValShape = any, MethodsShape = any> = INode<ValShape, MethodsShape> & {
    val: ValShape;
    reup: (nodeArray: any[]) => boolean | void;
    options: INodeOptions;
};

interface INodeWrapper {
    wrappingFunction: (nodeOutput: any) => any;
    publicMethods?: any;
}

interface ISerializedGraph {
    resolvedPredecessors: {
        [nodeName: string]: string[];
    };
    topologicalSort: string[];
    nodeStates: {
        [nodeName: string]: any;
    };
}

interface IGraph {
    state: {
        [nodeName: string]: any;
    };
    methods: any;
    addNode: <ValShape, MethodsShape>(nodeName: string, node: INode<ValShape, MethodsShape>) => INode<ValShape, MethodsShape>;
    wrapNode: (nodeToWrap: string, wrapper: INodeWrapper) => (publish: any) => void;
    build: () => void;
    fullTraversal: () => Promise<void>;
    loadState: (storedState: ISerializedGraph) => Promise<IGraph>;
    saveState: () => ISerializedGraph;
}

declare function createGraph(stateWrappingFunction?: (any: any) => any): IGraph;

interface IStateful {
    loadState: (state: any) => void;
    saveState: () => any;
}

export { IGraph, INode, INodeWrapper, IReportingNode, IStateful, createGraph };
