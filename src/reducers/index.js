import { combineReducers } from "redux";
import signinReducer from "./signinReducer";
import userReducer from "./userReducer"

export default combineReducers({
    signin: signinReducer,
    user: userReducer
});