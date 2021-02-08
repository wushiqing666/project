import InputItem from "./a-input.vue"
import TextareaItem from "./a-textarea.vue"
import SelectItem from "./a-select.vue"
import DatePicker from "./a-datePicker.vue"
const baseFieldMap = {
    'input': InputItem,
    'textarea': TextareaItem,
    'select': SelectItem,
    'datePicker':DatePicker
  };
export function getComponents(type){
    return baseFieldMap[type]
}