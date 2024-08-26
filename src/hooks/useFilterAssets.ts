import { useEffect, useState } from 'react';

import {
  fetchAllOntologiesFromSchemas,
  getResourceTypes,
  getUniqueLinks,
  getUniqueNodes
} from '../services/ontologyService.utils';
import { fetchAllSchemas } from '../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../services/shapeService.utils';
import { Node } from '../types/ontologies.model';

const nodeTypeFilters = [
  'http://www.w3.org/2000/01/rdf-schema#Class',
  'http://www.w3.org/2002/07/owl#Class',
  'http://www.w3.org/2002/07/owl#ObjectProperty'
]

export interface Asset {
    checkboxName: string;
    label: string;
}

interface Filter {
    typeAssets: Asset[];
    formatAssets: Asset[];
    vendorAssets: Asset[];
}

export const useFilterAssets = (): Filter => {
  const [typeAssets, setTypeAssets] = useState<Asset[]>([]);

  useEffect(() => {
    (async () => {
      const schemas = await fetchAllSchemas();
      const shapes = await fetchAllShapesFromSchemas(schemas);
      const ontologies = await fetchAllOntologiesFromSchemas(schemas, shapes)

      const nodes = getUniqueNodes(ontologies, (node: Node) => nodeTypeFilters.includes(node.type));
      const links = getUniqueLinks(ontologies, nodes);
      const resourceTypes = getResourceTypes(links, shapes)
      setTypeAssets(resourceTypes.map((type: string) => ({
        checkboxName: type,
        label: type
      })));
    })();
  }, []);

  return {
    typeAssets,
    formatAssets: [
      {
        checkboxName: 'openDrive',
        label: 'Opendrive',
      },
      {
        checkboxName: 'fbx',
        label: 'FBX',
      },
      {
        checkboxName: 'openScenario',
        label: 'OpenSCENARIO',
      },
    ],
    vendorAssets: [
      {
        checkboxName: 'threeDMapping',
        label: '3D Mapping',
      },
      {
        checkboxName: 'trainGraphics',
        label: 'TrainGraphics',
      },
      {
        checkboxName: 'dlr',
        label: 'DLR',
      },
    ],
  }
};
