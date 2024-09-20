import { Reducer } from 'react';
import { AnyAction, combineReducers } from 'redux';

import { Ontology } from '../types/ontologies.model';
import { Resource } from '../types/resources.model';
import { Shape } from '../types/shapes.model';

import searchCriteriaStore from './SearchCriteriaStore';
import lcmReducer from './lcmReducer';
import resources from './resourcesReducer';
import schemas from './schemasReducer';
import serviceDescriptorReducer from './serviceDescriptorReducer';
import userReducer from './userReducer';

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
  schemas: {
    isLoading: true,
    hasError: false,
    shapes: Shape[],
    ontologies: Ontology[],
  },
  resources: {
    isLoading: true,
    hasError: false,
    resources: Resource[]
  }
}

export default combineReducers<Reducer<AppState, AnyAction>>({
  user: userReducer,
  searchCriteriaStore: searchCriteriaStore,
  serviceDescriptor: serviceDescriptorReducer,
  lcm: lcmReducer,
  schemas,
  resources,
});
