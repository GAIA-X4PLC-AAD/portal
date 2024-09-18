import { Ontology } from '../../src/types/ontologies.model';

export const HdmapOntology: Ontology = {
  subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
  contributors: ['Sebastian Tuttas (3DMS)'],
  description: 'ontology definition for hdmap',
  version: '0.1',
  nodes: [
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
      label: '"ontology definition for hdmap"@en',
      type: 'http://www.w3.org/2002/07/owl#Ontology'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMap',
      label: '"class definition for hdmap"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Content',
      label: '"class definition for Content"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSource',
      label: '"class definition for DataSource"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Format',
      label: '"class definition for Format"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quality',
      label: '"class definition for Quality"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quantity',
      label: '"class definition for Quantity"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    }
  ],
  links: [
    {
      source: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMap',
      target: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#DataResource'
    }
  ],
  relatedShapes: []
};
