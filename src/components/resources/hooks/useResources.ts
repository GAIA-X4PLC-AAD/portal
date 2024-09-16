import { useEffect, useMemo, useState } from 'react';

import { Resource } from '../../../types/resources.model';
import { loadResources } from '../helpers/resourceDataFlow';
import { applyFilters, removeDataResourceLabels } from '../helpers/resourcesHelper';

import { useResourceFilterAssets } from './useResourceFilterAssets';

export type ResourcesViewState = 'LOADING' | 'SHOW_RESOURCES' | 'SHOW_NO_RESULTS';

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('')
  const {
    isLoadingAssets,
    typeAssets,
    formatAssets,
    vendorAssets,
    setAvailableTypeAssetIds,
    setAvailableFormatAssetIds,
    updateAssetFilter
  } = useResourceFilterAssets();

  useEffect(() => {
    if (!isLoadingAssets) {
      loadResources(typeAssets)
        .then((fetchedResources) => {
          setResources(fetchedResources);
          setAvailableTypeAssetIds(removeDataResourceLabels(fetchedResources).map(resource => resource.labels).flat()
          )
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoadingAssets]);

  const filterAssets = useMemo(() => [typeAssets, formatAssets, vendorAssets].flat(),
    [typeAssets, formatAssets, vendorAssets])

  const filteredResources = useMemo(() => applyFilters(resources, searchText, filterAssets),
    [resources, searchText, filterAssets])

  useEffect(() => {
    setAvailableFormatAssetIds(filteredResources
      .filter(resource => !!resource.format)
      .map(resource => resource.format))
    // Depending on the length of the filtered resources is important. Otherwise, there is a cyclic dependency in this
    // hook. The filtered resources list depends on the format asset list. The format asset list depends on the
    // available format asset id list. The available format asset id list is changed inside this use effect. If this
    // use effect was depending on the filtered resource list instead of its length it would have triggered an
    // infinite rerender cycle. By using the length, even when filtered resource list is rerendered the length
    // wouldn't change only if there is a change in the filters.
  }, [filteredResources.length]);

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
    resources: removeDataResourceLabels(filteredResources),
    state,
    typeAssets,
    formatAssets,
    vendorAssets,
    search,
    updateAssetFilter
  }
}

