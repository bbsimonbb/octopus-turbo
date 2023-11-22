import { observer } from "mobx-react-lite";
import { base } from "../graph/base";
import { action } from "mobx";
import { IChoice } from "../IChoice";
import { doOrder } from "../graph/doOrder";
import { ToastyError } from "./ToastyError";

export const Base = observer(() => {
  const errorActive = (!!doOrder.val?.submitBlocked || !!base.val?.touched) && !base.val?.valid
  return (
    <>
      <div className="option-container base">
        {base.val?.choices.map((b: IChoice, index: number) => (
          <div
            className={`button ${b.selected ? "selected" : ""}`}
            onClick={action(() => base.methods?.selectItem(index))}
            key={b.id}
          >
            <div>{b.id}</div>
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
