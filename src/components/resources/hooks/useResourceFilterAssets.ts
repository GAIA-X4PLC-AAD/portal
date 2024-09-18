import { useEffect, useState } from 'react';

import {
  Asset,
  createAsset,
  disableNonAvailableAssets,
  FORMAT_ASSETS,
  TYPE_ASSETS,
  updateAssetFilter,
  VENDOR_ASSETS,
} from '../helpers/resourceFilterAssetHelper';
import { loadResourceFilterAssets } from '../helpers/resourceFilterAssetsDataFlow';

interface IUseFilterAssets {
    isLoadingAssets: boolean;
    typeAssets: Asset[];
    formatAssets: Asset[];
    vendorAssets: Asset[];
    setAvailableTypeAssetIds: (assets: string[]) => void;
    setAvailableFormatAssetIds: (assets: string[]) => void;
    updateAssetFilter: (asset: Asset) => void;
}

export const useResourceFilterAssets = (): IUseFilterAssets => {
  const [isLoading, setIsLoading] = useState(true);
  const [typeAssets, setTypeAssets] = useState<Asset[]>([]);
  const [availableTypeAssetIds, setAvailableTypeAssetIds] = useState<string[]>([]);
  const [formatAssets, setFormatAssets] = useState<Asset[]>([]);
  const [availableFormatAssetIds, setAvailableFormatAssetIds] = useState<string[]>([]);

  useEffect(() => {
    loadResourceFilterAssets()
      .then(({ resourceTypes, resourceFormats }) => {
        console.debug('resourceTypes:', resourceTypes);
        setTypeAssets(resourceTypes.map((resourceType) => createAsset(resourceType, TYPE_ASSETS)));
        console.debug('resourceFormats:', resourceFormats);
        setFormatAssets(resourceFormats.map((resourceFormat => createAsset(resourceFormat, FORMAT_ASSETS))))
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, []);

  useEffect(() => {
    setTypeAssets(disableNonAvailableAssets(typeAssets, availableTypeAssetIds))
  }, [availableTypeAssetIds])

  useEffect(() => {
    setFormatAssets(disableNonAvailableAssets(formatAssets, availableFormatAssetIds))
  }, [availableFormatAssetIds])

  return {
    isLoadingAssets: isLoading,
    typeAssets,
    formatAssets,
    vendorAssets: [
      //  Demo values for vendor assets. Should be replaced by dynamic loading of vendor information. At the moment this
      //  information is not available in the ontologies and shacl shapes. It can not be retrieved from the backend.
      createAsset('3D Mapping', VENDOR_ASSETS, true),
      createAsset('TrainGraphics', VENDOR_ASSETS, true),
      createAsset('DLR', VENDOR_ASSETS, true),
    ],
    setAvailableTypeAssetIds,
    setAvailableFormatAssetIds,
    updateAssetFilter: (asset: Asset) => updateAssetFilter(asset, {
      setTypeAssets,
      typeAssets,
      setFormatAssets,
      formatAssets
    })
    ,
  }
};
