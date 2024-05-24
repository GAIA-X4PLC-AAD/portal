import { combineReducers } from 'redux';

// import signinReducer from "./signinReducer";
import searchCriteriaStore from './SearchCriteriaStore';
import lcmReducer from './lcmReducer';
import serviceDescriptorReducer from './serviceDescriptorReducer';
import userReducer from './userReducer';

export default combineReducers({
  // signin: signinReducer,
  user: userReducer,
  searchCriteriaStore: searchCriteriaStore,
  serviceDescriptor: serviceDescriptorReducer,
  lcm: lcmReducer
});
