import { Ontology } from '../../types/ontologies.model';

export const EnvironmentModelOntology: Ontology = {
  subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/',
  contributors: [
    'Mirco Nierenz (TG)'
  ],
  description: 'ontology definition for environment-model',
  version: '0.1',
  nodes: [
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/',
      label: '"ontology definition for environment-model"@en',
      type: 'http://www.w3.org/2002/07/owl#Ontology'
    },
    {
      id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModel',
      label: '"environment-model"',
      type: 'http://www.w3.org/2002/07/owl#Class'
    },
  ],
  links: [
    {
      'source': 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModel',
      'target': 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#DataResource'
    }
  ],
  relatedShapes: []
};
