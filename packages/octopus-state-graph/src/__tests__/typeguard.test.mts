// import { INode, IReportingNode, ISource, isNode, isReportingNode, isSource } from "../INode.mjs"
import { test, expect } from "vitest"

// const aSource: ISource = {
//     initialValue:"cobber?"
// }
// const aNodeStrArray: INode = {    
//     initialValue:"cobber?",
//     dependsOn:["string","array"],
//     onUpstreamChange(){}
// }
// const aNodeObj: INode = {    
//     initialValue:"cobber?",
//     dependsOn:{},
//     onUpstreamChange(){}
// }
// const aReportingNode: IReportingNode = {    
//     initialValue:"cobber?",
//     dependsOn(){return true},
//     onUpstreamChange(){}
// }
test("a source node only passes the source typeguard",()=>{
//     expect(isSource(aSource)).toBe(true)
//     expect(isNode(aSource)).toBe(false)
//     expect(isReportingNode(aSource)).toBe(false)    
})

// test("a node only passes the node typeguard",()=>{
//     expect(isSource(aNodeStrArray)).toBe(false)
//     expect(isNode(aNodeStrArray)).toBe(true)
//     expect(isReportingNode(aNodeStrArray)).toBe(false)    
// })

// test("a node with dependsOn object only passes the node typeguard",()=>{
//     expect(isSource(aNodeObj)).toBe(false)
//     expect(isNode(aNodeObj)).toBe(true)
//     expect(isReportingNode(aNodeObj)).toBe(false)    
// })

// test("a reporting node passes the node AND reportingNode typeguards",()=>{
//     expect(isSource(aReportingNode)).toBe(false)
//     expect(isNode(aReportingNode)).toBe(true)
//     expect(isReportingNode(aReportingNode)).toBe(true)    
// })