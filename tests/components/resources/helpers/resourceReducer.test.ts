import {
  initialResourceState,
  resourcesLoadedAction,
  resourcesLoadingErrorAction,
  resourcesReducer,
  SET_ALL_RESOURCES,
  SET_ALL_RESOURCES_LOADING_ERROR
} from '../../../../src/components/resources/helpers/resourcesReducer';
import { Resource } from '../../../../src/types/resources.model';

import { resources_HdMap_EnvironmentModel_x2 } from './__fixtures__/resources_HdMap_EnvironmentModel_x2';

describe('Reducer', () => {
  it('sets the resources to the value of the actions payload and returns it in the next state,' +
    'the "isLoading" property becomes false ' +
    'and the "hasError" property becomes also false', () => {
    const allResources = [{}, {}] as Resource[];
    const nextState = resourcesReducer(initialResourceState, resourcesLoadedAction(allResources));

    expect(nextState.resources).toEqual(allResources);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(false);
  })

  it('sets the error to the value of the actions payload and returns it in the next state,' +
    'the "isLoading" property becomes false ' +
    'and the "hasError" property becomes also false', () => {
    const error = 'error message';
    const nextState = resourcesReducer(initialResourceState, resourcesLoadingErrorAction(error));

    expect(nextState.error).toEqual(error);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
  })

  it('returns the initial state if unknown action is passed in', () => {
    const nextState = resourcesReducer(initialResourceState, { type: 'UNKNOWN_ACTION' });
    expect(nextState).toEqual(initialResourceState);
  })
})

describe('Actions', () => {
  test('resourcesLoadedAction', () => {
    const result = resourcesLoadedAction(resources_HdMap_EnvironmentModel_x2);

    expect(result).toEqual({
      type: SET_ALL_RESOURCES,
      payload: resources_HdMap_EnvironmentModel_x2
    })
  })

  test('resourcesLoadingErrorAction', () => {
    const error = { error: 'error message' };
    const result = resourcesLoadingErrorAction(error);

    expect(result).toEqual({
      type: SET_ALL_RESOURCES_LOADING_ERROR,
      payload: error
    })
  })
})
