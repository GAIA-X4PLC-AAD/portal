import { useEffect, useState } from 'react';
import { fetchAllSchemas } from 'services/schemaApiService';

import {
  fetchAllOntologiesFromSchemas,
  getResourceFormats,
  getResourceTypes
} from '../../services/ontologyService.utils';
import { fetchAllShapesFromSchemas } from '../../services/shapeService.utils';

type AssetValueType = boolean | string;

export const TYPE_ASSETS = 'typeAssets';
export const FORMAT_ASSETS = 'formatAssets';
export const VENDOR_ASSETS = 'vendorAssets';

export interface Asset {
    id: string;
  type: 'typeAssets' | 'formatAssets' | 'vendorAssets';
    label: string;
    value: AssetValueType;
    disabled: boolean;
}

interface IUseFilterAssets {
    isLoadingAssets: boolean;
    typeAssets: Asset[];
    formatAssets: Asset[];
    vendorAssets: Asset[];
    updateAssetFilter: (asset: Asset) => void;
}

export const useResourceFilterAssets = (): IUseFilterAssets => {
  const [isLoading, setIsLoading] = useState(true);
  const [typeAssets, setTypeAssets] = useState<Asset[]>([]);
  const [formatAssets, setFormatAssets] = useState<Asset[]>([]);

  useEffect(() => {
    (async () => {
      const schemas = await fetchAllSchemas();
      const shapes = await fetchAllShapesFromSchemas(schemas);
      const ontologies = await fetchAllOntologiesFromSchemas(schemas, shapes)
      const resourceTypes = getResourceTypes(ontologies);
      const resourceFormats = getResourceFormats(ontologies);

      console.debug('resourceTypes:', resourceTypes);
      setTypeAssets(resourceTypes.map((resourceType) => ({
        id: resourceType,
        type: TYPE_ASSETS,
        label: resourceType,
        value: false,
        disabled: false
      } as Asset)));

      console.debug('resourceFormats:', resourceFormats);
      setFormatAssets(resourceFormats.map((resourceFormat => ({
        id: resourceFormat,
        type: FORMAT_ASSETS,
        label: resourceFormat,
        value: false,
        disabled: false
      } as Asset))))
      setIsLoading(false);
    })();
  }, []);

  const updateAssetFilter = (asset: Asset) => {
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

  return {
    isLoadingAssets: isLoading,
    typeAssets,
    formatAssets,
    // TODO: Demo values for vendor assets. Should be replaced by dynamic loading of vendor information. At the
    //  moment this information is not available in the ontologies and shacl shapes. It can not be retrieved from
    //  the backend.
    vendorAssets: [
      {
        id: 'threeDMapping',
        type: VENDOR_ASSETS,
        label: '3D Mapping',
        value: false,
        disabled: true
      },
      {
        id: 'trainGraphics',
        type: VENDOR_ASSETS,
        label: 'TrainGraphics',
        value: false,
        disabled: true
      },
      {
        id: 'dlr',
        type: VENDOR_ASSETS,
        label: 'DLR',
        value: false,
        disabled: true
      },
    ],
    updateAssetFilter
  }
};
