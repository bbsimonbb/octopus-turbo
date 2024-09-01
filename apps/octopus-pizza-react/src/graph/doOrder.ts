import graph from "./bareReactiveGraph";
import { IValid } from "./allValid";
import { makeAutoObservable } from "mobx";

// some private state
let canGo = false;
export const doOrder = makeAutoObservable(
  graph.addNode(
    "doOrder",
    {
      // this force displaying of error messages
      submitBlocked: false,
      async go() {
        if (canGo) {
          await alert("Excellent choice! Enjoy your pizza.");
          window.location.reload();
          // reset submit blocked when everything has worked
          doOrder.submitBlocked = false;
        } else {
          alert("There are some problems with your order.");
          // remember that submission has been tried
          doOrder.submitBlocked = true;
        }
      },
    },
    {
      reup({ allValid }: { allValid: IValid }) {
        canGo = allValid.valid;
      },
    }
  )
);
