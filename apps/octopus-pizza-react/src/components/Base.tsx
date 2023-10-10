import { observer } from "mobx-react-lite";
import { base } from "../graph/base";
import { action } from "mobx";
import { IOptionValue } from "../IOptionValue";
import { doOrder } from "../graph/doOrder";

export const Base = observer(() => {
  return (
    <>
      <div className="option-container base">
        {base.val?.optionValues.map((b: IOptionValue, index: number) => (
          <div
            className={`button ${b.selected ? "selected" : ""}`}
            onClick={action(() => base.methods?.selectItem(index))}
            key={b.valueName}
          >
            <div>{b.valueName}</div>
          </div>
        ))}
        <div className="container-title">
          <div>base</div>
        </div>
        <div 
          className={`container-error ${
            (doOrder.val?.submitBlocked || base.val?.touched) &&
            !base.val?.valid
              ? "active"
              : ""
          }`}>
          <div>Please choose</div>
        </div>
      </div>
    </>
  );
});
