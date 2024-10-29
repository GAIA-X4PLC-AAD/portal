import { Reducer } from 'react';
import { AnyAction, combineReducers } from 'redux';

import { lcmReducer } from './lcmReducer';
import { searchCriteriaReducer } from './searchCriteriaReducer';
import { serviceDescriptorReducer } from './serviceDescriptorReducer';
import { userReducer } from './userReducer';

export interface AppState {
// TODO: It is a quick fix to make the redux state to have a type in the typescript files. Each property type must be
//  declared properly.
  user: {
    'first_name': string,
    'family_name': string,
    'email': string,
    'user_role': string,
    'organization_url': string,
    'organization_name': string,
    'organization_realm': string
  },
  // searchCriteriaStore: { ... },
  // serviceDescriptor: { ... },
  // lcm: { ... },
}

export default combineReducers<Reducer<AppState, AnyAction>>({
  user: userReducer,
  searchCriteriaStore: searchCriteriaReducer,
  serviceDescriptor: serviceDescriptorReducer,
  lcm: lcmReducer
});
