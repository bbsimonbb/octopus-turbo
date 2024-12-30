import { observer } from "mobx-react-lite";
import { allValid } from "../graph/allValid";
import { delivery } from "../graph/delivery";
import { doOrder } from "../graph/doOrder";
import { totalPrice } from "../graph/totalPrice";
import { FormEvent } from "react";
import { Tip } from "./Tip";
import "./Sidebar.css";
import { ToastyError } from "./ToastyError";

export const Sidebar = observer(() => {
  const deliveryAddressOnChange = (e: FormEvent<HTMLDivElement>) => {
    const textArea = e.target as HTMLElement;
    delivery.setDeliveryAddress(textArea.innerText);
  };
  const deliveryErrorActive =
    (!!delivery.touched || !!doOrder.submitBlocked) && !delivery.valid;
  return (
    <>
      <div id="sidebar-right">
        <div className="option-container" style={{ display: "block" }}>
          <div className="container-title">
            <input
              id="deliveryCheckbox"
              type="checkbox"
              checked={delivery.checked}
              onChange={(event) =>
                delivery.setChecked(event.currentTarget.checked)
              }
            />{" "}
            delivery 5€
          </div>
          <div>
            <div>delivery address</div>
            <div
              id="deliveryAddressTextArea"
              className="text-area"
              onInput={deliveryAddressOnChange}
              style={{ height: "60px" }}
              contentEditable
              onFocus={() => delivery.deliveryOn()}
            ></div>
          </div>
          <ToastyError
            errorMsg="Please provide a delivery address."
            active={deliveryErrorActive}
          ></ToastyError>
        </div>
        <Tip></Tip>
        <br />
        <div
          className="option-container"
          style={{ justifyContent: "flex-end" }}
        >
          <div className="container-title">total</div>
          <div className="amount">{totalPrice.total.toFixed(2)}&nbsp;€</div>
          <br />
          <br />
        </div>
        <div className="order-container">
          <div
            className={`button ${!allValid.valid ? "hide" : ""}`}
            onClick={() => doOrder.go()}
          >
            Place order
          </div>
        </div>
      </div>
    </>
  );
});
