import { Resource } from '../../../types/resources.model';

import { Asset, FORMAT_ASSETS, TYPE_ASSETS } from './resourceFilterAssetHelper';

/**
 * Checks if a resource corresponds to a certain criteria represented by the asset.
 *
 * @param resource to be checked
 * @param assets contains the method and the information to check against
 * @return true if corresponds, false otherwise
 */
export const assetFilterPredicate = (resource: Resource, assets: Asset[]): boolean => {
  let typeFiltersApply = true;
  const typeAssets = assets
    .filter(asset => asset.value && asset.type === TYPE_ASSETS)
  if (typeAssets.length) {
    typeFiltersApply = typeAssets
      .some(asset => typeAssetPredicate(resource, asset))
  }

  let formatFiltersApply = true;
  const formatAssets = assets
    .filter(asset => asset.value && asset.type === FORMAT_ASSETS)
  if (formatAssets.length) {
    formatFiltersApply = formatAssets
      .some(asset => formatAssetPredicate(resource, asset))
  }

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
    .filter(resource => Object
      .entries(resource)
      .some(property => !searchText ||
                String(property[1]).toLowerCase()
                  .includes(searchText.toLowerCase())
      )
    )
    .filter(resource =>
      assetFilterPredicate(resource, assets)
    )
)
