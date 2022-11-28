import { STATUS_POPUP } from "@/store/Mutatios.Type";
import  store from "@/store/index.js";
export function handleShowPopup() {
    if (store.state.showPopup) {
        store.commit(STATUS_POPUP);        
    }
}