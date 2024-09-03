import { useContext, useEffect, useMemo, useState } from 'react';

import { AuthContext } from '../../context/AuthContextProvider';
import { CypherQueryApiService as cypherQuery } from '../../services/cypherQueryApiService';
import { Resource } from '../../types/resources.model';
import { mapResources } from '../../utils/dataMapper';

import { Asset, useResourceFilterAssets } from './useResourceFilterAssets';

export type ResourcesViewState = 'LOADING' | 'SHOW_RESOURCES' | 'SHOW_NO_RESULTS';

interface IUseResources {

}

export const useResources = () => {
  const authContext = useContext(AuthContext);
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('')
  const {
    isLoadingAssets,
    typeAssets,
    formatAssets,
    vendorAssets,
    updateAssetFilter
  } = useResourceFilterAssets();

  useEffect(() => {
    (async () => {
      try {
        if (!isLoadingAssets) {
          const resourceInput = await cypherQuery.getAllResources(authContext, typeAssets);
          const fetchedResources = mapResources(resourceInput);

          setResources(fetchedResources)
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isLoadingAssets]);

  const filterAssets = useMemo(() => [typeAssets, formatAssets, vendorAssets].flat(),
    [typeAssets, formatAssets, vendorAssets])

  const filteredResources = useMemo(() => resources
    .filter(resource => Object
      .entries(resource)
      .some(property => !searchText ||
            String(property[1]).toLowerCase()
              .includes(searchText.toLowerCase())
      )
    )
    .filter(resource =>
      assetFilterPredicate(resource, filterAssets)
    ), [resources, searchText, filterAssets])

  const state = useMemo<ResourcesViewState>(() => {
    if (isLoading || isLoadingAssets) {
      return 'LOADING'
    } else if (filteredResources.length) {
      return 'SHOW_RESOURCES'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [filteredResources, isLoading, isLoadingAssets])

  const search = (filter: string) => {
    setSearchText(filter)
  };

  return {
    resources: filteredResources,
    state,
    typeAssets,
    formatAssets,
    vendorAssets,
    search,
    updateAssetFilter
  }
}

function assetFilterPredicate(resource: Resource, assets: Asset[]) {
  const activeAssetFilters = assets.filter(asset => asset.value)
  if (activeAssetFilters.length) {
    return activeAssetFilters
      .some(asset => resource.labels
        .map(label => label.toLowerCase())
        .includes(asset.label.toLowerCase()))
  }
  return true
}

