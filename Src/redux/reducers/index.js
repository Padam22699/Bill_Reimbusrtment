import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import notificationReducer from "./notificationReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import tokenReducer from "./tokenReducer";
import addBillReducer from "./addBillReducer";
import getAllBillsReducer from "./getAllBillsReducer";
import getBillDetailReducer from "./getBillDetailReducer";
import isPhysicallySubmittedReducer from "./isPhysicallySubmittedReducer";
import reminderReducer from "./reminderReducer";
import changeStatusReducer from "./changeStatusReducer";
import getDashboardDataReducer from "./getDashboardDataReducer";

export default combineReducers({
    registerReducer,
    loginReducer,
    notificationReducer,
    forgotPasswordReducer,
    tokenReducer,
    addBillReducer,
    getAllBillsReducer,
    getBillDetailReducer,
    isPhysicallySubmittedReducer,
    reminderReducer,
    changeStatusReducer,
    getDashboardDataReducer,
});