import { useEffect, useState } from 'react'
import './App.css'
import testData from "./TestData"
import { observer } from "mobx-react-lite"
import { action, makeAutoObservable } from 'mobx'

export interface IOption {
  optionName: string
  optionText: string
  optionValues: IOptionValue[]
  selectedIndex?: number
  selectedValue?: IOptionValue
}
interface IOptionValue {
  title: string
  [x: string | number | symbol]: unknown
}

const ptrs = makeAutoObservable({
  opt: -1,
  val: -1
})
// put all properties in testData
const withProps: IOption[] = testData.map(o => {
  return {
    ...o,
    selectedIndex: undefined,
    selectedValue: undefined
  }
})
const state = makeAutoObservable({ options: withProps })

const App = observer(() => {
  const [count, setCount] = useState(0)

  // using the current value of one useState inside the set of another picks up stale values, so we need to keep all this together
  const keyPressInComponent = action((e: KeyboardEvent) => {
    console.log(e.keyCode)
    if ([37, 38, 39, 40].includes(e.keyCode))
      e.preventDefault()
    switch (e.keyCode) {
      // RIGHT ARROW
      case 39: {
        if (ptrs.val !== -1) {
          // option is active, save the choice
          state.options[ptrs.opt].selectedIndex = ptrs.val
          state.options[ptrs.opt].selectedValue = state.options[ptrs.opt].optionValues[ptrs.val]
        }
        ptrs.opt = (ptrs.opt + 1) % state.options.length
        ptrs.val = -1
        break
      }
      // LEFT ARROW
      case 37: {
        let { opt, val } = ptrs
        if (val === -1) {
          // option not active, go up to previous option
          ptrs.opt = (opt + state.options.length - 1) % state.options.length
        } else {
          // option active, just return it to inactive
          ptrs.val = -1
        }
        break
      }

      // UP ARROW
      case 38: {
        if (ptrs.val === -1) {
          // option not active, load existing choice
          if (state.options[ptrs.opt].selectedIndex !== undefined)
            // there is an existing choice, load it.
            ptrs.val = state.options[ptrs.opt].selectedIndex || 0
          else
            ptrs.val = state.options[ptrs.opt].optionValues.length - 1
        }
        else {
          // option already active
          ptrs.val = ptrs.val === -1 ? state.options[ptrs.opt].optionValues.length - 1 : (ptrs.val + state.options[ptrs.opt].optionValues.length - 1) % state.options[ptrs.opt].optionValues.length
        }
        break
      }
      // DOWN ARROW
      case 40: {
        if (ptrs.val === -1)
          // option not active, load existing choice
          if (state.options[ptrs.opt].selectedIndex !== undefined)
            // there is an existing choice, load it
            ptrs.val = state.options[ptrs.opt].selectedIndex || 0
          else
            ptrs.val = 0
        else {
          // option already active, advance in the list
          ptrs.val = (ptrs.val + 1) % state.options[ptrs.opt].optionValues.length
        }
        break
      }

    }
  })

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      console.log(e.keyCode);
      keyPressInComponent(e)
    }

    document.addEventListener('keydown', handleKeyPress);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  return (
    <div className='app'>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <div>{JSON.stringify(ptrs)}</div>
      {state.options.map((o, index) =>
        <div className={`an-option ${index === ptrs.opt ? 'active' : ''}`}
          onClick={action(() => { ptrs.opt = index; ptrs.val = state.options[index].selectedIndex || 0; })}
        >
          <div className="option-text">{o.optionText}</div>
          <div className='selected-title'>
            {o.selectedValue?.title}
          </div>
          {index === ptrs.opt && ptrs.val != -1 ?
            <div className='option-values'
              style={{ top: ((ptrs.val * -32) - 0.5) + 'px' }}>
              {o.optionValues.map((v, vIndex) => (
                <div className={`option-value ${ptrs.val === vIndex ? 'curr-option-value' : ''}`}
                  onClick={action(() => {
                    ptrs.val = -1
                    state.options[index].selectedIndex = vIndex
                    state.options[index].selectedValue = state.options[index].optionValues[vIndex]
                  })}
                >{v.title}</div>)
              )}
            </div>
            : null}
        </div>
      )}
    </div>
  )
})

export default App

