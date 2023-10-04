import { IOptionValue } from "./IOptionValue";

export interface IOption<OfType extends IOptionValue = IOptionValue> {
  optionValues: OfType[]
  optionPrice?: number
  defaultIndex?: number
  selectedIndex?: number
  selectedValue?: OfType
  selectedValueName?: string
  hide?: boolean
  valid?: boolean
  touched:boolean
  canChoose?:boolean
  selectItem:(index:number)=>void
}
