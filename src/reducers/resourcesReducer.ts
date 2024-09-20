import { AllResourceError, AllResources, AllResourcesAction } from '../actions/resourcesActions';
import { SET_ALL_RESOURCES, SET_ALL_RESOURCES_LOADING_ERROR } from '../actions/types';

type IsLoading = { isLoading: boolean; }
export type AllResourcesState = (AllResources & { hasError: false } | AllResourceError & { hasError: true }) & IsLoading

const initialState: AllResourcesState = {
  isLoading: true,
  hasError: false,
  resources: []
}

export default (state: AllResourcesState = initialState, action: AllResourcesAction) => {
  switch (action.type) {

  case SET_ALL_RESOURCES:
    return { ...action.payload, isLoading: false, hasError: false }

  case SET_ALL_RESOURCES_LOADING_ERROR:
    return { error: action.payload, isLoading: false, hasError: true }

  }
  return state

}
