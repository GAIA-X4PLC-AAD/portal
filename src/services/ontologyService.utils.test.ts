import { describe, expect, it } from '@jest/globals';
import { Quad } from 'n3';

import { Ontology } from '../types/ontologies.model';

import { createOntologyObject } from './ontologyService.utils';

describe('createOntologyObject method documentation', () => {
  it('Creates EnvironmentModel ontology from quads', () => {
    const quads = [
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
    const expected: Ontology = {
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

    const result = createOntologyObject(quads, []);
    expect(result).toEqual(expected);
  });

  it('Create HdMap ontology from quads', () => {
    const quads = [
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
    const expected: Ontology = {
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

    const result = createOntologyObject(quads, []);
    expect(result).toEqual(expected);
  });
});
