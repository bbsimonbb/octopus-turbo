import { useEffect, useState } from 'react'
import './App.css'
import { options } from "./TestData"

function App() {
  const [count, setCount] = useState(0)

  const initialState = {
    opt:-1,
    val:-1
  }
  // using the current value of one useState inside the set of another picks up stale values, so we need to keep all this together
  const[ptrs, setPtrs] = useState(initialState)
  const keyPressInComponent = (e: KeyboardEvent) => {
    console.log(e.keyCode)
    if ([37, 38, 39, 40].includes(e.keyCode))
      e.preventDefault()
    switch (e.keyCode) {
      // RIGHT ARROW
      case 39:
        setPtrs((ptrs) => {
          const opt = (ptrs.opt + 1) % options.length
          const val = -1
          return {...ptrs, opt, val}
        })
        break
      // LEFT ARROW
      case 37:
        setPtrs((ptrs) => {
          const opt = (ptrs.opt + options.length - 1) % options.length
          const val = -1
          return {...ptrs, opt, val}
        })
        break
      // UP ARROW
      case 38:
        setPtrs((ptrs) => {
          const val = ptrs.val === -1 ? options[ptrs.opt].optionValues.length - 1 : (ptrs.val + options[ptrs.opt].optionValues.length - 1) % options[ptrs.opt].optionValues.length
          return {...ptrs, val}
        })
        break
      // DOWN ARROW
      case 40:
        setPtrs((ptrs) => {
          const val = (ptrs.val + 1) % options[ptrs.opt].optionValues.length
          return {...ptrs, val}
        })
        break

    }
  }

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
      {options.map((o, index) =>
        <div className={`an-option ${index === ptrs.opt ? 'active' : ''}`}>{o.optionText}
          {index === ptrs.opt && ptrs.val != -1 ?
            <div  className='option-values' 
            style={{ top: ((ptrs.val * -32)-0.5)+'px' }}>
              {o.optionValues.map((v, vIndex) => (<div     className={`option-value ${ptrs.val === vIndex?'curr-option-value':''}`}     >{v.title}</div>))}
            </div>
            : null}
        </div>
      )}
    </div>
  )
}

export default App

