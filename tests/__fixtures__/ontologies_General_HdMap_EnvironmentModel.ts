import { Ontology } from '../../src/types/ontologies.model';

export const ontologies_General_HdMap_EnvironmentModel  = [
  {
    subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/',
    contributors: [
      'Mirco Nierenz (TG)'
    ],
    description: 'ontology definition for General',
    version: '0.1',
    nodes: [
      {
        id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/',
        label: '"ontology definition for General"@en',
        type: 'http://www.w3.org/2002/07/owl#Ontology'
      },
      {
        id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/General',
        label: '"Class definition for General"',
        type: 'http://www.w3.org/2002/07/owl#Class'
      },
      {
        id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Description',
        label: '"Description definition for General"',
        type: 'http://www.w3.org/2002/07/owl#Class'
      },
      {
        id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Data',
        label: '"Data definition for General"',
        type: 'http://www.w3.org/2002/07/owl#Class'
      },
      {
        id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/BundleData',
        label: '"BundleData definition for General"',
        type: 'http://www.w3.org/2002/07/owl#Class'
      },
      {
        id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Links',
        label: '"Links definition for General"',
        type: 'http://www.w3.org/2002/07/owl#Class'
      },
      {
        id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Link',
        label: '"Link definition for General"',
        type: 'http://www.w3.org/2002/07/owl#Class'
      },
      {
        id: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Range2D',
        label: '"Range2D definition for General"',
        type: 'http://www.w3.org/2002/07/owl#Class'
      }
    ],
    links: [],
    relatedShapes: [
      {
        shaclShapeId: '8c6a9177cc0141095c1d65d10963359bb5338f9dd8ceb314073ce0a3c3497b59',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/GeneralShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/description',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/DescriptionShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/description'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/data',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/DataShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/data'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/links',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinksShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '3'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/links'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/bundleData',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/BundleDataShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '4'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/bundleData'
              }
            ]
          }
        ],
        nodes: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/DescriptionShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/DataShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinksShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/BundleDataShape'
        ],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/General'
        ]
      },
      {
        shaclShapeId: '8c6a9177cc0141095c1d65d10963359bb5338f9dd8ceb314073ce0a3c3497b59',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/DescriptionShape',
        properties: [
          {
            propertyId: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#name',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'name'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'A human readable name of the entity.'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '3D Model in Grafing'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#name'
              }
            ]
          },
          {
            propertyId: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#description',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'description'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'A free text description of the entity.'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'town district, with traffic signs'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#description'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Description'
        ]
      },
      {
        shaclShapeId: '8c6a9177cc0141095c1d65d10963359bb5338f9dd8ceb314073ce0a3c3497b59',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/DataShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/size',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'size'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Size of the file to be downloaded in MB.'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '5.8'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/size'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/contractId',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'contractId'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Contract information in regards to the data exchange component.'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'contract_zcdkr7kqd47y0w5b4tg91w1etw'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/contractId'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/recordingTime',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'recordingTime'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Time of data acquisition used to generate the asset, if partial measurement: oldest date'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '2022-04-01 00:00:00'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#dateTime'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of recordingTime failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '3'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/recordingTime'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Data'
        ]
      },
      {
        shaclShapeId: '8c6a9177cc0141095c1d65d10963359bb5338f9dd8ceb314073ce0a3c3497b59',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/BundleDataShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/requiredData',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'requiredData'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Reference to required assets'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'for scenario, link to required hd map'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/requiredData'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/relatedData',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'relatedData'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Reference to optional related assets'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'at hd map, link to optional surface map'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/relatedData'
              }
            ]
          }
        ],
        nodes: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape'
        ],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/BundleData'
        ]
      },
      {
        shaclShapeId: '8c6a9177cc0141095c1d65d10963359bb5338f9dd8ceb314073ce0a3c3497b59',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinksShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/media',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'media'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Reference to media data'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'link to bundle data, screenshot, video, routing, 3d preview'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of media failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/media'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/data',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'data'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Reference to the data asset as url/uri of the EDC'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'link to data asset, e.g. hd map'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of data failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/data'
              }
            ]
          }
        ],
        nodes: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape'
        ],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Links'
        ]
      },
      {
        shaclShapeId: '8c6a9177cc0141095c1d65d10963359bb5338f9dd8ceb314073ce0a3c3497b59',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/LinkShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/type',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'type'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Choose type of link.'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#in',
                value: [
                  'Document',
                  'Image',
                  'Model',
                  'Routing',
                  'Video',
                  '3DPreview',
                  'Asset'
                ]
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of type failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/type'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/url',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'url'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Enter link as URL or DID.'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#anyURI'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of url failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/url'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Link'
        ]
      },
      {
        shaclShapeId: '8c6a9177cc0141095c1d65d10963359bb5338f9dd8ceb314073ce0a3c3497b59',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Range2DShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/max',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'max'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of max failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/max'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/min',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'min'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of min failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/min'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Range2D'
        ]
      }
    ]
  },
  {
    subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/',
    contributors: [
      'Sebastian Tuttas (3DMS)'
    ],
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
    relatedShapes: [
      {
        shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/general',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/GeneralShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/general'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/format',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/format'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/content',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '3'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/content'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/quantity',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '4'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/quantity'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/quality',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '5'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/quality'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/dataSource',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '6'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/dataSource'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/georeference',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/GeoreferenceShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '7'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/georeference'
              }
            ]
          }
        ],
        nodes: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/GeneralShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/GeoreferenceShape'
        ],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMap'
        ]
      },
      {
        shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/roadTypes',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'roadTypes'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Covered/used road types, defined over ODR element t_road_type, see ODR spec section 8.3'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '[Motorway, Rural]'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#in',
                value: [
                  'Bicycle',
                  'LowSpeed',
                  'Motorway',
                  'Pedestrian',
                  'Rural',
                  'Town',
                  'TownArterial',
                  'TownCollector',
                  'TownExpressway',
                  'TownLocal',
                  'TownPlayStreet',
                  'TownPrivate',
                  'Unknown'
                ]
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of roadTypes failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/roadTypes'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/laneTypes',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'laneTypes'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Covered lane types, see ODR spec section 9.5.3.'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'shoulder, curb, ...'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#in',
                value: [
                  'biking',
                  'border',
                  'connectingRamp',
                  'curb',
                  'driving',
                  'entry',
                  'exit',
                  'median',
                  'none',
                  'offRamp',
                  'onRamp',
                  'parking',
                  'restricted',
                  'shoulder',
                  'slipLane',
                  'stop',
                  'walking'
                ]
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of laneTypes failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/laneTypes'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/levelOfDetail',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'levelOfDetail'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Covered object classes, see ODR spec section 11'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'trees, street lamps, road patches...'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#in',
                value: [
                  'barrier',
                  'bike',
                  'building',
                  'bus',
                  'car',
                  'crosswalk',
                  'gantry',
                  'motorbike'
                ]
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of levelOfDetail failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/levelOfDetail'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/trafficDirection',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'trafficDirection'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Traffic direction, i.e. right-hand or left-hand traffic'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'right-hand traffic'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#in',
                value: [
                  'left-hand',
                  'right-hand'
                ]
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of trafficDirection failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '3'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/trafficDirection'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Content'
        ]
      },
      {
        shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/measurementSystem',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'measurementSystem'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Main acquisition device'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '3DMS system, Trimble xyz, Riegl xyz'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of measurementSystem failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/measurementSystem'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/usedDataSources',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'usedDataSources'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Basic data for the creation of the map'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'scanner, camera, osm network, aerial images, ...'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of usedDataSources failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/usedDataSources'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSource'
        ]
      },
      {
        shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/version',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'version'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Version of data format'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '1.5'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of version failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/version'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/formatType',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'type'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Format type definition'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'ASAM OpenDRIVE  Road5 Lanelet road2sim roadXML Shape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#in',
                value: [
                  'ASAM OpenDRIVE',
                  'Lanelet',
                  'Road5',
                  'Shape',
                  'road2sim',
                  'roadXML'
                ]
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of type failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/formatType'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Format'
        ]
      },
      {
        shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracySignals',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'accuracySignals'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Accuracy of traffic relevant objects, signs and signals'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '0.1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of accuracySignals failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '3'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracySignals'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyObjects',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'accuracyObjects'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Accuracy of objects in the traffic space, which do not directly affect the traffic'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '0.1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of accuracyObjects failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '4'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyObjects'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyLaneModelHeight',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'accuracyLaneModelHeight'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Accuracy lane modell height'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '0.1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of accuracyLaneModelHeight failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyLaneModelHeight'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/precision',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'precision'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Precision of measured road network (relative accuracy)'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '0.01'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of precision failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/precision'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyLaneModel2d',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'accuracyLaneModel2d'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Accuracy of lane modell 2d'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '0.1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of accuracyLaneModel2d failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyLaneModel2d'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quality'
        ]
      },
      {
        shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberIntersections',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'numberIntersections'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Sum of all junctions defined in the map,  see ODR spec section 10'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '5'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#unsignedInt'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of numberIntersections failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberIntersections'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberTrafficLights',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'numberTrafficLights'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Sum of all traffic lights defined in the map,  see ODR spec section 12'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#unsignedInt'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of numberTrafficLights failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '3'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberTrafficLights'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/rangeOfModeling',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'rangeOfModeling'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'How wide is the area beyond the traffic space modeled'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '20'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of rangeOfModeling failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '8'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/rangeOfModeling'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberOutlines',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'numberOutlines'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Sum of all objects outlines in the map,  see ODR spec section 11.2'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '100'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#unsignedInt'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of numberOutlines failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '6'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberOutlines'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/speedLimit',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'speedLimit'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Range of speed limits defined in the map, see ODR spec section 9.5.5. '
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '[10,50] km/h'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of speedLimit failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Range2DShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '7'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/speedLimit'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/length',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'length'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Road network length in km, sum over road length; see ODR spec section 8'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '40.0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of length failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/length'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/elevationRange',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'elevationRange'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Difference of max and mit elevation, extraction from openDrive Element t_road_elevationprofile_elevation, see section 8.4'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '2.22'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of elevationRange failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/elevationRange'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberObjects',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'numberObjects'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Sum of all objects in the map,  see ODR spec section 11'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '200'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#unsignedInt'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of numberObjects failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '5'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberObjects'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberTrafficSigns',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'numberTrafficSigns'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Sum of all traffic signs in the map,  see ODR spec section 12'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '155'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#unsignedInt'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of numberTrafficSigns failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '4'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberTrafficSigns'
              }
            ]
          }
        ],
        nodes: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Range2DShape'
        ],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quantity'
        ]
      }
    ]
  },
  {
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
        label: '"class definition for environment-model"',
        type: 'http://www.w3.org/2002/07/owl#Class'
      }
    ],
    links: [
      {
        source: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModel',
        target: 'https://registry.lab.gaia-x.eu/development/api/trusted-shape-registry/v1/shapes/jsonld/trustframework#DataResource'
      }
    ],
    relatedShapes: [
      {
        shaclShapeId: '9ff53e73d6e55bb1c9838240d1eb758dcf56d62ced1b0c1fcc4cf6aa022f996c',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModelShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/general',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/GeneralShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/general'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/quantity',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/QuantityShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/quantity'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/quality',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/QualityShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '3'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/quality'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/project',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/ProjectShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '4'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/project'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/format',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/FormatShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '5'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/format'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/georeference',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#node',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/GeoreferenceShape'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '6'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/georeference'
              }
            ]
          }
        ],
        nodes: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/GeneralShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/QuantityShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/QualityShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/ProjectShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/FormatShape',
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/GeoreferenceShape'
        ],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/EnvironmentModel'
        ]
      },
      {
        shaclShapeId: '9ff53e73d6e55bb1c9838240d1eb758dcf56d62ced1b0c1fcc4cf6aa022f996c',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/FormatShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/formatType',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'type'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Data type definition'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'Unreal DataSmith, Autodesk FBX, OpenSceneGraph, GLTF'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#in',
                value: [
                  'Autodesk FBX',
                  'GLTF',
                  'OpenSceneGraph',
                  'Unreal DataSmith'
                ]
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of type failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/formatType'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/version',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'version'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Version of data format'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'SDK 4.25'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of version failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/version'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/Format'
        ]
      },
      {
        shaclShapeId: '9ff53e73d6e55bb1c9838240d1eb758dcf56d62ced1b0c1fcc4cf6aa022f996c',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/ProjectShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/creationVersion',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'creationVersion'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Tool for the creation of the data'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '7.7'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of creationVersion failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '4'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/creationVersion'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/creationSource',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'creationSource'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Tool for the creation of the data'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'Trian3DBuilder'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of creationSource failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '3'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/creationSource'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/softwareName',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'softwareName'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Name of the graphics engine'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'Unreal'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of softwareName failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/softwareName'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/softwareVendor',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'softwareVendor'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Name of software vendor'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'Epic Games'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of softwareVendor failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/softwareVendor'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/softwareVersion',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'version'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Version of graphics engine'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '4.27'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of version failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/softwareVersion'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/Project'
        ]
      },
      {
        shaclShapeId: '9ff53e73d6e55bb1c9838240d1eb758dcf56d62ced1b0c1fcc4cf6aa022f996c',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/QualityShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/features',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'features'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Description of quality features'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'PBR'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of features failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/features'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/detailLevel',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'detailLevel'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Category of the level of detail (High - highest level of detail with additional object enrichment, Medium - directly from data sources, with environment, Low - topological representation).'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: 'high'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#string'
              },
              {
                type: 'http://www.w3.org/ns/shacl#in',
                value: [
                  'High',
                  'Medium',
                  'Low'
                ]
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of detailLevel failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/detailLevel'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/textureResolution',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'textureResolution'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Real texture resolution in meter (max?)'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '0.1 m'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#float'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of textureResolution failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#minCount',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/textureResolution'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/Quality'
        ]
      },
      {
        shaclShapeId: '9ff53e73d6e55bb1c9838240d1eb758dcf56d62ced1b0c1fcc4cf6aa022f996c',
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/QuantityShape',
        properties: [
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/geometryCount',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'geometryCount'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Total number of all geoemtries(all triangles with a material assignment), instances are considered only once'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '12000'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#int'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of geometryCount failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '2'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/geometryCount'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/triangleCount',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'triangleCount'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Total number of all triangles, instances are considered only once'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '16000000'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#int'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of triangleCount failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/triangleCount'
              }
            ]
          },
          {
            propertyId: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/textureMaterialCount',
            propertyValues: [
              {
                type: 'http://www.w3.org/ns/shacl#name',
                value: 'textureMaterialCount'
              },
              {
                type: 'http://www.w3.org/ns/shacl#description',
                value: 'Number of textures'
              },
              {
                type: 'http://www.w3.org/2004/02/skos/core#example',
                value: '179'
              },
              {
                type: 'http://www.w3.org/ns/shacl#datatype',
                value: 'http://www.w3.org/2001/XMLSchema#unsignedInt'
              },
              {
                type: 'http://www.w3.org/ns/shacl#maxCount',
                value: '1'
              },
              {
                type: 'http://www.w3.org/ns/shacl#message',
                value: 'Validation of textureMaterialCount failed!'
              },
              {
                type: 'http://www.w3.org/ns/shacl#order',
                value: '0'
              },
              {
                type: 'http://www.w3.org/ns/shacl#path',
                value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/textureMaterialCount'
              }
            ]
          }
        ],
        nodes: [],
        targetClasses: [
          'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/Quantity'
        ]
      }
    ]
  }
] as Ontology[];
