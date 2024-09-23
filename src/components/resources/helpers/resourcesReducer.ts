import { AnyAction } from 'redux';

import { Resource } from '../../../types/resources.model';

////////////////////////////////////////////////////////////////////////////////
// Action types
////////////////////////////////////////////////////////////////////////////////
const SET_ALL_RESOURCES = 'SET_ALL_RESOURCES';
const SET_ALL_RESOURCES_LOADING_ERROR = 'SET_ALL_RESOURCES_LOADING_ERROR';

////////////////////////////////////////////////////////////////////////////////
// Type definitions
////////////////////////////////////////////////////////////////////////////////
type AllResources = {
  resources: Resource[]
};

type AllResourceError = {
  error: string;
}

type IsLoading = { isLoading: boolean; }
export type AllResourcesState = (AllResources & { hasError: false } | AllResourceError & { hasError: true }) & IsLoading

type AllResourcesAction =
    { type: 'SET_ALL_RESOURCES', payload: AllResources } |
    { type: 'SET_ALL_RESOURCES_LOADING_ERROR', payload: AllResourceError }

////////////////////////////////////////////////////////////////////////////////
// Initial state
////////////////////////////////////////////////////////////////////////////////
export const initialResourceState: AllResourcesState = {
  isLoading: true,
  hasError: false,
  resources: []
}

////////////////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////////////////
export const resourcesReducer = (state: AllResourcesState, action: AnyAction) => {
  switch (action.type) {

  case SET_ALL_RESOURCES:
    return { ...action.payload, isLoading: false, hasError: false }

  case SET_ALL_RESOURCES_LOADING_ERROR:
    return { error: action.payload, isLoading: false, hasError: true }

  }

  return state
}

////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////
export const resourcesLoadedAction = (payload: AllResources): AllResourcesAction => ({
  type: SET_ALL_RESOURCES,
  payload
})

export const resourcesLoadingErrorAction = (payload: AllResourceError): AllResourcesAction => ({
  type: SET_ALL_RESOURCES_LOADING_ERROR,
  payload
})
