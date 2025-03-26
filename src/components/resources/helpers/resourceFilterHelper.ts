import { getResourceFormats, getResourceTypes } from '../../../services/ontologyService.utils';
import { Ontology } from '../../../types/ontologies.model';
import { Resource } from '../../../types/resources.model';
import { Shape } from '../../../types/shapes.model';

import { ShapePropertyForFilter } from './ShapePropertyForFilter';
import { ResourceFilterState } from './resourceFilterReducer';
import { getPropertyValue } from './resourcesHelper';
import { getCypherQueryForProperties, getShapePropertiesForFilter } from './specialFilterHelper';

export type AssetTypes = 'typeAssets' | 'formatAssets' | 'vendorAssets' | 'specificAssets';

/**
 * Interface type used to define all the props needed to manage the filter assets.
 */
export interface Asset {
    id: string;
    type: AssetTypes;
    label: string;
    value: boolean;
    disabled: boolean;
  specificFilterValueSelected?: any;
  specificFilterPossibleValues?: any[];
  specificFilterSelected?: boolean;
  specificFilterPath?: string;
}

/**
 * Creates from a resource type string list a resource type asset list.
 *
 * @param resourceTypes the resource type string list
 * @param resources the list of resources to determine which asset should be disabled.
 * @return the list of resource type assets.
 */
export const createTypeAssets = (resourceTypes: string[], resources: Resource[]) => {
  const resourceLabels = getAllLabels(resources);
  return resourceTypes.map(type => ({
    id: type,
    type: 'typeAssets',
    label: type,
    value: false,
    disabled: !resourceLabels.has(type)
  } as Asset));
}

/**
 * Returns a set of all available labels in the list of resources.
 *
 * @param resources the list of resources to look for the labels in.
 * @return the set of available labels.
 */
export const getAllLabels = (resources: Resource[]) =>
  new Set(
    resources
      .map(resource => resource.labels)
      .flat()
      .filter(label => !!label)
  );

/**
 * Creates from a resource format string list a resource format asset list.
 *
 * @param resourceFormats the resource format string list.
 * @param prevFormatAssets the previous format asset list in order to preserve the selected state of the asset.
 * @param resources the list of resources to determine which asset should be disabled.
 * @return the list of resource format assets.
 */
export const createFormatAssets = (
  resourceFormats: string[],
  prevFormatAssets: Asset[],
  resources: Resource[],
) => {
  const availableFormats = getAllFormats(resources);
  return resourceFormats.map(format => ({
    id: format,
    type: 'formatAssets',
    label: format,
    value: prevFormatAssets.some(asset => asset.value && asset.id === format),
    disabled: !availableFormats.has(format)
  } as Asset))
}

/**
 * Returns a set of all available formats in the list of resources.
 *
 * @param resources the list of resources to look for the formats in.
 * @return the set of available labels.
 */
export const getAllFormats = (resources: Resource[]) =>
  new Set(
    resources
      .map(resource => resource.format)
      .flat()
      .filter(label => !!label)
  );

/**
 * Creates from a resource vendor string list a resource vendor asset list.
 *
 * @param resourceVendors the resource vendor string list.
 * @param prevVendorAssets the previous vendor asset list in order to preserve the selected state of the asset.
 * @param resources the list of resources to determine which asset should be disabled.
 * @return the list of resource vendor assets.
 */
export const createVendorAssets = (
  resourceVendors: string[],
  prevVendorAssets: Asset[],
  resources: Resource[],
) => {
  const availableVendors = getResourceVendors(resources);
  return resourceVendors.map(vendor => ({
    id: vendor,
    type: 'vendorAssets',
    label: vendor,
    value: prevVendorAssets.some(asset => asset.value && asset.id === vendor),
    disabled: !availableVendors.has(vendor)
  } as Asset))
}

export function getFilteredSpecificResourceUrls(specificResourceDetails: any[] | undefined, specificAssets: any[]): string[] {
  const results: string[] = [];
  const allPartialResults: string[][] = [];
  if (specificResourceDetails) {
    for (const asset of specificAssets) {
      if (asset.specificFilterSelected && asset.specificFilterValueSelected) {
        const partialResults = getRowIdsByColumnValue(specificResourceDetails, asset.id, asset.specificFilterValueSelected)
        allPartialResults.push(partialResults)
      }
    }
  }

  // If we have any partial results, find their intersection
  if (allPartialResults.length > 0) {
    // Start with the first array and reduce to find common elements
    const commonResults = allPartialResults.reduce((common, current) => {
      return common.filter(item => current.includes(item));
    });
    results.push(...commonResults);
  }

  return results;
}

function getRowIdsByColumnValue<T extends Record<string, any>>(
  data: T[],
  columnId: string,
  searchValues: any | any[]
): (string)[] {
  const values = Array.isArray(searchValues) ? searchValues : [searchValues]; // Ensure array
  return data
    .filter(row => values.includes(row[columnId])) // Check if any value matches
    .map(row => row.id ?? row.specificResourceUri)
    .filter(value => value !== undefined && value !== null && value !== '' && value !== 'unknown');
}

function getColumn<T extends Record<string, any>>(
  data: T[],
  columnId: string,
  isArrayField: boolean = false
): any[] {
  const result = (isArrayField
    ? data.flatMap(row => row[columnId] ?? [])
    : data.map(row => row[columnId])
  ).filter(value => value !== null && value !== '' && value !== 'unknown');

  return [...new Set(result)]; // Convert the Set back to an array to return unique values
}

