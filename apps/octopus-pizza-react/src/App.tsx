import { Size } from "./components/Size";
import { Pizza } from "./components/Pizza";
import { pizza } from "./graph/Pizza";
import "./App.css";
import { Base } from "./components/Base";
import { Sidebar } from "./components/Sidebar";
import { observer } from "mobx-react-lite";
import graph from "./graph/bareReactiveGraph"
import { useState } from "react";

const App = observer(() => {
  const [devtools, setDevtools] = useState<Window|null|undefined>(undefined)
  function popDevtools() {
    if (devtools && !devtools.closed) {
      devtools.focus()
    } else {
      setDevtools( window.open("http://localhost:7768", "_blank", "popup"))
      if (devtools)
        graph.registerDevtools(devtools)
    }
  }
  return (
    <>
      <div id="content">
        <div className="flex-container">
          <div style={{ height: "400px", margin: "30px" }}>
            <img className={`main ${pizza.val?.valid ? "" : "veil"}`} src={pizza.val?.selectedValue?.imageUrl} />
          </div>
        </div>
        <div className="flex-container">
          <Size></Size>
          <Base></Base>
        </div>
        <div className="flex-container">
          <Pizza pizza={pizza}></Pizza>
        </div>
      </div>
      <Sidebar></Sidebar>
      <img src="./react.svg" id="react-logo" />
      <img src="./mobx.png" id="mobx-logo" />
      <img src="./octopus-photo.png" id="octo" onClick={()=>popDevtools()}/>
    </>
  );
});

export default App;
