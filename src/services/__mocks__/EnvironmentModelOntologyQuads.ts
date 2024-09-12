import { Quad } from 'n3';

export const EnvironmentModelOntologyQuads = [
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Ontology' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/' },
  },
  {
    object: { id: '"ontology definition for environment-model"@en' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/' }
  },
  {
    object: { id: '"Mirco Nierenz (TG)"' },
    predicate: { id: 'http://purl.org/dc/terms/contributor' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/' },
  },
  {
    object: { id: '"0.1"^^http://www.w3.org/2001/XMLSchema#float' },
    predicate: { id: 'http://www.w3.org/2002/07/owl#versionInfo' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/' },
  },
  {
    object: { id: 'http://www.w3.org/2002/07/owl#Class' },
    predicate: { id: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModel' },
  },
  {
    object: { id: '"environment-model"' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModel' },
  },
  {
    object: { id: '"attributes for 3d environment models"@en' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModel' },
  },
  {
    object: { id: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#DataResource' },
    predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#subClassOf' },
    subject: { id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModel' },
  }
] as unknown as Quad[];
