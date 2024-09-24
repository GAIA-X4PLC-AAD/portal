import { AnyAction } from 'redux';

import { Resource } from '../../../types/resources.model';

////////////////////////////////////////////////////////////////////////////////
// Action types
////////////////////////////////////////////////////////////////////////////////
export const SET_ALL_RESOURCES = 'SET_ALL_RESOURCES';
export const SET_ALL_RESOURCES_LOADING_ERROR = 'SET_ALL_RESOURCES_LOADING_ERROR';

////////////////////////////////////////////////////////////////////////////////
// Type definitions
////////////////////////////////////////////////////////////////////////////////
export type AllResources = {
  resources: Resource[]
};

type AllResourceError = {
  error: string | Error;
}

type IsLoading = { isLoading: boolean; }
export type AllResourcesState = (AllResources & { hasError: false } | AllResourceError & { hasError: true }) & IsLoading

type AllResourcesAction =
  { type: 'SET_ALL_RESOURCES', payload: Resource[] } |
  { type: 'SET_ALL_RESOURCES_LOADING_ERROR', payload: string | Error }

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
export const resourcesReducer = (state: AllResourcesState, action: AnyAction): AllResourcesState => {
  switch (action.type) {

  case SET_ALL_RESOURCES:
    return { resources: action.payload, isLoading: false, hasError: false }

  case SET_ALL_RESOURCES_LOADING_ERROR:
    return { error: action.payload, isLoading: false, hasError: true }

  }

  return state
}

////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////
export const resourcesLoadedAction = (resources: Resource[]): AllResourcesAction => ({
  type: SET_ALL_RESOURCES,
  payload: resources
})

export const resourcesLoadingErrorAction = (error: string | Error): AllResourcesAction => ({
  type: SET_ALL_RESOURCES_LOADING_ERROR,
  payload: error
})
