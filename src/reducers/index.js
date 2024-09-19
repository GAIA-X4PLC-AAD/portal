import { combineReducers } from 'redux';

import searchCriteriaStore from './SearchCriteriaStore';
import lcmReducer from './lcmReducer';
import schemas from './schemasReducer'
import serviceDescriptorReducer from './serviceDescriptorReducer';
import userReducer from './userReducer';

export default combineReducers({
  user: userReducer,
  searchCriteriaStore: searchCriteriaStore,
  serviceDescriptor: serviceDescriptorReducer,
  lcm: lcmReducer,
  schemas,
});
