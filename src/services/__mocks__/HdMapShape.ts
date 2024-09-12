import { Shape } from '../../types/shapes.model';

export const HdMapShape = [
  {
    classname: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMap',
    nodes: [
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/GeneralShape',
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape',
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape',
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape',
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape',
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape',
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/GeoreferenceShape'
    ],
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
    shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
    shortSubject: 'HdMap',
    subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape',
    targetClasses: [
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMap'
    ]
  },
  {
    classname: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Content',
    nodes: [],
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
    shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
    shortSubject: 'Content',
    subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape',
    targetClasses: [
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Content'
    ]
  },
  {
    classname: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSource',
    nodes: [],
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
    shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
    shortSubject: 'DataSource',
    subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape',
    targetClasses: [
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSource'
    ]
  },
  {
    classname: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Format',
    nodes: [],
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
    shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
    shortSubject: 'Format',
    subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape',
    targetClasses: [
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Format'
    ]
  },
  {
    classname: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quality',
    nodes: [],
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
    shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
    shortSubject: 'Quality',
    subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape',
    targetClasses: [
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quality'
    ]
  },
  {
    classname: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quantity',
    nodes: [
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Range2DShape'
    ],
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
    shaclShapeId: '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b',
    shortSubject: 'Quantity',
    subject: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape',
    targetClasses: [
      'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quantity'
    ]
  }
] as unknown as Shape[];
