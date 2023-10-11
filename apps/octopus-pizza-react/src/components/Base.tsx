import { observer } from "mobx-react-lite";
import { base } from "../graph/base";
import { action } from "mobx";
import { IOptionValue } from "../IOptionValue";
import { doOrder } from "../graph/doOrder";
import { ToastyError } from "./ToastyError";

export const Base = observer(() => {
  const errorActive = (!!doOrder.val?.submitBlocked || !!base.val?.touched) && !base.val?.valid
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
        <ToastyError errorMsg="Please choose" active={errorActive}></ToastyError>
      </div>
    </>
  );
});
