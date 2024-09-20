import { Resource } from '../types/resources.model';

import { SET_ALL_RESOURCES, SET_ALL_RESOURCES_LOADING_ERROR } from './types';

export type AllResources = {
    resources: Resource[]
};

export type AllResourceError = {
    error: string;
}

export type AllResourcesAction =
    { type: 'SET_ALL_RESOURCES', payload: AllResources } |
    { type: 'SET_ALL_RESOURCES_LOADING_ERROR', payload: AllResourceError }

export const resourcesLoadedAction = (payload: AllResources): AllResourcesAction => ({
  type: SET_ALL_RESOURCES,
  payload
})

export const resourcesLoadingErrorAction = (payload: AllResourceError): AllResourcesAction => ({
  type: SET_ALL_RESOURCES_LOADING_ERROR,
  payload
})
