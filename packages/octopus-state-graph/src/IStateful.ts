export interface IStateful<SerializedShape>{
    loadState: (state:SerializedShape)=>void
    saveState: ()=>SerializedShape
}

export function isStateful(thing) : thing is IStateful<any>{
    return thing.loadState && thing.saveState
}