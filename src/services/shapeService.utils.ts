import * as N3 from 'n3';
import { Quad } from 'n3';

import { Shape, ShapeProperty } from '../types/shapes.model';

import { getAllShapes, getSchemaById } from './SchemaApiService';

export const fetchShapes = async (shapesStringArray: string[]): Promise<Shape[]> => {
  // const shapesStringArray2 = ['b8eecadef886515092e38c26abcfc8e826a6bd6cde4cc8e4681e1d82f83f7a89']
  const promises = shapesStringArray.map(async id => {
    const schema = await getSchemaById(id);
    const parsedQuads = await parseSingleShape(schema);
    return createShapeObjects(id, parsedQuads);
  });

  const shapesArrays = await Promise.all(promises);
  return shapesArrays.flat();
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
  const shapesMap: Record<string, Shape> = {};
  const propertiesMap: Record<string, ShapeProperty[]> = {};
  const nodesMap: Record<string, string[]> = {};

  quads.forEach(quad => {
    const subject = quad.subject.value;
    const predicate = quad.predicate.value;
    const object = quad.object.value;

    const isShapeType = predicate === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' && object === 'http://www.w3.org/ns/shacl#NodeShape';
    const isTargetClass = predicate === 'http://www.w3.org/ns/shacl#targetClass';
    const isProperty = predicate === 'http://www.w3.org/ns/shacl#property';

    if (isShapeType || isTargetClass || isProperty) {
      if (!shapesMap[subject]) {
        shapesMap[subject] = {
          shaclShapeId,
          subject,
          shortSubject: '',
          propertyIds: [],
          properties: [],
          targetClasses: [],
          nodes: [],
        };
      }

      if (isProperty) {
        shapesMap[subject].propertyIds.push(object);
      } else {
        shapesMap[subject].shortSubject = object.includes('#') ? object.split('#').pop() || object : object.split('/').pop() || object;
      }

      if (isTargetClass) {
        shapesMap[subject].targetClasses.push(object)
      }

    } else {
      if (!propertiesMap[subject]) {
        propertiesMap[subject] = [];
      }

      const existingProperty = propertiesMap[subject].find(prop => prop.propertyId === subject);
      if (existingProperty) {
        existingProperty.propertyValues.push({ type: predicate, value: object });
      } else {
        propertiesMap[subject].push({ propertyId: subject, propertyValues: [{ type: predicate, value: object }] });
      }

      if (!nodesMap[subject]) {
        nodesMap[subject] = [];
      }

      if (predicate === 'http://www.w3.org/ns/shacl#node') {
        nodesMap[subject].push(object);
      }
    }
  });

  Object.keys(shapesMap).forEach(shapeKey => {
    const shape = shapesMap[shapeKey];

    if (shape.propertyIds) {
      shape.propertyIds.forEach(propertyId => {
        shape.properties.push(...propertiesMap[propertyId]);
        shape.nodes.push(...nodesMap[propertyId]);
      });
    }
  })

  return Object.values(shapesMap);
};

export const getShapeByName = async (name: string): Promise<Shape | undefined> => {
  const allShapes = await getAllShapes();
  return allShapes ? allShapes.find(shape => shape.subject === name) : undefined;
}

export const getRelatedShapes = async (targetClass: string): Promise<Shape[]> => {
  const shapes = await getAllShapes();
  return shapes.filter(shape => shape.targetClasses.some(tc => tc.includes(targetClass)));
}
