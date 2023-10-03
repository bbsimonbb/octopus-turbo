export interface IStateful{
    loadState: (state:any)=>void
    saveState: ()=>any
}

export function isStateful(thing) : thing is IStateful{
    return thing.loadState && thing.saveState
}