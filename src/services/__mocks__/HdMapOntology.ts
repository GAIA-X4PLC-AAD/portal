import { Ontology } from '../../types/ontologies.model';

export const HdMapOntology: Ontology = {
  subject: 'https://github.com/GAIA-X4PLC-AAD/hdmap/',
  contributors: ['Sebastian Tuttas (3DMS)'],
  description: 'ontology definition for hdmap',
  version: '0.1',
  nodes: [
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/',
      label: '"ontology definition for hdmap"@en',
      type: 'http://www.w3.org/2002/07/owl#Ontology'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/HdMap',
      label: '"class definition for hdmap"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Content',
      label: '"class definition for Content"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/DataSource',
      label: '"class definition for DataSource"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Format',
      label: '"class definition for Format"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Quality',
      label: '"class definition for Quality"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Quantity',
      label: '"class definition for Quantity"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    }
  ],
  links: [
    {
      source: 'https://github.com/GAIA-X4PLC-AAD/hdmap/HdMap',
      target: 'hapes/jsonld/trustframework#DataResource'
    }
  ],
  relatedShapes: []
};
