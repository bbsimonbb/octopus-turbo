import { action } from "mobx";
import { IOptionValue } from "../IOptionValue";
import { size } from "../graph/Size";
import { doOrder } from "../graph/doOrder";
import { observer } from "mobx-react-lite";

export const Size = observer(()=> {
  return (
    <>
      <div className="option-container size">
        {size.val?.optionValues.map((s: IOptionValue, index: number) => (
          <div
            className={`button ${s.selected?'selected':''}`}
            onClick={action('pickSize',()=>size.methods?.selectItem(index))}
            key={s.valueName}
          >
            <div>{s.valueName}</div>
          </div>
        ))}

        <div className="container-title">
          <div>size</div>
        </div>
        <div
          className={`container-error ${
            (doOrder.val?.submitBlocked || size.val?.touched) &&
            !size.val?.valid
              ? "active"
              : ""
          }`}
        >
          <div>Please choose</div>
        </div>
      </div>
    </>
  );
})
