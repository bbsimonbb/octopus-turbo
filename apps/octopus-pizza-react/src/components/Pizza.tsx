import { doOrder } from "../graph/doOrder";
import { observer } from "mobx-react-lite";
import { IOption, IOptionMethods } from "../IOption";
import { ToastyError } from "./ToastyError";

export const Pizza = observer(
  ({ pizza }: { pizza: IOption & IOptionMethods }) => {
    const errorActive =
      !!pizza.canChoose &&
      !pizza.valid &&
      (doOrder.submitBlocked || pizza.touched);

    const errorMsg = pizza.valid
      ? ""
      : pizza.selectedIndex !== -1
      ? "Your choice is not compatible with your base"
      : "Please choose";

    return (
      <>
        <div className="option-container pizza">
          {pizza.choices.map((option, index) => (
            <div
              className={`button ${option.selected ? "selected" : ""} ${
                option.hide ? "hide" : ""
              }`}
              onClick={() => pizza.selectItem(index)}
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
