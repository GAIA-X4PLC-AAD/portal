import { Resource } from '../../../types/resources.model';

export const TYPE_ASSETS = 'typeAssets';
export const FORMAT_ASSETS = 'formatAssets';
export const VENDOR_ASSETS = 'vendorAssets';
export type AssetTypes = 'typeAssets' | 'formatAssets' | 'vendorAssets';

/**
 * Interface type used to define all the props needed to manage the filter assets.
 */
export interface Asset {
    id: string;
    type: AssetTypes;
    label: string;
    value: boolean;
    disabled: boolean;
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
const getAllFormats = (resources: Resource[]) =>
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
export type SelectedAssets = 'ALL' | string[];

/**
 * Returns the selected assets from the list. It has an ALL option which means that everything is selected. No list
 * should be provided.
 *
 * An asset is considered selected when it is not disabled and its value is true.
 *
 * If no asset is selected it is considered that everything is selected and in that case it is returned 'ALL'.
 *
 * @param assets list to be filtered for the selected one.
 */
export const getSelectedAssets = (assets: Asset[]): SelectedAssets => {
  let selectedAssets = assets
    .filter(asset => !asset.disabled && asset.value)
    .map(asset => asset.id)

  // If type filter is selected it is considered that all enabled ones are selected
  if (!selectedAssets.length) {
    return 'ALL'
  }
  return selectedAssets;
}

type UpdateFilterAsset = (
    typeAssets: Asset[],
    setTypeAssets: (assets: Asset[]) => void,
    formatAssets: Asset[],
    setFormatAssets: (assets: Asset[]) => void,
    vendorAssets: Asset[],
    setVendorAssets: (assets: Asset[]) => void,
) => (asset: Asset) => void;

export const updateFilterAsset: UpdateFilterAsset = (
  typeAssets, setTypeAssets,
  formatAssets, setFormatAssets,
  vendorAssets, setVendorAssets
) => {
  return (asset: Asset) => {
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
  };
}
