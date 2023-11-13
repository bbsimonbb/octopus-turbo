export interface ITraversalReport {
    source: String
    topic: String
    version: number
    data: ITraversalReportData    
}
export interface ITraversalReportData {
    sortedNodeNames: string[]
    edges: {from:string,to:string}[]
    state:any
    methods: any
    initiator: string
}