import { makeAutoObservable } from "mobx";

/*
 * For just-an-object to work, we should be able to cumulate makeAutoObservable with the proxy we add to methods...
 */
const colour2 = makeAutoObservable({
  // any object, string, number or bool becomes part of the value
  choices: [],
  selected: undefined,
  selectedId: "",
  //any method is an entry point
  setSelected() {
    colour2.selectedId = "hello from setSelected()";
  },
  // the _o property contains everything nodish
  _o: {
    reup(/*{product, context}*/) {
      colour2.selectedId = "hello from reup()";
    },
  },
});

for (const prop in colour2) {
  if (
    // this syntax swallows object literals. https://stackoverflow.com/a/12017703/1585345
    Object.prototype.hasOwnProperty.call(colour2, prop) &&
    typeof (colour2 as any)[prop] === "function"
  ) {
    (colour2 as any)[prop] = new Proxy((colour2 as any)[prop], {
      apply: async function (target, thisArg, argArray) {
        // execute the method
        await target(...argArray);
        // copy the result
        console.log("In the proxy: " + colour2.selectedId);
      },
    });
  }
}

type Values<T> = {
  [K in keyof T as T[K] extends Function
    ? never
    : K extends "_o"
    ? never
    : K]: T[K];
};

function addNode2<T>(node: T): Values<T> {
  const result = {} as Values<T>;
  for (const key in node) {
    if (typeof node[key] !== "function") {
      result[key as keyof Values<T>] = node[key as keyof Values<T>];
    }
  }
  return result;
}

export default colour2;

type OriginalType = {
  id: number;
  name: string;
  updateName: (newName: string) => void;
  isActive: boolean;
};

type Refined = Values<OriginalType>;
type Refined2 = Values<typeof colour2>;

const added = addNode2(colour2);
