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
 * The type of the updateAssetFilter method
 */
type UpdateAssetFilterMethod = (
    asset: Asset,
    assetFilterInterface: {
        typeAssets: Asset[]
        setTypeAssets: (assets: Asset[]) => void
        formatAssets: Asset[]
        setFormatAssets: (assets: Asset[]) => void
    }) => void;

/**
 * Update logic of an asset. Based on the type of the asset calls the proper setter and uses the proper current
 * values to generate the updated values.
 *
 * @param asset to be updated
 * @param typeAssets the current type assets list
 * @param setTypeAssets the setter of the type assets list
 * @param formatAssets the current format assets list
 * @param setFormatAssets the setter of the format assets list
 */
export const updateAssetFilter: UpdateAssetFilterMethod = (asset, {
  typeAssets,
  setTypeAssets,
  formatAssets,
  setFormatAssets
}) => {
  switch (asset.type) {
  case TYPE_ASSETS:
    setTypeAssets(typeAssets
      .map(item => item.id === asset.id ? asset : item))
    break
  case FORMAT_ASSETS:
    setFormatAssets(formatAssets
      .map(item => item.id === asset.id ? asset : item))
    break
  default:
    console.info('The \'updateAsset\' method is not implemented for the following asset', asset);
  }
}

/**
 * Asset object factory.
 *
 * @param label displayed on the UI
 * @param type of the asset
 * @param disabled should appear disabled on the UI
 * @return the new asset
 */
export const createAsset = (
  label: string,
  type: AssetTypes,
  disabled: boolean = false
): Asset => ({
  id: label,
  type,
  label,
  value: false,
  disabled
})

/**
 * Makes a copy of the assets list, where all items which ids are not present in the available asset id list are
 * marked as disabled.
 *
 * @param assets original asset list
 * @param availableAssetIds asset ids which are considered as available
 * @return the updated asset list
 */
export const disableNonAvailableAssets = (assets: Asset[], availableAssetIds: string[]): Asset[] => (
  assets.map((asset) => ({
    ...asset,
    disabled: !availableAssetIds.some(availableAssetId => availableAssetId === asset.id)
  }))
)
