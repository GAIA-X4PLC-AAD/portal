import { describe, expect, it } from '@jest/globals';
import { Quad } from 'n3';

import { Shape } from '../types/shapes.model';

import { createShapeObjects } from './shapeService.utils';

describe('createShapeObjects documentation', () => {
  it('Create EnvironmentShape from quads', () => {
    const shaclShapeId = '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b';
    const quads = [
      {
        object: { value: 'http://www.w3.org/ns/shacl#NodeShape' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-91' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-91' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/GeneralShape' },
        predicate: { value: 'http://www.w3.org/ns/shacl#node' },
        subject: { value: 'n3-91' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-91' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/general' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-91' }
      },
      {
        object: { value: 'n3-91' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-92' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-92' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape' },
        predicate: { value: 'http://www.w3.org/ns/shacl#node' },
        subject: { value: 'n3-92' }
      },
      {
        object: { value: '2' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-92' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/format' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-92' }
      },
      {
        object: { value: 'n3-92' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-93' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-93' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape' },
        predicate: { value: 'http://www.w3.org/ns/shacl#node' },
        subject: { value: 'n3-93' }
      },
      {
        object: { value: '3' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-93' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/content' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-93' }
      },
      {
        object: { value: 'n3-93' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-94' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-94' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' },
        predicate: { value: 'http://www.w3.org/ns/shacl#node' },
        subject: { value: 'n3-94' }
      },
      {
        object: { value: '4' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-94' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/quantity' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-94' }
      },
      {
        object: { value: 'n3-94' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-95' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-95' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape' },
        predicate: { value: 'http://www.w3.org/ns/shacl#node' },
        subject: { value: 'n3-95' }
      },
      {
        object: { value: '5' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-95' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/quality' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-95' }
      },
      {
        object: { value: 'n3-95' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-96' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-96' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape' },
        predicate: { value: 'http://www.w3.org/ns/shacl#node' },
        subject: { value: 'n3-96' }
      },
      {
        object: { value: '6' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-96' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/dataSource' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-96' }
      },
      {
        object: { value: 'n3-96' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-97' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-97' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/georeference/GeoreferenceShape' },
        predicate: { value: 'http://www.w3.org/ns/shacl#node' },
        subject: { value: 'n3-97' }
      },
      {
        object: { value: '7' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-97' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/georeference' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-97' }
      },
      {
        object: { value: 'n3-97' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMap' },
        predicate: { value: 'http://www.w3.org/ns/shacl#targetClass' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/HdMapShape' }
      },
      {
        object: { value: 'http://www.w3.org/ns/shacl#NodeShape' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape' }
      },
      {
        object: { value: '[Motorway, Rural]' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-98' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#string' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-98' }
      },
      {
        object: { value: 'Covered/used road types, defined over ODR element t_road_type, see ODR spec section 8.3' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-98' }
      },
      {
        object: { value: 'Bicycle' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-99' }
      },
      {
        object: { value: 'n3-100' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-99' }
      },
      {
        object: { value: 'LowSpeed' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-100' }
      },
      {
        object: { value: 'n3-101' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-100' }
      },
      {
        object: { value: 'Motorway' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-101' }
      },
      {
        object: { value: 'n3-102' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-101' }
      },
      {
        object: { value: 'Pedestrian' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-102' }
      },
      {
        object: { value: 'n3-103' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-102' }
      },
      {
        object: { value: 'Rural' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-103' }
      },
      {
        object: { value: 'n3-104' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-103' }
      },
      {
        object: { value: 'Town' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-104' }
      },
      {
        object: { value: 'n3-105' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-104' }
      },
      {
        object: { value: 'TownArterial' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-105' }
      },
      {
        object: { value: 'n3-106' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-105' }
      },
      {
        object: { value: 'TownCollector' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-106' }
      },
      {
        object: { value: 'n3-107' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-106' }
      },
      {
        object: { value: 'TownExpressway' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-107' }
      },
      {
        object: { value: 'n3-108' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-107' }
      },
      {
        object: { value: 'TownLocal' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-108' }
      },
      {
        object: { value: 'n3-109' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-108' }
      },
      {
        object: { value: 'TownPlayStreet' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-109' }
      },
      {
        object: { value: 'n3-110' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-109' }
      },
      {
        object: { value: 'TownPrivate' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-110' }
      },
      {
        object: { value: 'n3-111' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-110' }
      },
      {
        object: { value: 'Unknown' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-111' }
      },
      {
        object: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-111' }
      },
      {
        object: { value: 'n3-99' },
        predicate: { value: 'http://www.w3.org/ns/shacl#in' },
        subject: { value: 'n3-98' }
      },
      {
        object: { value: 'Validation of roadTypes failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-98' }
      },
      {
        object: { value: 'roadTypes' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-98' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-98' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/roadTypes' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-98' }
      },
      {
        object: { value: 'n3-98' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape' }
      },
      {
        object: { value: 'shoulder, curb, ...' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-112' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#string' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-112' }
      },
      {
        object: { value: 'Covered lane types, see ODR spec section 9.5.3.' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-112' }
      },
      {
        object: { value: 'biking' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-113' }
      },
      {
        object: { value: 'n3-114' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-113' }
      },
      {
        object: { value: 'border' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-114' }
      },
      {
        object: { value: 'n3-115' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-114' }
      },
      {
        object: { value: 'connectingRamp' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-115' }
      },
      {
        object: { value: 'n3-116' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-115' }
      },
      {
        object: { value: 'curb' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-116' }
      },
      {
        object: { value: 'n3-117' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-116' }
      },
      {
        object: { value: 'driving' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-117' }
      },
      {
        object: { value: 'n3-118' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-117' }
      },
      {
        object: { value: 'entry' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-118' }
      },
      {
        object: { value: 'n3-119' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-118' }
      },
      {
        object: { value: 'exit' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-119' }
      },
      {
        object: { value: 'n3-120' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-119' }
      },
      {
        object: { value: 'median' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-120' }
      },
      {
        object: { value: 'n3-121' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-120' }
      },
      {
        object: { value: 'none' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-121' }
      },
      {
        object: { value: 'n3-122' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-121' }
      },
      {
        object: { value: 'offRamp' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-122' }
      },
      {
        object: { value: 'n3-123' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-122' }
      },
      {
        object: { value: 'onRamp' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-123' }
      },
      {
        object: { value: 'n3-124' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-123' }
      },
      {
        object: { value: 'parking' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-124' }
      },
      {
        object: { value: 'n3-125' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-124' }
      },
      {
        object: { value: 'restricted' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-125' }
      },
      {
        object: { value: 'n3-126' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-125' }
      },
      {
        object: { value: 'shoulder' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-126' }
      },
      {
        object: { value: 'n3-127' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-126' }
      },
      {
        object: { value: 'slipLane' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-127' }
      },
      {
        object: { value: 'n3-128' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-127' }
      },
      {
        object: { value: 'stop' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-128' }
      },
      {
        object: { value: 'n3-129' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-128' }
      },
      {
        object: { value: 'walking' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-129' }
      },
      {
        object: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-129' }
      },
      {
        object: { value: 'n3-113' },
        predicate: { value: 'http://www.w3.org/ns/shacl#in' },
        subject: { value: 'n3-112' }
      },
      {
        object: { value: 'Validation of laneTypes failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-112' }
      },
      {
        object: { value: 'laneTypes' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-112' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-112' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/laneTypes' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-112' }
      },
      {
        object: { value: 'n3-112' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape' }
      },
      {
        object: { value: 'trees, street lamps, road patches...' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-130' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#string' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-130' }
      },
      {
        object: { value: 'Covered object classes, see ODR spec section 11' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-130' }
      },
      {
        object: { value: 'barrier' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-131' }
      },
      {
        object: { value: 'n3-132' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-131' }
      },
      {
        object: { value: 'bike' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-132' }
      },
      {
        object: { value: 'n3-133' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-132' }
      },
      {
        object: { value: 'building' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-133' }
      },
      {
        object: { value: 'n3-134' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-133' }
      },
      {
        object: { value: 'bus' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-134' }
      },
      {
        object: { value: 'n3-135' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-134' }
      },
      {
        object: { value: 'car' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-135' }
      },
      {
        object: { value: 'n3-136' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-135' }
      },
      {
        object: { value: 'crosswalk' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-136' }
      },
      {
        object: { value: 'n3-137' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-136' }
      },
      {
        object: { value: 'gantry' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-137' }
      },
      {
        object: { value: 'n3-138' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-137' }
      },
      {
        object: { value: 'motorbike' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-138' }
      },
      {
        object: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-138' }
      },
      {
        object: { value: 'n3-131' },
        predicate: { value: 'http://www.w3.org/ns/shacl#in' },
        subject: { value: 'n3-130' }
      },
      {
        object: { value: 'Validation of levelOfDetail failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-130' }
      },
      {
        object: { value: 'levelOfDetail' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-130' }
      },
      {
        object: { value: '2' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-130' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/levelOfDetail' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-130' }
      },
      {
        object: { value: 'n3-130' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape' }
      },
      {
        object: { value: 'right-hand traffic' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#string' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: 'Traffic direction, i.e. right-hand or left-hand traffic' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: 'left-hand' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-140' }
      },
      {
        object: { value: 'n3-141' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-140' }
      },
      {
        object: { value: 'right-hand' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-141' }
      },
      {
        object: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-141' }
      },
      {
        object: { value: 'n3-140' },
        predicate: { value: 'http://www.w3.org/ns/shacl#in' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: 'Validation of trafficDirection failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: 'trafficDirection' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: '3' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/trafficDirection' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-139' }
      },
      {
        object: { value: 'n3-139' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Content' },
        predicate: { value: 'http://www.w3.org/ns/shacl#targetClass' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/ContentShape' }
      },
      {
        object: { value: 'http://www.w3.org/ns/shacl#NodeShape' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape' }
      },
      {
        object: { value: '3DMS system, Trimble xyz, Riegl xyz' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-142' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#string' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-142' }
      },
      {
        object: { value: 'Main acquisition device' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-142' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-142' }
      },
      {
        object: { value: 'Validation of measurementSystem failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-142' }
      },
      {
        object: { value: 'measurementSystem' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-142' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-142' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/measurementSystem' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-142' }
      },
      {
        object: { value: 'n3-142' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape' }
      },
      {
        object: { value: 'scanner, camera, osm network, aerial images, ...' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-143' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#string' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-143' }
      },
      {
        object: { value: 'Basic data for the creation of the map' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-143' }
      },
      {
        object: { value: 'Validation of usedDataSources failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-143' }
      },
      {
        object: { value: 'usedDataSources' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-143' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-143' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/usedDataSources' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-143' }
      },
      {
        object: { value: 'n3-143' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSource' },
        predicate: { value: 'http://www.w3.org/ns/shacl#targetClass' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/DataSourceShape' }
      },
      {
        object: { value: 'http://www.w3.org/ns/shacl#NodeShape' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape' }
      },
      {
        object: { value: '1.5' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-144' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#string' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-144' }
      },
      {
        object: { value: 'Version of data format' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-144' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-144' }
      },
      {
        object: { value: 'Validation of version failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-144' }
      },
      {
        object: { value: 'version' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-144' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-144' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/version' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-144' }
      },
      {
        object: { value: 'n3-144' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape' }
      },
      {
        object: { value: 'ASAM OpenDRIVE  Road5 Lanelet road2sim roadXML Shape' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#string' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: 'Format type definition' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: 'ASAM OpenDRIVE' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-146' }
      },
      {
        object: { value: 'n3-147' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-146' }
      },
      {
        object: { value: 'Lanelet' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-147' }
      },
      {
        object: { value: 'n3-148' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-147' }
      },
      {
        object: { value: 'Road5' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-148' }
      },
      {
        object: { value: 'n3-149' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-148' }
      },
      {
        object: { value: 'Shape' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-149' }
      },
      {
        object: { value: 'n3-150' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-149' }
      },
      {
        object: { value: 'road2sim' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-150' }
      },
      {
        object: { value: 'n3-151' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-150' }
      },
      {
        object: { value: 'roadXML' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#first' },
        subject: { value: 'n3-151' }
      },
      {
        object: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#nil' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#rest' },
        subject: { value: 'n3-151' }
      },
      {
        object: { value: 'n3-146' },
        predicate: { value: 'http://www.w3.org/ns/shacl#in' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: 'Validation of type failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: 'type' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/formatType' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-145' }
      },
      {
        object: { value: 'n3-145' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Format' },
        predicate: { value: 'http://www.w3.org/ns/shacl#targetClass' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/FormatShape' }
      },
      {
        object: { value: 'http://www.w3.org/ns/shacl#NodeShape' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape' }
      },
      {
        object: { value: '0.1' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#float' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: 'Accuracy of traffic relevant objects, signs and signals' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: 'Validation of accuracySignals failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: 'accuracySignals' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: '3' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracySignals' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-152' }
      },
      {
        object: { value: 'n3-152' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape' }
      },
      {
        object: { value: '0.1' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#float' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: 'Accuracy of objects in the traffic space, which do not directly affect the traffic' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: 'Validation of accuracyObjects failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: 'accuracyObjects' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: '4' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyObjects' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-153' }
      },
      {
        object: { value: 'n3-153' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape' }
      },
      {
        object: { value: '0.1' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#float' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: 'Accuracy lane modell height' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: 'Validation of accuracyLaneModelHeight failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: 'accuracyLaneModelHeight' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: '2' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyLaneModelHeight' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-154' }
      },
      {
        object: { value: 'n3-154' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape' }
      },
      {
        object: { value: '0.01' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#float' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: 'Precision of measured road network (relative accuracy)' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: 'Validation of precision failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: 'precision' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/precision' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-155' }
      },
      {
        object: { value: 'n3-155' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape' }
      },
      {
        object: { value: '0.1' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#float' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: 'Accuracy of lane modell 2d' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: 'Validation of accuracyLaneModel2d failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: 'accuracyLaneModel2d' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/accuracyLaneModel2d' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-156' }
      },
      {
        object: { value: 'n3-156' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quality' },
        predicate: { value: 'http://www.w3.org/ns/shacl#targetClass' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QualityShape' }
      },
      {
        object: { value: 'http://www.w3.org/ns/shacl#NodeShape' },
        predicate: { value: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '5' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-157' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#unsignedInt' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-157' }
      },
      {
        object: { value: 'Sum of all junctions defined in the map,  see ODR spec section 10' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-157' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-157' }
      },
      {
        object: { value: 'Validation of numberIntersections failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-157' }
      },
      {
        object: { value: 'numberIntersections' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-157' }
      },
      {
        object: { value: '2' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-157' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberIntersections' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-157' }
      },
      {
        object: { value: 'n3-157' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-158' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#unsignedInt' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-158' }
      },
      {
        object: { value: 'Sum of all traffic lights defined in the map,  see ODR spec section 12' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-158' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-158' }
      },
      {
        object: { value: 'Validation of numberTrafficLights failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-158' }
      },
      {
        object: { value: 'numberTrafficLights' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-158' }
      },
      {
        object: { value: '3' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-158' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberTrafficLights' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-158' }
      },
      {
        object: { value: 'n3-158' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '20' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#float' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: 'How wide is the area beyond the traffic space modeled' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: 'Validation of rangeOfModeling failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#minCount' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: 'rangeOfModeling' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: '8' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/rangeOfModeling' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-159' }
      },
      {
        object: { value: 'n3-159' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '100' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-160' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#unsignedInt' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-160' }
      },
      {
        object: { value: 'Sum of all objects outlines in the map,  see ODR spec section 11.2' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-160' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-160' }
      },
      {
        object: { value: 'Validation of numberOutlines failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-160' }
      },
      {
        object: { value: 'numberOutlines' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-160' }
      },
      {
        object: { value: '6' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-160' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberOutlines' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-160' }
      },
      {
        object: { value: 'n3-160' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '[10,50] km/h' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-161' }
      },
      {
        object: { value: 'Range of speed limits defined in the map, see ODR spec section 9.5.5. ' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-161' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-161' }
      },
      {
        object: { value: 'Validation of speedLimit failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-161' }
      },
      {
        object: { value: 'speedLimit' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-161' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/Range2DShape' },
        predicate: { value: 'http://www.w3.org/ns/shacl#node' },
        subject: { value: 'n3-161' }
      },
      {
        object: { value: '7' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-161' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/speedLimit' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-161' }
      },
      {
        object: { value: 'n3-161' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '40.0' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-162' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#float' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-162' }
      },
      {
        object: { value: 'Road network length in km, sum over road length; see ODR spec section 8' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-162' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-162' }
      },
      {
        object: { value: 'Validation of length failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-162' }
      },
      {
        object: { value: 'length' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-162' }
      },
      {
        object: { value: '0' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-162' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/length' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-162' }
      },
      {
        object: { value: 'n3-162' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '2.22' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-163' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#float' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-163' }
      },
      {
        object: { value: 'Difference of max and mit elevation, extraction from openDrive Element t_road_elevationprofile_elevation, see section 8.4' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-163' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-163' }
      },
      {
        object: { value: 'Validation of elevationRange failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-163' }
      },
      {
        object: { value: 'elevationRange' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-163' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-163' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/elevationRange' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-163' }
      },
      {
        object: { value: 'n3-163' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '200' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-164' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#unsignedInt' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-164' }
      },
      {
        object: { value: 'Sum of all objects in the map,  see ODR spec section 11' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-164' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-164' }
      },
      {
        object: { value: 'Validation of numberObjects failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-164' }
      },
      {
        object: { value: 'numberObjects' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-164' }
      },
      {
        object: { value: '5' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-164' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberObjects' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-164' }
      },
      {
        object: { value: 'n3-164' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: '155' },
        predicate: { value: 'http://www.w3.org/2004/02/skos/core#example' },
        subject: { value: 'n3-165' }
      },
      {
        object: { value: 'http://www.w3.org/2001/XMLSchema#unsignedInt' },
        predicate: { value: 'http://www.w3.org/ns/shacl#datatype' },
        subject: { value: 'n3-165' }
      },
      {
        object: { value: 'Sum of all traffic signs in the map,  see ODR spec section 12' },
        predicate: { value: 'http://www.w3.org/ns/shacl#description' },
        subject: { value: 'n3-165' }
      },
      {
        object: { value: '1' },
        predicate: { value: 'http://www.w3.org/ns/shacl#maxCount' },
        subject: { value: 'n3-165' }
      },
      {
        object: { value: 'Validation of numberTrafficSigns failed!' },
        predicate: { value: 'http://www.w3.org/ns/shacl#message' },
        subject: { value: 'n3-165' }
      },
      {
        object: { value: 'numberTrafficSigns' },
        predicate: { value: 'http://www.w3.org/ns/shacl#name' },
        subject: { value: 'n3-165' }
      },
      {
        object: { value: '4' },
        predicate: { value: 'http://www.w3.org/ns/shacl#order' },
        subject: { value: 'n3-165' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/numberTrafficSigns' },
        predicate: { value: 'http://www.w3.org/ns/shacl#path' },
        subject: { value: 'n3-165' }
      },
      {
        object: { value: 'n3-165' },
        predicate: { value: 'http://www.w3.org/ns/shacl#property' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      },
      {
        object: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/Quantity' },
        predicate: { value: 'http://www.w3.org/ns/shacl#targetClass' },
        subject: { value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/QuantityShape' }
      }
    ] as unknown as Quad[];
    const expected = [
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

    const result = createShapeObjects(shaclShapeId, quads);
    expect(result).toEqual(expected);
  })
})
