import * as N3 from 'n3';
import { Quad } from 'n3';

import { ShaclShape } from '../types/shaclShape.model';
import { ShapeProperty } from '../types/shapeProperty.model';

import { getSchemaById } from './SchemaApiService';

// Hauptfunktion zum Abrufen der Shapes
export const fetchShapes = async (shapesStringArray: string[]): Promise<ShaclShape[]> => {
  const promises = shapesStringArray.map(async id => {
    const schema = await getSchemaById(id);
    const parsedQuads = await parseSingleShape(schema);
    return createShapeObjects(id, parsedQuads);
  });

  const shapesArrays = await Promise.all(promises);
  return shapesArrays.flat();
}

// Funktion zum Parsen der Quads
export const parseSingleShape = (item: string): Promise<Quad[]> => {
  return new Promise((resolve, reject) => {
    const parser = new N3.Parser();
    const quads: Quad[] = [];
    parser.parse(item, (error, quad, prefixes) => {
      if (error) {
        reject(error);
      } else if (quad) {
        quads.push(quad);
      } else {
        resolve(quads);
      }
    });
  });
}

// Funktion zum Erstellen der Shape-Objekte
export const createShapeObjects = (id: string, quads: Quad[]): ShaclShape[] => {
  const shapesMap: { [key: string]: ShaclShape } = {};
  const propertiesMap: { [key: string]: { [key: string]: ShapeProperty } } = {};

  quads.forEach(quad => {
    const subjectId = quad.subject.value;
    const predicateId = quad.predicate.value;
    const objectId = quad.object.value;

    // Shape-Typ prüfen
    if (predicateId === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && objectId === 'http://www.w3.org/ns/shacl#NodeShape') {
      if (!shapesMap[subjectId]) {
        shapesMap[subjectId] = {
          shape: id,
          short_shape: '',
          properties: []
        };
      }
    }

    // Target Class verarbeiten
    if (predicateId === 'http://www.w3.org/ns/shacl#targetClass') {
      if (!shapesMap[subjectId]) {
        shapesMap[subjectId] = {
          shape: id,
          short_shape: '',
          properties: []
        };
      }
      shapesMap[subjectId].short_shape = objectId.includes('#') ? objectId.split('#').pop() || objectId : objectId.split('/').pop() || objectId;
    }

    // Property verarbeiten
    if (predicateId === 'http://www.w3.org/ns/shacl#property') {
      if (!propertiesMap[subjectId]) {
        propertiesMap[subjectId] = {};
      }
      propertiesMap[subjectId][objectId] = { path: '' };
    }

    // Property Attribute verarbeiten
    if (propertiesMap[subjectId] && propertiesMap[subjectId][objectId]) {
      switch (predicateId) {
      case 'http://www.w3.org/ns/shacl#path':
        propertiesMap[subjectId][objectId].path = objectId;
        break;
      case 'http://www.w3.org/ns/shacl#name':
        propertiesMap[subjectId][objectId].name = objectId;
        break;
      case 'http://www.w3.org/ns/shacl#description':
        propertiesMap[subjectId][objectId].description = objectId;
        break;
      case 'http://www.w3.org/ns/shacl#message':
        propertiesMap[subjectId][objectId].message = objectId;
        break;
      case 'http://www.w3.org/ns/shacl#minCount':
        propertiesMap[subjectId][objectId].minCount = parseInt(objectId, 10);
        break;
      case 'http://www.w3.org/ns/shacl#maxCount':
        propertiesMap[subjectId][objectId].maxCount = parseInt(objectId, 10);
        break;
      case 'http://www.w3.org/ns/shacl#datatype':
        propertiesMap[subjectId][objectId].datatype = objectId;
        break;
      default:
      }
    }
  });

  // Zuordnung der Properties zu den Shapes
  Object.keys(propertiesMap).forEach(shapeId => {
    const shape = shapesMap[shapeId];
    if (shape) {
      shape.properties = Object.values(propertiesMap[shapeId]);
    }
  });

  return Object.values(shapesMap);
}

// Funktion zum Abrufen einer Shape nach ID
export const getShapeById = async (id: string): Promise<ShaclShape[]> => {
  const response = await getSchemaById(id);
  const parsedQuads = await parseSingleShape(response);
  return createShapeObjects(id, parsedQuads);
}
