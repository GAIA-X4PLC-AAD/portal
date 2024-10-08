import { useEffect, useMemo, useReducer } from 'react';

import { useSchemas } from '../../../hooks/useSchemas';
import { getResourceTypes } from '../../../services/ontologyService.utils';
import { loadResources } from '../helpers/resourceDataFlow';
import { removeNonResourceTypeLabels } from '../helpers/resourcesHelper';
import {
  initialResourceState,
  resourcesLoadedAction,
  resourcesLoadingErrorAction,
  resourcesReducer
} from '../helpers/resourcesReducer';

import { useResourceFilter } from './useResourceFilter';

export type ResourcesSearchPageContentType = 'LOADING' | 'SHOW_RESOURCES' | 'SHOW_NO_RESULTS';

export const useResources = () => {
  const schemas = useSchemas();
  const ontologies = useMemo(() =>
    !schemas.isLoading && !schemas.hasError ? schemas.ontologies : [],
  [schemas.isLoading]);

  const [state, dispatch] = useReducer(resourcesReducer, initialResourceState);
  const { isLoading, resources } = useMemo(() => ({
    isLoading: state.isLoading,
    resources: !state.isLoading && !state.hasError ? state.resources : []
  }), [state]);

  const {
    filteredResources,
    typeAssets,
    formatAssets,
    vendorAssets,
    updateSearchText,
    updateFilterAsset,
  } = useResourceFilter(ontologies, resources);

  useEffect(() => {
    if (!schemas.isLoading) {
      if (!schemas.hasError) {
        const resourceTypes = Array.from(getResourceTypes(schemas.ontologies));
        loadResources(resourceTypes)
          .then(resources => dispatch(resourcesLoadedAction(resources)))
          .catch(error => dispatch(resourcesLoadingErrorAction(error)))
      } else {
        dispatch(resourcesLoadingErrorAction(schemas.error))
      }
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

