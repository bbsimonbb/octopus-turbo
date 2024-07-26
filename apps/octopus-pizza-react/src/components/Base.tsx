import { observer } from "mobx-react-lite";
import { base } from "../graph/base";
import { IChoice } from "../IChoice";
import { doOrder } from "../graph/doOrder";
import { ToastyError } from "./ToastyError";

export const Base = observer(() => {
  const errorActive =
    (!!doOrder.val?.submitBlocked || !!base.val?.touched) && !base.val?.valid;
  return (
    <>
      <div className="option-container base">
        {base.val?.choices.map((ch: IChoice, index: number) => (
          <div
            className={`button ${
              index === base.val?.selectedIndex ? "selected" : ""
            }`}
            onClick={() => base.methods?.selectItem(index)}
            key={ch.id}
          >
            <div>{ch.id}</div>
          </div>
        ))}
        <div className="container-title">
          <div>base</div>
        </div>
        <ToastyError
          errorMsg="Please choose"
          active={errorActive}
        ></ToastyError>
      </div>
    </>
  );
});
