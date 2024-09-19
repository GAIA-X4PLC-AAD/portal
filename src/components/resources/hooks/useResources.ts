import { useEffect, useMemo, useState } from 'react';

import { Resource } from '../../../types/resources.model';
import { loadResourceSearchPageData } from '../helpers/resourceDataFlow';
import { Asset, updateFilterAsset } from '../helpers/resourceFilterAssetHelper';
import { applyFilters, createFormatAssets, createTypeAssets, removeDataResourceLabels } from '../helpers/resourcesHelper';

export type ResourcesViewState = 'LOADING' | 'SHOW_RESOURCES' | 'SHOW_NO_RESULTS';

export const useResources = () => {
  const [resources, setResources] = useState<Resource[]>([])

  const [typeAssets, setTypeAssets] = useState<Asset[]>([]);
  const [formatAssets, setFormatAssets] = useState<Asset[]>([]);
  const [vendorAssets, setVendorAssets] = useState<Asset[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    loadResourceSearchPageData()
      .then((data) => {
        setResources(data.resources);

        const resourceTypeAssets = createTypeAssets(data.resourceTypes, data.resources);
        setTypeAssets(resourceTypeAssets);

        const resourceFormatAssets = createFormatAssets(
          data.resourceFormats,
          resourceTypeAssets,
          data.resources,
          []
        );
        setFormatAssets(resourceFormatAssets);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredResources = useMemo(() => applyFilters(
    resources,
    searchText,
    [...typeAssets, ...formatAssets, ...vendorAssets]
  ),
  [resources, searchText, typeAssets, formatAssets, vendorAssets])

  // Recreate format filter assets in order to update their disables flag when type filter asset has been changed.
  useEffect(() => {
    const formats = formatAssets.map(asset => asset.id);
    const selectedFormats = formatAssets.filter(asset => asset.value);

    setFormatAssets(createFormatAssets(
      formats,
      typeAssets,
      resources,
      selectedFormats
    ))
  }, [typeAssets]);

  const state = useMemo<ResourcesViewState>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (filteredResources.length) {
      return 'SHOW_RESOURCES'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [filteredResources, isLoading])

  const updateSearchText = (filter: string) => setSearchText(filter);

  return {
    resources: removeDataResourceLabels(filteredResources),
    typeAssets,
    formatAssets,
    vendorAssets,
    state,
    updateSearchText,
    updateFilterAsset: (asset: Asset) => updateFilterAsset(asset, {
      typeAssets,
      setTypeAssets,
      formatAssets,
      setFormatAssets
    })
  }
}

