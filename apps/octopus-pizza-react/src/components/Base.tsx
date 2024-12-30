import { observer } from "mobx-react-lite";
import { base } from "../graph/base";
import { IChoice } from "../IChoice";
import { doOrder } from "../graph/doOrder";
import { ToastyError } from "./ToastyError";

export const Base = observer(() => {
  const errorActive =
    (!!doOrder.submitBlocked || !!base.touched) && !base.valid;
  return (
    <>
      <div className="option-container base">
        {base.choices.map((ch: IChoice, index: number) => (
          <div
            className={`button ${
              index === base.selectedIndex ? "selected" : ""
            }`}
            onClick={() => base.selectItem(index)}
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
