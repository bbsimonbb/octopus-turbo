import doOrder from "../graph/doOrder";
import { observer } from "mobx-react-lite";
import { IOption, IOptionMethods } from "../IOption";
import { INode } from "octopus-state-graph";
import { action } from "mobx";
import { ToastyError } from "./ToastyError";


export const Pizza = observer(
  ({ pizza }: { pizza: INode<IOption, IOptionMethods> }) => {
    const errorActive =
      !!pizza.val?.canChoose &&
      !pizza.val?.valid &&
      (doOrder.val?.submitBlocked || pizza.val?.touched);


    const errorMsg = pizza.val?.valid
      ? ""
      : pizza.val?.selectedIndex !== undefined
        ? "Your choice is not compatible with your base"
        : "Please choose";

    return (
      <>
        <div className="option-container pizza">
          {pizza.val?.choices.map((option, index) => (
            <div
              className={`button ${option.selected ? "selected" : ""} ${option.hide ? "hide" : ""
                }`}
              onClick={action('pickSize', () => pizza.methods?.selectItem(index))}
              key={option.id}
            >
              <div>
                {option.id} €{option.price?.toFixed(2)}
              </div>
            </div>
          ))}

          <div className="container-title">
            <div>choose your pizza</div>
          </div>
          <ToastyError errorMsg={errorMsg} active={errorActive}></ToastyError>
        </div>
      </>
    );
  }
);
