export interface IStateful<SerializedShape> {
  loadState: (state: SerializedShape) => void;
  saveState: () => SerializedShape;
}

export function isStateful(thing): thing is IStateful<any> {
  try {
    return thing && thing.loadState && thing.saveState;
  } catch {
    return false;
  }
}
