import * as N3 from 'n3';
import { Quad } from 'n3';

import { ShapesAndOntologiesInput } from '../types/ontologies.model';
import { Shape, ShapeProperty } from '../types/shapes.model';

import { fetchAllSchemas, getSchemaById } from './SchemaApiService';

export const fetchAllShapesFromSchemas = async (schemas: ShapesAndOntologiesInput): Promise<Shape[]> => {
  const shapeArrayPromises = schemas.shapes.map(async id => fetchShapeById(id));
  const shapeArrays = await Promise.all(shapeArrayPromises);
  return shapeArrays.flat();
}

const fetchShapeById = async (shapeId: string) => {
  return getSchemaById(shapeId)
    .then(schema => parseSingleShape(schema))
    .then(quads => createShapeObjects(shapeId, quads))
    .catch(error => {
      throw error
    })
}
export const parseSingleShape = (item: string): Promise<Quad[]> => {
  return new Promise((resolve, reject) => {
    const parser = new N3.Parser();
    const quads: Quad[] = [];
    parser.parse(item, (error, quad) => {
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

export const createShapeObjects = (shaclShapeId: string, quads: Quad[]): Shape[] => {
  const shapesMap = new Map<string, Shape>();
  const propertiesMap = new Map<string, ShapeProperty[]>();
  const nodesMap = new Map<string, string[]>();

  const RDF_TYPE: string = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
  const SHACL_NODE_SHAPE: string = 'http://www.w3.org/ns/shacl#NodeShape';
  const SHACL_TARGET_CLASS: string = 'http://www.w3.org/ns/shacl#targetClass';
  const SHACL_PROPERTY: string = 'http://www.w3.org/ns/shacl#property';
  const SHACL_NODE: string = 'http://www.w3.org/ns/shacl#node';

  quads.forEach(quad => {
    const subject = quad.subject.value;
    const predicate = quad.predicate.value;
    const object = quad.object.value;

    const isShapeType = predicate === RDF_TYPE && object === SHACL_NODE_SHAPE;
    const isTargetClass = predicate === SHACL_TARGET_CLASS;
    const isProperty = predicate === SHACL_PROPERTY;

    if (isShapeType || isTargetClass || isProperty) {
      if (!shapesMap.has(subject)) {
        shapesMap.set(subject, {
          shaclShapeId,
          subject,
          shortSubject: '',
          classname: '',
          propertyIds: [],
          properties: [],
          targetClasses: [],
          nodes: [],
        });
      }

      const shape = shapesMap.get(subject)!;

      if (isProperty) {
        shape.propertyIds.push(object);
      } else {
        shape.shortSubject = object.includes('#') ? object.split('#').pop() || object : object.split('/').pop() || object;
        shape.classname = object;
      }

      if (isTargetClass) {
        shape.targetClasses.push(object);
      }

    } else {
      if (!propertiesMap.has(subject)) {
        propertiesMap.set(subject, []);
      }

      const properties = propertiesMap.get(subject)!;
      const existingProperty = properties.find(prop => prop.propertyId === subject);

      if (existingProperty) {
        existingProperty.propertyValues.push({ type: predicate, value: object });
      } else {
        properties.push({ propertyId: subject, propertyValues: [{ type: predicate, value: object }] });
      }

      if (!nodesMap.has(subject)) {
        nodesMap.set(subject, []);
      }

      if (predicate === SHACL_NODE) {
        nodesMap.get(subject)!.push(object);
      }
    }
  });

  propertiesMap.forEach(properties => {
    properties.forEach(property => {
      property.propertyValues.sort((a, b) => {
        if (a.type === 'http://www.w3.org/ns/shacl#name') {return -1;}
        if (b.type === 'http://www.w3.org/ns/shacl#name') {return 1;}
        if (a.type === 'http://www.w3.org/ns/shacl#description') {return -1;}
        if (b.type === 'http://www.w3.org/ns/shacl#description') {return 1;}
        return a.type.localeCompare(b.type);
      });
    });
  })

  shapesMap.forEach(shape => {
    shape.propertyIds.forEach(propertyId => {
      shape.properties.push(...(propertiesMap.get(propertyId) || []));
      shape.nodes.push(...(nodesMap.get(propertyId) || []));
    });
  });

  return Array.from(shapesMap.values());
};

export const getShapeByName = async (name: string): Promise<Shape | undefined> => {
  const schemas = await fetchAllSchemas();
  const allShapes = await fetchAllShapesFromSchemas(schemas);
  return allShapes ? allShapes.find(shape => shape.subject === name) : undefined;
}

export const findRelatedShapes = (shapes: Shape[], ontologyId: string): Shape[] => {
  return shapes.filter(
    shape => shape.targetClasses.some(
      targetClasses => targetClasses.includes(ontologyId)));
}
