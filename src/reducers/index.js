import { combineReducers } from "redux";
// import signinReducer from "./signinReducer";
import userReducer from "./userReducer";
import searchCriteriaStore from "./SearchCriteriaStore";
import serviceDescriptorReducer from "./serviceDescriptorReducer";
import lcmReducer from "./lcmReducer";

export default combineReducers({
    // signin: signinReducer,
    user: userReducer,
    searchCriteriaStore: searchCriteriaStore,
    serviceDescriptor: serviceDescriptorReducer,
    lcm: lcmReducer
});