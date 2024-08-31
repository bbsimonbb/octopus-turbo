import { tip } from "../graph/tip";
import { doOrder } from "../graph/doOrder";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ToastyError } from "./ToastyError";
// tipUI has an inner loop. User input is backed by a local variable in the vue component.
// Only if it parses to a number will we update the graph.

export const Tip = observer(() => {
  const [rawUi, setRawUi] = useState("");
  const [amountActive, setAmountActive] = useState(false);
  const tipErrorActive =
    (!!doOrder.submitBlocked || !!tip.touched) && !tip.valid;
  function tipAmountInputOnFocus() {
    if (tip.parsedUserInput) setRawUi(tip.parsedUserInput?.toFixed(2));
    setAmountActive(true);
  }
  function tipAmountInputOnBlur() {
    setAmountActive(false);
  }
  function tipAmountInputOnKeypress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.target) {
      const tgt = e.target as HTMLInputElement;
      const i = tgt.selectionStart || 0;
      const currVal = tgt.value;
      const futureVal =
        currVal.slice(0, i) + e.key + currVal.slice(i + Math.abs(0));
      if (/^[1-9]?[0-9]*\.?[0-9]{0,2}$/.test(futureVal)) return true;
      else {
        e.preventDefault();
        return false;
      }
    }
  }
  // eslint-disable-next-line prefer-const
  let amountInput = {
    get value() {
      if (amountActive) {
        return rawUi;
      } else {
        // if empty string, display it
        if (!rawUi) return rawUi;
        else return tip.parsedUserInput?.toFixed(2);
      }
    },
    set value(newVal: string | undefined) {
      setRawUi(newVal || "");
      const parsedUI = parseFloat(newVal || "");
      // keyup handler ensures only numbers are entered
      tip.tipAmountOnChange(isNaN(parsedUI) ? null : parsedUI);
    },
  };

  return (
    <>
      <div
        className="option-container"
        style={{ display: "block", marginTop: "50px" }}
      >
        <div className="container-title">tip</div>
        <input
          type="radio"
          id="tipAsPct"
          name="tipPercent"
          checked={tip.tipAsPct}
          onChange={() => tip.setTipAsPct(true)}
        />
        <label htmlFor="tipAsPct">10%</label>
        {tip.tipAsPct ? (
          <span style={{ fontSize: "smaller", paddingLeft: "10px" }}>
            ({tip.optionPrice.toFixed(2)} €)
          </span>
        ) : null}
        <br />
        <br />
        <input
          type="radio"
          name="tipPercent"
          checked={!tip.tipAsPct}
          onChange={() => tip.setTipAsPct(false)}
        />
        &nbsp;
        <input
          type="text"
          onInput={(event) =>
            (amountInput.value = (
              event as React.FormEvent<HTMLInputElement>
            ).currentTarget.value)
          }
          value={amountInput.value}
          onFocus={() => tipAmountInputOnFocus()}
          onBlur={() => tipAmountInputOnBlur()}
          onKeyPress={(event) => tipAmountInputOnKeypress(event)}
          id="tipAmountText"
          size={5}
        />
        &nbsp;€
        <ToastyError
          errorMsg="Must not be empty"
          active={tipErrorActive}
        ></ToastyError>
      </div>
    </>
  );
});
