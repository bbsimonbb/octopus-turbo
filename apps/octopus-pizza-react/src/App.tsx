
import {Size} from  "./components/Size"
import { Pizza } from './components/Pizza'
import {pizza} from './graph/Pizza'
import './App.css'

function App() {
  return (
    <>
    <div id="content">
      <div className="flex-container">
        <div style={{"height":"400px", "margin":"30px"}}>
          <img className="main" />
        </div>
      </div>
      <div className="flex-container">
        <Size></Size>
      </div>
      <div className="flex-container">
        <Pizza pizza={pizza}></Pizza>
      </div>
    </div>
    <img src="./assets/octopus-photo.png" id="octo" />
    </>
  )
}

export default App
