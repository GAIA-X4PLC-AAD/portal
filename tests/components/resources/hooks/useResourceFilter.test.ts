import { act, renderHook, waitFor } from '@testing-library/react';

import { Asset } from '../../../../src/components/resources/helpers/resourceFilterHelper';
import { ResourceFilterState } from '../../../../src/components/resources/helpers/resourceFilterReducer';
import { useResourceFilter } from '../../../../src/components/resources/hooks/useResourceFilter';
import {
  ontologies_General_HdMap_EnvironmentModel
} from '../../../__fixtures__/ontologies_General_HdMap_EnvironmentModel';
import {
  filteredBy_searchText_HdMap_ResourceFilterState,
  filteredBy_typeFilter_HdMap_ResourceFilterState,
  initiallyLoaded_ResourceFilterState
} from '../helpers/__fixtures__/resourceFilterState_HdMap_EnvironmentModel_x2';
import { resources_HdMap_EnvironmentModel_x2 } from '../helpers/__fixtures__/resources_HdMap_EnvironmentModel_x2';

describe('useResourceFilter', () => {
  it('renders correctly the initial values', async () => {
    const { result } = renderHook(() => useResourceFilter(
      ontologies_General_HdMap_EnvironmentModel,
      resources_HdMap_EnvironmentModel_x2
    ));

    // Remove the searchText from the "initiallyLoaded_ResourceFilterState"
    const { searchText, ...initiallyLoadedState } = initiallyLoaded_ResourceFilterState;

    // Wait for the useEffect to be executed
    await waitFor(() => expect(result.current).toEqual(
      expect.objectContaining(initiallyLoadedState))
    );
  })

  it('it filters resources if searchText is updated', async () => {

    const { result } = renderHook(() => useResourceFilter(
      ontologies_General_HdMap_EnvironmentModel,
      resources_HdMap_EnvironmentModel_x2
    ));

    const initiallyLoadedState = removeSearchText(initiallyLoaded_ResourceFilterState)

    // Wait for the useEffect to be executed
    await waitFor(() => expect(result.current).toEqual(
      expect.objectContaining(initiallyLoadedState))
    );

    // Call the "updateSearchText" returned by the hook
    act(() => result.current.updateSearchText('HdMap'));

    const filteredResources = removeSearchText(filteredBy_searchText_HdMap_ResourceFilterState);
    expect(result.current.filteredResources.length).toEqual(1);
    expect(result.current).toEqual(
      expect.objectContaining(filteredResources)
    );
  })

  it('it filters resources if filter asset is updated', async () => {

    const { result } = renderHook(() => useResourceFilter(
      ontologies_General_HdMap_EnvironmentModel,
      resources_HdMap_EnvironmentModel_x2
    ));

    const initiallyLoadedState = removeSearchText(initiallyLoaded_ResourceFilterState)

    // Wait for the useEffect to be executed
    await waitFor(() => expect(result.current).toEqual(
      expect.objectContaining(initiallyLoadedState))
    );

    const asset = {
      id: 'HdMap',
      type: 'typeAssets',
      label: 'HdMap',
      value: true,
      disabled: false
    } as Asset;

    // Call the "updateSearchText" returned by the hook
    act(() => result.current.updateFilterAsset(asset));

    const filteredResources = removeSearchText(filteredBy_typeFilter_HdMap_ResourceFilterState);
    expect(result.current.filteredResources.length).toEqual(1);
    expect(result.current).toEqual(
      expect.objectContaining(filteredResources)
    );
  })
})

const removeSearchText = (resourceFilterState: ResourceFilterState) => {
  // Remove the "searchText" property from the "resourceFilterState"
  const { searchText, ...returnValue } = resourceFilterState;
  return returnValue;
}
