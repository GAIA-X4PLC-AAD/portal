import { useEffect, useMemo, useState } from 'react';

import { getResourceFormats, getResourceTypes } from '../../../services/ontologyService.utils';
import { Ontology } from '../../../types/ontologies.model';
import { Resource } from '../../../types/resources.model';
import {
  Asset,
  createFormatAssets,
  createTypeAssets,
  createVendorAssets,
  getResourceVendors,
  getSelectedAssets,
  updateFilterAsset
} from '../helpers/resourceFilterHelper';
import { getPropertyValue } from '../helpers/resourcesHelper';

export const useResourceFilter = (ontologies: Ontology[], resources: Resource[]) => {
  const [typeAssets, setTypeAssets] = useState<Asset[]>([]);
  const [formatAssets, setFormatAssets] = useState<Asset[]>([]);
  const [vendorAssets, setVendorAssets] = useState<Asset[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const resourceTypes = Array.from(getResourceTypes(ontologies));
    setTypeAssets(createTypeAssets(resourceTypes, resources));
  }, [resources]);

  const resourcesWithTypeFilterApplied = useMemo(() => resources
    .filter((resource) => {
      const selectedAssets = getSelectedAssets(typeAssets)
      return selectedAssets === 'ALL' || selectedAssets
        .some(type => resource.labels.includes(type))

    }),
  [typeAssets]);

  useEffect(() => {
    const resourceFormats = Array.from(getResourceFormats(ontologies));

    setFormatAssets(createFormatAssets(resourceFormats, formatAssets, resourcesWithTypeFilterApplied));
  }, [resourcesWithTypeFilterApplied]);

  const resourcesWithFormatFilterApplied = useMemo(() => resourcesWithTypeFilterApplied
    .filter(resource => {
      const selectedAssets = getSelectedAssets(formatAssets)
      return selectedAssets === 'ALL' || selectedAssets
        .some(format => resource.format === format)
    }), [formatAssets])

  useEffect(() => {
    const resourceVendors = Array.from(getResourceVendors(resources));

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

  return {
    filteredResources: resourcesWithSearchTextFilterApplied,
    typeAssets,
    formatAssets,
    vendorAssets,
    updateSearchText: setSearchText,
    updateFilterAsset: updateFilterAsset(
      typeAssets, setTypeAssets,
      formatAssets, setFormatAssets,
      vendorAssets, setVendorAssets
    )
  }
}

