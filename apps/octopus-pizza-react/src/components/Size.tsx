import { action } from "mobx";
import { IChoice } from "../IChoice";
import size from "../graph/size";
import doOrder from "../graph/doOrder";
import { observer } from "mobx-react-lite";
import { ToastyError } from "./ToastyError";

export const Size = observer(() => {
  const errorActive = (!!doOrder.val?.submitBlocked || !!size.val?.touched) && !size.val?.valid

  return (
    <>
      <div className="option-container size">
        {size.val?.choices.map((s: IChoice, index: number) => (
          <div
            className={`button ${s.selected ? 'selected' : ''}`}
            onClick={action('pickSize', () => size.methods?.selectItem(index))}
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
})
