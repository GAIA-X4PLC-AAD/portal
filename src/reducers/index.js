/* test coverage not required */
import { combineReducers } from 'redux';

import { lcmReducer } from './lcmReducer';
import { searchCriteriaReducer } from './searchCriteriaReducer';
import { serviceDescriptorReducer } from './serviceDescriptorReducer';
import { userReducer } from './userReducer';

export default combineReducers({
  user: userReducer,
  searchCriteriaStore: searchCriteriaReducer,
  serviceDescriptor: serviceDescriptorReducer,
  lcm: lcmReducer
});
