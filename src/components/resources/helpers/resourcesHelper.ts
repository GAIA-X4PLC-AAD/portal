import { Resource } from '../../../types/resources.model';

import { Asset, createAsset, FORMAT_ASSETS, TYPE_ASSETS } from './resourceFilterAssetHelper';

/**
 * Checks if a resource corresponds to a certain criteria represented by the asset.
 *
 * @param resource to be checked
 * @param assets contains the method and the information to check against
 * @return true if corresponds, false otherwise
 */
export const assetFilterPredicate = (resource: Resource, assets: Asset[]): boolean => {
  const typeAssets = assets.filter(asset => asset.value && asset.type === TYPE_ASSETS)
  const typeFiltersApply = !typeAssets.length
      || typeAssets.some(asset => typeAssetPredicate(resource, asset))

  const formatAssets = assets.filter(asset => asset.value && asset.type === FORMAT_ASSETS)
  const formatFiltersApply = !formatAssets.length
      || formatAssets.some(asset => formatAssetPredicate(resource, asset))

  return typeFiltersApply && formatFiltersApply
}

/**
 * Checks if a resource is of a certain type defined in the asset.
 *
 * @param resource to be checked
 * @param asset containing the type to be checked against.
 * @return true if it is, false otherwise.
 */
const typeAssetPredicate = (resource: Resource, asset: Asset): boolean => (
  resource.labels
    .map(label => label.toLowerCase())
    .includes(asset.label.toLowerCase())
)

/**
 * Checks if a resource has a certain format defined in the asset.
 *
 * @param resource to be checked
 * @param asset containing the format to be checked against.
 * @return true if it is, false otherwise.
 */
const formatAssetPredicate = (resource: Resource, asset: Asset): boolean => {
  return !!resource.format && resource.format.toLowerCase() === asset.label.toLowerCase();
}

/**
 * Removes from the labels list of each resource the following labels: 'resource', 'DataResource'.
 * This has relevance when displaying the resource list. We do not want to show the above-mentioned labels.
 *
 * @param resources the original resource list
 */
export const removeDataResourceLabels = (resources: Resource[]) => {
  return resources.map(resource => ({
    ...resource,
    labels: resource.labels.filter(label => !['Resource', 'DataResource'].includes(label))
  }));
}

/**
 * Creates a new list from the resources list, applying the searchText filter and the assets filter to it.
 *
 * @param resources list to create the filtered from
 * @param searchText is looked up in all its props
 * @param assets a list of assets based on which a resources are selected
 * @return the new filtered list
 */
export const applyFilters = (resources: Resource[], searchText: string, assets: Asset[]): Resource[] => (
  resources
    .filter(resource => assetFilterPredicate(resource, assets))
    .filter(resource => Object
      .entries(resource)
      .some(property => !searchText ||
          getPropertyValue(property).toLowerCase()
            .includes(searchText.toLowerCase())
      )
    ))

const getPropertyValue = (objectEntry: [string, any]) => String(objectEntry[1])

export const createTypeAssets = (types: string[], resources: Resource[]) => {
  const resourceLabels = getAllLabels(resources);
  return types.map(type => createAsset(type, 'typeAssets', !resourceLabels.has(type)));
}

export const getAllLabels = (resources: Resource[]) =>
  new Set(
    resources
      .map(resource => resource.labels)
      .flat()
  );

export const createFormatAssets = (
  formats: string[],
  typeAssets: Asset[],
  resources: Resource[],
  initiallySelected: Asset[]
) => {
  let selectedTypeAssets = typeAssets
    .filter(asset => !asset.disabled && asset.value)
    .map(asset => asset.id)

  // If nothing is selected it is considered that all enabled ones are selected
  if (!selectedTypeAssets.length) {
    selectedTypeAssets = typeAssets
      .filter(asset => !asset.disabled)
      .map(asset => asset.id);
  }

  // Get formats only from selected resources
  const resourceFormats =
      getAllFormats(resources
        .filter(resource => resource.labels
          .some(label => selectedTypeAssets.includes(label))));

  return formats.map(format => ({
    id: format,
    type: 'formatAssets',
    label: format,
    value: initiallySelected.some(asset => asset.id === format),
    disabled: !resourceFormats.has(format)
  } as Asset));
}

export const getAllFormats = (resources: Resource[]) =>
  new Set(
    resources
      .map(resource => resource.format)
      .flat()
  );

