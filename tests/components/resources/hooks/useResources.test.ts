import { act, renderHook, waitFor } from '@testing-library/react';

import { removeNonResourceTypeLabels } from '../../../../src/components/resources/helpers/resourcesHelper';
import { useResources } from '../../../../src/components/resources/hooks/useResources';
import { AllSchemasState } from '../../../../src/helpers/schemasReducer';
import {
  ontologies_General_HdMap_EnvironmentModel
} from '../../../__fixtures__/ontologies_General_HdMap_EnvironmentModel';
import { resources_HdMap_EnvironmentModel_x2 } from '../helpers/__fixtures__/resources_HdMap_EnvironmentModel_x2';

import {
  error_loadResources_ResourceState,
  error_useSchema_ResourceState,
  filteredBy_searchText_HdMap_ResourcesState,
  initiallyLoaded_ResourcesState
} from './__fixtures__/resourcesState_HdMap_EnvironmentModel_x2';

// Mock: useSchemas
const useSchemas = jest.fn();
jest.mock('../../../../src/hooks/useSchemas', () => ({
  useSchemas: () => useSchemas()
}));

// Mock: loadResources
const loadResources = jest.fn();
jest.mock('../../../../src/components/resources/helpers/resourceDataFlow', () => ({
  loadResources: () => loadResources()
}));

describe('useResources', () => {
  beforeEach(() => {
    loadResources.mockReset();
    useSchemas.mockReset()
      .mockReturnValue({
        isLoading: false,
        hasError: false,
        ontologies: ontologies_General_HdMap_EnvironmentModel,
      } as AllSchemasState)
  })

  it('renders correctly initial values', async () => {
    loadResources.mockResolvedValueOnce(resources_HdMap_EnvironmentModel_x2);
    const { result } = renderHook(() => useResources());

    // Wait for the useEffect to be executed
    const resourcesState = {
      ...initiallyLoaded_ResourcesState,
      resources: removeNonResourceTypeLabels(
        resources_HdMap_EnvironmentModel_x2,
        ['HdMap', 'EnvironmentModel']
      )
    }
    await waitFor(() => expect(result.current.viewContentType).toEqual('SHOW_RESOURCES'));
    expect(result.current).toEqual(
      expect.objectContaining(resourcesState)
    )
  })

  it('filters "resources" if "searchText" is updated', async () => {
    loadResources.mockResolvedValueOnce(resources_HdMap_EnvironmentModel_x2);
    const { result } = renderHook(() => useResources());

    // Wait for the useEffect to be executed
    await waitFor(() => expect(result.current).toEqual(
      expect.objectContaining(initiallyLoaded_ResourcesState))
    );

    // Call the "updateSearchText" returned by the hook
    act(() => result.current.updateSearchText('HdMap'));

    expect(result.current.resources.length).toEqual(1);
    expect(result.current).toEqual(
      expect.objectContaining(filteredBy_searchText_HdMap_ResourcesState)
    );
  })

  it('set "viewContentType" to "SHOW_NO_RESULT" if error occurs "loadResources"', async () => {
    loadResources.mockRejectedValueOnce(new Error('error message'));
    const { result } = renderHook(() => useResources());

    // Wait for the useEffect to be executed
    await waitFor(() => expect(result.current.viewContentType).toEqual('SHOW_NO_RESULTS'));
    expect(result.current).toEqual(expect.objectContaining(error_loadResources_ResourceState));
  })

  it('set "viewContentType" to "SHOW_NO_RESULT" if error occurs "useSchemas"', async () => {
    useSchemas.mockReset()
      .mockReturnValue({
        isLoading: false,
        hasError: true,
        error: new Error('error message')
      } as AllSchemasState);
    loadResources.mockResolvedValueOnce(resources_HdMap_EnvironmentModel_x2);
    const { result } = renderHook(() => useResources());

    // Wait for the useEffect to be executed
    await waitFor(() => expect(result.current.viewContentType).toEqual('SHOW_NO_RESULTS'));
    expect(result.current).toEqual(expect.objectContaining(error_useSchema_ResourceState));
  })
})