export const createSpecificAssets = (
  shapesForFilter: ShapePropertyForFilter[],
  prevSpecificAssets: Asset[],
  specialResourceDetails?: any[]
) => {
  return shapesForFilter.map(shapeForFilter => ({
    id: `${shapeForFilter.path}/${shapeForFilter.name}`,
    type: 'specificAssets',
    label: shapeForFilter.name,
    value: prevSpecificAssets.some(asset => asset.value && asset.id === `${shapeForFilter.path}/${shapeForFilter.name}`),
    disabled: false,
    specificFilterValueSelected: prevSpecificAssets.filter(asset => asset.id === `${shapeForFilter.path}/${shapeForFilter.name}`).map(asset => asset.specificFilterValueSelected).flat(),
    specificFilterPossibleValues: specialResourceDetails && specialResourceDetails.length > 0 ? getColumn(specialResourceDetails, `${shapeForFilter.path}/${shapeForFilter.name}`, false) : [],
    specificFilterSelected: prevSpecificAssets.some(asset => asset.specificFilterSelected && asset.id === `${shapeForFilter.path}/${shapeForFilter.name}`),
    specificFilterPath: shapeForFilter.path
  } as Asset))
}

/**
 * Returns a set of all available vendors in the list of resources.
 *
 * @param resources the list of resources to look for the formats in.
 * @return the set of available labels.
 */
export const getResourceVendors = (resources: Resource[]) =>
  new Set(
    resources
      .map(resource => resource.vendor)
      .flat()
      .filter(label => !!label)
  );

/**
 * Represents a list of assets that are selected. It has an ALL option which means that everything is selected. No
 * list should be provided.
 */
export type SelectedAssets = 'NOTHING' | string[];

/**
 * Returns the selected assets from the list. It has an ALL option which means that everything is selected. No list
 * should be provided.
 *
 * An asset is considered selected when it is not disabled and its value is true.
 *
 * If no asset is selected it is considered that everything is selected and in that case it is returned 'NOTHING'.
 *
 * @param assets list to be filtered for the selected one.
 */
export const getSelectedAssets = (assets: Asset[]): SelectedAssets => {
  const selectedAssets = assets
    .filter(asset => !asset.disabled && asset.value)
    .map(asset => asset.id)

  // If type filter is selected it is considered that all enabled ones are selected
  if (!selectedAssets.length) {
    return 'NOTHING'
  }
  return selectedAssets
}

/**
 * Calculates the filter assets from ontologies and resources. Calculates the new filtered resource list also.
 *
 * @param ontologies list of ontologies from which the filter assets should be calculated.
 * @param resources list of resources from which the filter assets should be calculated.
 * @param filters previous filter assets state in order to preserve an existing selection during the update of an asset.
 * @param shapes shapes for specific filters
 * @param specialResourceDetails query for special resource details
 * @return the new state of the {@link useResourceFilter} hook.
 */
export const calculateResourceFiltersAssetState = (
  ontologies: Ontology[],
  shapes: Shape[],
  resources: Resource[],
  filters: ResourceFilterState,
  specialResourceDetails?: any[]
) => {
  const resourceTypes = Array.from(getResourceTypes(ontologies));
  const typeAssets = createTypeAssets(resourceTypes, resources)
    .map(typeAsset => filters.typeAssets
      .find(item => item.id === typeAsset.id) || typeAsset);

  const resourcesWithTypeFilterApplied = resources
    .filter((resource) => {
      const selectedAssets = getSelectedAssets(typeAssets)
      return selectedAssets === 'NOTHING' || selectedAssets
        .some(type => resource.labels.includes(type))
    });

  const resourceFormats = Array.from(getResourceFormats(ontologies));
  const formatAssets = createFormatAssets(resourceFormats, filters.formatAssets, resourcesWithTypeFilterApplied);

  const resourcesWithFormatFilterApplied = resourcesWithTypeFilterApplied
    .filter(resource => {
      const selectedAssets = getSelectedAssets(formatAssets)
      return selectedAssets === 'NOTHING' || selectedAssets
        .some(format => resource.format === format)
    });

  const resourceVendors = Array.from(getResourceVendors(resources));
  const vendorAssets = createVendorAssets(resourceVendors, filters.vendorAssets, resourcesWithFormatFilterApplied);

  const resourcesWithVendorFilterApplied = resourcesWithFormatFilterApplied
    .filter(resource => {
      const selectedAssets = getSelectedAssets(vendorAssets)
      return selectedAssets === 'NOTHING' || selectedAssets
        .some(vendor => resource.vendor === vendor)
    });

  const resourcesWithSearchTextFilterApplied = resourcesWithVendorFilterApplied
    .filter(resource => Object
      .entries(resource)
      .some(property => !filters.searchText ||
              getPropertyValue(property).toLowerCase()
                .includes(filters.searchText.toLowerCase()))
    );

  const selectedTypeLabels: string[] = typeAssets
    .filter(asset => asset.value)
    .map(asset => asset.label);

  const shapesForFilter: ShapePropertyForFilter[] = getShapePropertiesForFilter(shapes, selectedTypeLabels);

  const specificAssets = createSpecificAssets(shapesForFilter, filters.specificAssets, specialResourceDetails);

  const resourceSpecialDetailsQuery: string = getCypherQueryForProperties(shapesForFilter, filters.specificAssets, selectedTypeLabels);

  const specialDetailsURIs = getFilteredSpecificResourceUrls(specialResourceDetails, specificAssets);

  const specificAssetsWithFilterApplied = specialDetailsURIs.length > 0
    ? resourcesWithSearchTextFilterApplied.filter(resource =>
      specialDetailsURIs.some(uri => uri === resource.uri))
    : resourcesWithSearchTextFilterApplied;

  return {
    typeAssets,
    formatAssets,
    vendorAssets,
    specificAssets,
    resourceSpecialDetailsQuery,
    filteredResources: specificAssetsWithFilterApplied
  };
}
