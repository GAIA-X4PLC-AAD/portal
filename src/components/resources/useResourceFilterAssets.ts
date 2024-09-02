import { useEffect, useState } from 'react';
import { fetchAllSchemas } from 'services/schemaApiService';

import {
  fetchAllOntologiesFromSchemas,
  getResourceTypes,
  getUniqueLinks,
  getUniqueNodes
} from '../../services/ontologyService.utils';
import { fetchAllShapesFromSchemas } from '../../services/shapeService.utils';
import { Node } from '../../types/ontologies.model';

const NODE_TYPE_FILTERS = [
  'http://www.w3.org/2000/01/rdf-schema#Class',
  'http://www.w3.org/2002/07/owl#Class',
  'http://www.w3.org/2002/07/owl#ObjectProperty'
]

type AssetValueType = boolean | string;

export interface Asset {
    id: string;
    type: string;
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

  useEffect(() => {
    (async () => {
      const schemas = await fetchAllSchemas();
      const shapes = await fetchAllShapesFromSchemas(schemas);
      const ontologies = await fetchAllOntologiesFromSchemas(schemas, shapes)

      const nodes = getUniqueNodes(ontologies, (node: Node) => NODE_TYPE_FILTERS.includes(node.type));
      const links = getUniqueLinks(ontologies, nodes);
      const resourceTypes = getResourceTypes(links, shapes)

      setTypeAssets(resourceTypes.map(({ id, label }) => ({
        id: id,
        type: 'typeAssets',
        label: label,
        value: false,
        disabled: false
      })));
      setIsLoading(false);
    })();
  }, []);

  const updateAssetFilter = (asset: Asset) => {
    switch (asset.type) {
    case 'typeAssets':
      setTypeAssets(typeAssets
        .map(item => item.id === asset.id ? asset : item))
      break
    default:
      console.info('The \'updateAsset\' method is not implemented for the following asset', asset);
    }
  }

  return {
    isLoadingAssets: isLoading,
    typeAssets,
    // TODO: Demo values for format assets should be replaced by dynamic loading
    formatAssets: [
      {
        id: 'openDrive',
        type: 'formatAssets',
        label: 'Opendrive',
        value: false,
        disabled: true
      },
      {
        id: 'fbx',
        type: 'formatAssets',
        label: 'FBX',
        value: false,
        disabled: true
      },
      {
        id: 'openScenario',
        type: 'formatAssets',
        label: 'OpenSCENARIO',
        value: false,
        disabled: true
      },
    ],
    // TODO: Demo values for vendor assets should be replaced by dynamic loading
    vendorAssets: [
      {
        id: 'threeDMapping',
        type: 'vendorAsset',
        label: '3D Mapping',
        value: false,
        disabled: true
      },
      {
        id: 'trainGraphics',
        type: 'vendorAsset',
        label: 'TrainGraphics',
        value: false,
        disabled: true
      },
      {
        id: 'dlr',
        type: 'vendorAsset',
        label: 'DLR',
        value: false,
        disabled: true
      },
    ],
    updateAssetFilter
  }
};
