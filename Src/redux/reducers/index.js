import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
    registerReducer,
    loginReducer,
    notificationReducer,
});