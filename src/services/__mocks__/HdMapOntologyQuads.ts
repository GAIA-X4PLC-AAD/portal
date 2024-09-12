import { Quad } from 'n3';

export const HdMapOntologyQuads = [
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Ontology' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/' }
  },
  {
    object: { id: '"ontology definition for hdmap"@en' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/' }
  },
  {
    object: { id: '"Sebastian Tuttas (3DMS)"' },
    predicate: { id: 'http://purl.org/dc/terms/contributor' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/' }
  },
  {
    object: { id: '"0.1"' },
    predicate: { id: 'http://www.w3.org/2002/07/owl#versionInfo' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/' }
  },
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Class' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/HdMap' }
  },
  {
    object: { id: '"class definition for hdmap"' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/HdMap' }
  },
  {
    object: { id: '"Attributes for high definition maps"@en' },
    predicate: { id: 'htts://www.w3.org/2000/01/rdf-schema#comment' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/HdMap' }
  },
  {
    object: { id: 'hapes/jsonld/trustframework#DataResource' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#subClassOf' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/HdMap' }
  },
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Class' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Content' }
  },
  {
    object: { id: '"class definition for Content"' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Content' }
  },
  {
    object: { id: '"Attributes for Content"@en' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Content' }
  },
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Class' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/DataSource' }
  },
  {
    object: { id: '"class definition for DataSource"' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/DataSource' }
  },
  {
    object: { id: '"Attributes for DataSource"@en' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/DataSource' }
  },
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Class' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Format' }
  },
  {
    object: { id: '"class definition for Format"' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Format' }
  },
  {
    object: { id: '"Attributes for Format"@en' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Format' }
  },
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Class' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Quality' }
  },
  {
    object: { id: '"class definition for Quality"' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Quality' }
  },
  {
    object: { id: '"Attributes for Quality"@en' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Quality' }
  },
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Class' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Quantity' }
  },
  {
    object: { id: '"class definition for Quantity"' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Quantity' }
  },
  {
    object: { id: '"Attributes for Quantity"@en' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/hdmap/Quantity' }
  },
] as unknown as Quad[];
