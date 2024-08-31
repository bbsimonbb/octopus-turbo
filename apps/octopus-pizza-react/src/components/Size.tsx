import { IChoice } from "../IChoice";
import { size } from "../graph/sizex";
import { doOrder } from "../graph/doOrder";
import { observer } from "mobx-react-lite";
import { ToastyError } from "./ToastyError";

export const Size = observer(() => {
  const errorActive =
    (!!doOrder.submitBlocked || !!size.touched) && !size.valid;

  return (
    <>
      <div className="option-container size">
        {size.choices.map((s: IChoice, index: number) => (
          <div
            className={`button ${s.selected ? "selected" : ""}`}
            onClick={() => size.selectItem(index)}
            key={s.id}
          >
            <div>{s.id}</div>
          </div>
        ))}

        <div className="container-title">
          <div>size</div>
        </div>
        <ToastyError errorMsg="PleaseChoose" active={errorActive}></ToastyError>
      </div>
    </>
  );
});
