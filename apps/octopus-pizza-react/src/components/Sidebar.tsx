import { observer } from "mobx-react-lite";
import { allValid } from "../graph/allValid";
import { delivery } from "../graph/delivery";
import { doOrder } from "../graph/doOrder";
import { totalPrice } from "../graph/totalPrice";
import { FormEvent } from "react";
import { action } from "mobx";
import { Tip } from "./Tip";
import "./Sidebar.css";

export const Sidebar = observer(() => {
  const deliveryAddressOnChange = action((e: FormEvent<HTMLDivElement>) => {
    const textArea = e.target as HTMLElement;
    delivery.methods?.setDeliveryAddress(textArea.innerText);
  });
  return (
    <>
      <div id="sidebar-right">
        <div className="option-container" style={{ display: "block" }}>
          <div className="container-title">
            <input
              id="deliveryCheckbox"
              type="checkbox"
              checked={delivery.val?.checked}
              onClick={action((event) =>
                delivery.methods?.setChecked(event.currentTarget.checked)
              )}
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
              onFocus={action(() => delivery.methods?.deliveryOn())}
            ></div>
          </div>

          <div
            className={`container-error ${
              (delivery.val?.touched || doOrder.val?.submitBlocked) &&
              !delivery.val?.valid
                ? "active"
                : ""
            }`}
          >
            <div>Please provide a delivery address.</div>
          </div>
        </div>
        <Tip></Tip>
        <br />
        <div
          className="option-container"
          style={{ justifyContent: "flex-end" }}
        >
          <div className="container-title">total</div>
          <div className="amount">
            {totalPrice.val?.total.toFixed(2)}&nbsp;€
          </div>
          <br />
          <br />
        </div>
        <div className="order-container">
          <div
            className={`button ${!allValid.val?.valid ? "hide" : ""}`}
            onClick={action(() => doOrder.methods?.go())}
          >
            Place order
          </div>
        </div>
      </div>
    </>
  );
});
