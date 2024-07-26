import { Size } from "./components/Size";
import { Pizza } from "./components/Pizza";
import { pizza } from "./graph/pizza";
import "./App.css";
import { Base } from "./components/Base";
import { Sidebar } from "./components/Sidebar";
import { observer } from "mobx-react-lite";
import graph from "./graph/bareReactiveGraph";
import { useState } from "react";

const App = observer(() => {
  const [devtools, setDevtools] = useState<Window | null | undefined>(
    undefined
  );
  const devtoolsUrl = "http://localhost:7768";
  let pizzaChoice;
  if (pizza.val?.selectedIndex) {
    pizzaChoice = pizza.val?.choices[pizza.val.selectedIndex];
  }

  function popDevtools() {
    if (devtools && !devtools.closed) {
      devtools.focus();
    } else {
      const newDevtools = window.open(devtoolsUrl, "_blank", "popup");
      window.addEventListener("pagehide", () => {
        newDevtools?.close();
      });
      setDevtools(newDevtools);
      if (newDevtools) graph.registerDevtools(newDevtools, devtoolsUrl);
    }
  }
  return (
    <>
      <div id="content">
        <div className="flex-container">
          <div style={{ height: "400px", margin: "30px" }}>
            <img
              className={`main ${pizza.val?.valid ? "" : "veil"}`}
              src={pizzaChoice?.imageUrl}
            />
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
      <img src="./octopus-photo.png" id="octo" onClick={() => popDevtools()} />
    </>
  );
});

export default App;
