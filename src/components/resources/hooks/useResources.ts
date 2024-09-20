import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resourcesLoadedAction, resourcesLoadingErrorAction } from '../../../actions/resourcesActions';
import { useSchemas } from '../../../hooks/useSchemas';
import { AppState } from '../../../reducers';
import { getResourceFormats, getResourceTypes } from '../../../services/ontologyService.utils';
import { loadResources } from '../helpers/resourceDataFlow';
import {
  Asset,
  createFormatAssets,
  createTypeAssets,
  createVendorAssets,
  FORMAT_ASSETS,
  getResourceVendors,
  getSelectedAssets,
  TYPE_ASSETS,
  VENDOR_ASSETS
} from '../helpers/resourceFilterAssetHelper';
import { getPropertyValue, removeNonResourceTypeLabels } from '../helpers/resourcesHelper';

export type ResourcesSearchPageContentType = 'LOADING' | 'SHOW_RESOURCES' | 'SHOW_NO_RESULTS';

export const useResources = () => {
  const dispatch = useDispatch();
  const schemas = useSchemas();

  const { resources } = useSelector((state: AppState) => ({
    resources: state.resources
  }))

  const [typeAssets, setTypeAssets] = useState<Asset[]>([]);
  const [formatAssets, setFormatAssets] = useState<Asset[]>([]);
  const [vendorAssets, setVendorAssets] = useState<Asset[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (!schemas.isLoading && !schemas.hasError) {
      const resourceTypes = Array.from(getResourceTypes(schemas.ontologies));
      loadResources(resourceTypes)
        .then(resources => {
          dispatch(resourcesLoadedAction({ resources }));
          setTypeAssets(createTypeAssets(resourceTypes, resources));
        })
        .catch(error => dispatch(resourcesLoadingErrorAction(error)))
    }
  }, [schemas.isLoading]);

  const resourcesWithTypeFilterApplied = useMemo(() => !resources.hasError
    ? resources.resources
      .filter((resource) => {
        const selectedAssets = getSelectedAssets(typeAssets)
        return selectedAssets === 'ALL' || selectedAssets
          .some(type => resource.labels.includes(type))

      })
    : [],
  [typeAssets]);

  useEffect(() => {
    const resourceFormats = !schemas.isLoading && !schemas.hasError
      ? Array.from(getResourceFormats(schemas.ontologies)) : [];

    setFormatAssets((prevFormatAssets) =>
      createFormatAssets(resourceFormats, prevFormatAssets, resourcesWithTypeFilterApplied));
  }, [resourcesWithTypeFilterApplied]);

  const resourcesWithFormatFilterApplied = useMemo(() => resourcesWithTypeFilterApplied
    .filter(resource => {
      const selectedAssets = getSelectedAssets(formatAssets)
      return selectedAssets === 'ALL' || selectedAssets
        .some(format => resource.format === format)
    }), [formatAssets])

  useEffect(() => {
    const resourceVendors = !resources.hasError
      ? Array.from(getResourceVendors(resources.resources)) : [];

    setVendorAssets((prevVendorAssets) =>
      createVendorAssets(resourceVendors, prevVendorAssets, resourcesWithFormatFilterApplied));
  }, [resourcesWithFormatFilterApplied]);

  const resourcesWithVendorFilterApplied = useMemo(() => resourcesWithFormatFilterApplied
    .filter(resource => {
      const selectedAssets = getSelectedAssets(vendorAssets)
      return selectedAssets === 'ALL' || selectedAssets
        .some(vendor => resource.vendor === vendor)
    }), [vendorAssets])

  const resourcesWithSearchTextFilterApplied = useMemo(() => resourcesWithVendorFilterApplied
    .filter(resource => Object
      .entries(resource)
      .some(property => !searchText ||
              getPropertyValue(property).toLowerCase()
                .includes(searchText.toLowerCase()))
    ), [resourcesWithVendorFilterApplied, searchText]);

  const viewContentType = useMemo<ResourcesSearchPageContentType>(() => {
    if (resources.isLoading) {
      return 'LOADING'
    } else if (resourcesWithVendorFilterApplied.length) {
      return 'SHOW_RESOURCES'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [resourcesWithSearchTextFilterApplied, resources.isLoading])

  return {
    resources: removeNonResourceTypeLabels(
      resourcesWithSearchTextFilterApplied,
      typeAssets.map(asset => asset.id)
    ),
    typeAssets,
    formatAssets,
    vendorAssets,
    viewContentType,
    updateSearchText: (filter: string) => setSearchText(filter),
    updateFilterAsset: (asset: Asset) => {
      switch (asset.type) {
      case TYPE_ASSETS:
        setTypeAssets(typeAssets
          .map(item => item.id === asset.id ? asset : item))
        break
      case FORMAT_ASSETS:
        setFormatAssets(formatAssets
          .map(item => item.id === asset.id ? asset : item))
        break
      case VENDOR_ASSETS:
        setVendorAssets(vendorAssets
          .map(item => item.id === asset.id ? asset : item))
        break
      default:
        console.info('The \'updateAsset\' method is not implemented for the following asset', asset);
      }
    }
  }
}

