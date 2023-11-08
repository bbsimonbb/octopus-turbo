import { useEffect, useState } from "react";
import "./App.css";
import testData from "./TestData";
import { observer } from "mobx-react-lite";
import { action, makeAutoObservable } from "mobx";

export interface IOption {
  optionName: string;
  optionText: string;
  optionValues: IOptionValue[];
  selectedIndex?: number;
  selectedValue?: IOptionValue;
}
interface IOptionValue {
  title: string;
  [x: string | number | symbol]: unknown;
}
interface IHasHistory { history: string[] }

const ptrs = makeAutoObservable({
  opt: -1,
  val: -1,
  searchString: ''
});
// put all properties in testData
const withProps: IOption[] = testData.map((o) => {
  o.optionValues.forEach((v: IOptionValue, index) => v.originalIndex = index)
  return {
    ...o,
    selectedIndex: undefined,
    selectedValue: undefined,
  };
});
const state: { options: IOption[] } = makeAutoObservable({
  options: withProps,
});

const App = observer(() => {
  const [count, setCount] = useState(0);

  const keyPressInComponent = action((e: KeyboardEvent) => {
    console.log(e.keyCode);
    if ([37, 38, 39, 40].includes(e.keyCode)) e.preventDefault();
    switch (e.keyCode) {
      // RIGHT ARROW
      case 39: {
        if (ptrs.val !== -1) {
          // option is active, save the choice
          state.options[ptrs.opt].selectedIndex = ptrs.val;
          state.options[ptrs.opt].selectedValue =
            state.options[ptrs.opt].optionValues[ptrs.val];
        }
        ptrs.opt = (ptrs.opt + 1) % state.options.length;
        resetActiveOption();
        break;
      }
      // LEFT ARROW
      case 37: {
        const { opt, val } = ptrs;
        if (val === -1) {
          // option not active, go up to previous option
          ptrs.opt = (opt + state.options.length - 1) % state.options.length;
        } else {
          // option active, just return it to inactive
          resetActiveOption();
        }
        break;
      }

      // UP ARROW
      case 38: {
        if (ptrs.val === -1) {
          // option not active, load existing choice
          if (state.options[ptrs.opt].selectedIndex !== undefined)
            // there is an existing choice, load it.
            ptrs.val = state.options[ptrs.opt].selectedIndex || 0;
          else ptrs.val = state.options[ptrs.opt].optionValues.length - 1;
        } else {
          // option already active
          ptrs.val =
            ptrs.val === -1
              ? state.options[ptrs.opt].optionValues.length - 1
              : (ptrs.val + state.options[ptrs.opt].optionValues.length - 1) %
              state.options[ptrs.opt].optionValues.length;
        }
        break;
      }
      // DOWN ARROW
      case 40: {
        if (ptrs.val === -1)
          if (state.options[ptrs.opt].selectedIndex !== undefined)
            // option not active, load existing choice
            // there is an existing choice, load it
            ptrs.val = state.options[ptrs.opt].selectedIndex || 0;
          else ptrs.val = 0;
        else {
          // option already active, advance in the list
          ptrs.val =
            (ptrs.val + 1) % state.options[ptrs.opt].optionValues.length;
        }
        break;
      }
      // default:
      //   if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 32) {
      //   }
    }
  });
  function withHistory<TargetShape>(target: any): TargetShape & IHasHistory {
    if (!target.history) {
      (target as IHasHistory).history = []
    }
    return target
  }
  function topLevelClick(e: React.MouseEvent<HTMLDivElement, MouseEvent> & IHasHistory) {
    if (!e.history.length) {
      resetActiveOption()
      ptrs.searchString = ''
    }
  }
  const optionOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> & IHasHistory, oIndex: number) => {
    if (!e.history.includes('valueOnClick')) {
      ptrs.opt = oIndex;
      ptrs.val = state.options[oIndex].selectedIndex || 0;
      e.history.push('optionOnClick')
    }
  }
  const valueOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> & IHasHistory, vIndex: number) => {
    resetActiveOption();
    console.log(JSON.stringify(ptrs));
    state.options[ptrs.opt].selectedIndex = vIndex;
    state.options[ptrs.opt].selectedValue =
      state.options[ptrs.opt].optionValues[vIndex];
    e.history.push('valueOnClick')
  };
  // in comments for typescript error
  // function searchTextOnInput(e: React.FormEvent<HTMLInputElement>) {
  //   if (ptrs.opt !== -1) {
  //     ptrs.searchString = e.currentTarget.value
  //     let indexOfFirstResult = 0
  //     state.options[ptrs.opt].optionValues.forEach((v, index) => { v.hide = !v.title.toLowerCase().includes(ptrs.searchString.toLowerCase()); indexOfFirstResult = indexOfFirstResult || index })
  //     ptrs.val = indexOfFirstResult
  //   }
  // }
  // function searchTextOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent> & IHasHistory) {
  //   // we want to click into the search input without then deactivating the option
  //   e.history.push('searchTextOnClick')
  // }
  function resetActiveOption() {
    state.options[ptrs.opt].optionValues.forEach(o => o.hide = false)
    ptrs.val = -1
    ptrs.searchString = ''
  }

  useEffect(() => {
    document.addEventListener("keydown", keyPressInComponent);


    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keydown", keyPressInComponent);
    };
  }, []);

  return (
    <div className="app" onClick={action((e) => topLevelClick(withHistory(e)))}>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <div>{JSON.stringify(ptrs)}</div>
      {/* 
      Got so far then stopped. Everything was keyed on ptrs.val, but when we filter, we need the filtered index for calculating the position
      of the div, the original for setting selected index of the option, everything gets more complicated.      
      
      <input type="text"
        name="searchString"
        value={ptrs.searchString}
        onInput={action((e) => searchTextOnInput(e))}
        onClick={action((e) => searchTextOnClick(withHistory(e)))}
      ></input> */}
      {state.options.map((o, oIndex) => (
        <div
          className={`an-option ${oIndex === ptrs.opt ? "active" : ""}`}
          key={o.optionName}
          onClick={action((e) => optionOnClick(withHistory(e), oIndex))}
        >
          <div className="option-text">{o.optionText}</div>
          <div className="selected-title">{o.selectedValue?.title}</div>
          {oIndex === ptrs.opt && ptrs.val != -1 ? (
            <div
              className="option-values"
              style={{ top: ptrs.val * -32 - 0.5 + "px" }}
            >
              {o.optionValues.filter(v => !v.hide).map((v) => (
                <div
                  className={`option-value ${ptrs.val === v.originalIndex ? "curr-option-value" : ""
                    }`}
                  key={v.title}
                  onClick={action((e) => valueOnClick(withHistory(e), v.originalIndex as number))}
                >
                  {v.title}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
});

export default App;
