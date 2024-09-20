import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resourcesLoadedAction, resourcesLoadingErrorAction } from '../../../actions/resourcesActions';
import { useSchemas } from '../../../hooks/useSchemas';
import { AppState } from '../../../reducers';
import { getResourceTypes } from '../../../services/ontologyService.utils';
import { loadResources } from '../helpers/resourceDataFlow';
import { removeNonResourceTypeLabels } from '../helpers/resourcesHelper';

import { useResourceFilter } from './useResourceFilter';

export type ResourcesSearchPageContentType = 'LOADING' | 'SHOW_RESOURCES' | 'SHOW_NO_RESULTS';

export const useResources = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    resources
  } = useSelector((state: AppState) => ({
    isLoading: state.resources.isLoading,
    resources: !state.resources.isLoading && !state.resources.hasError ? state.resources.resources : []
  }))

  const schemas = useSchemas();
  const ontologies = useMemo(() =>
    !schemas.isLoading && !schemas.hasError ? schemas.ontologies : [],
  [schemas.isLoading]);

  const {
    filteredResources,
    typeAssets,
    formatAssets,
    vendorAssets,
    updateSearchText,
    updateFilterAsset,
  } = useResourceFilter(ontologies, resources);

  useEffect(() => {
    if (!schemas.isLoading && !schemas.hasError) {
      const resourceTypes = Array.from(getResourceTypes(schemas.ontologies));
      loadResources(resourceTypes)
        .then(resources => dispatch(resourcesLoadedAction({ resources })))
        .catch(error => dispatch(resourcesLoadingErrorAction(error)))
    }
  }, [schemas.isLoading]);

  const viewContentType = useMemo<ResourcesSearchPageContentType>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (filteredResources.length) {
      return 'SHOW_RESOURCES'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [filteredResources, isLoading]);

  return {
    resources: removeNonResourceTypeLabels(
      filteredResources,
      typeAssets.map(asset => asset.id)
    ),
    typeAssets,
    formatAssets,
    vendorAssets,
    viewContentType,
    updateSearchText,
    updateFilterAsset,
  }
}

