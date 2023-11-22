import { IChoice } from "./IChoice";

export interface IOption<OfType extends IChoice = IChoice> {
  choices: OfType[];
  optionPrice?: number;
  defaultIndex?: number;
  selectedIndex?: number;
  hide?: boolean;
  valid?: boolean;
  touched: boolean;
  canChoose?: boolean;
}
export interface IOptionMethods {
  selectItem: (index: number) => void;
}
