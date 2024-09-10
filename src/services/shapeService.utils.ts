import * as N3 from 'n3';
import { Quad } from 'n3';

import { ShapesAndOntologiesInput } from '../types/ontologies.model';
import { PropertyValue, Shape } from '../types/shapes.model';

import { fetchAllSchemas, getSchemaById } from './schemaApiService';

// -----------------------------------------------------------------------------

export const fetchAllShapesFromSchemas = async (schemas: ShapesAndOntologiesInput): Promise<Shape[]> => {
  const shapeArrayPromises = schemas.shapes.map(async id => fetchShapeById(id));
  const shapeArrays = await Promise.all(shapeArrayPromises);
  return shapeArrays.flat();
}

const fetchShapeById = async (shapeId: string) => {
  return getSchemaById(shapeId)
    .then(schema => parseSingleShape(schema))
    .then(quads => {
      const shapes = createShapeObjects(shapeId, quads)
      console.debug('shapes', shapes)

      // const nodes = getNodes(quads);
      // console.debug('nodes', nodes);
      // console.debug('-----------------------------------------------------------')
      return shapes;
    })
    .catch(error => {
      throw error
    })
}

// TODO: It is not optimal to fetch everything again.
export const getShapeByName = async (name: string): Promise<Shape | undefined> => {
  const schemas = await fetchAllSchemas();
  const allShapes = await fetchAllShapesFromSchemas(schemas);
  return allShapes ? allShapes.find(shape => shape.subject === name) : undefined;
}

// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------

const PARAM_PATH_TYPE = 'http://www.w3.org/ns/shacl#path';

const PARAMETER_TYPES = [
  'http://www.w3.org/ns/shacl#name',
  'http://www.w3.org/ns/shacl#description',
  'http://www.w3.org/2004/02/skos/core#example',
  'http://www.w3.org/ns/shacl#datatype',
  'http://www.w3.org/ns/shacl#in',
  'http://www.w3.org/ns/shacl#maxCount',
  'http://www.w3.org/ns/shacl#message',
  'http://www.w3.org/ns/shacl#minCount',
  'http://www.w3.org/ns/shacl#node',
  'http://www.w3.org/ns/shacl#order',
  'http://www.w3.org/ns/shacl#path',
];

type ListItem = {
  value: string;
  next: string;
};

type Parameter = {
  name: string,
  value: string,
}

const isLinkedListValue = (quad: Quad) => (quad.predicate.value === 'ww.w3.org/1999/02/22-rdf-syntax-ns#first')

const isLinkedListNextItem = (quad: Quad) => (quad.predicate.value === 'www.w3.org/1999/02/22-rdf-syntax-ns#rest')

const isParameter = (quad: Quad) => (
  PARAMETER_TYPES.includes(quad.predicate.value)
);

const isNodeParameter = (quad: Quad) => (quad.predicate.value === 'http://www.w3.org/ns/shacl#node');

const isProperty = (quad: Quad) => (quad.predicate.value === 'http://www.w3.org/ns/shacl#property');

const isTargetClass = (quad: Quad) => (quad.predicate.value === 'http://www.w3.org/ns/shacl#targetClass');

const isShape = (quad: Quad) => (
  quad.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
    && quad.object.value === 'http://www.w3.org/ns/shacl#NodeShape'
);

const getClassname = (shapeId: string, shapeTargetClasses?: string[]) => {
  if (!shapeTargetClasses || !shapeTargetClasses.length) {
    console.error(`The shape '${shapeId}' does not have any targetClasses!`);
    return '';
  }
  return shapeTargetClasses[0];
}

const getShortSubject = (targetClass: string) =>
  targetClass.includes('#')
    ? targetClass.split('#').pop()!
    : targetClass.split('/').pop()
        || targetClass

const getPropertyValues = (propertyId: string, parameters: Map<string, Parameter[]>) => {
  const propertyParameters = parameters.get(propertyId) || [];
  const params = propertyParameters.map(parameter => ({
    type: parameter.name,
    value: parameter.value,
  } as PropertyValue));

  return params.sort((a, b) => {
    const indexA = PARAMETER_TYPES.indexOf(a.type);
    const indexB = PARAMETER_TYPES.indexOf(b.type);
    return indexA - indexB;
  });
}

const getShapeProperties = (shapeId: string, propertyIds: Map<string, string[]>, parameters: Map<string, Parameter[]>) => {
  const shapePropertyIds = propertyIds.get(shapeId) || [];
  return shapePropertyIds.map(propertyId => {
    const propertyValues = getPropertyValues(propertyId, parameters);
    const propertyPath = propertyValues.find(prop => prop.type === PARAM_PATH_TYPE);

    return {
      propertyId: propertyPath ? propertyPath.value : propertyId,
      propertyValues
    }
  });
}

const getNodes = (shapeId: string, propertyIds: Map<string, string[]>, nodeIds: Map<string, string>): string[] => {
  const shapeProperties = propertyIds.get(shapeId) || [];
  return shapeProperties
    .map(propertyId => nodeIds.get(propertyId))
    .filter(nodeId => nodeId !== undefined) as string[];
}

export const createShapeObjects = (shaclShapeId: string, quads: Quad[]): Shape[] => {
  const linkedListValues = new Map<string, ListItem>();
  const parameters = new Map<string, Parameter[]>();
  const nodeIds = new Map<string, string>();
  const propertyIds = new Map<string, string[]>();
  const targetClasses = new Map<string, string[]>();
  const shapeIds = [] as string[];

  quads.forEach(quad => {
    if (isLinkedListValue(quad)) {
      const itemId = quad.subject.value;
      const listItem = linkedListValues.get(itemId) || {};
      linkedListValues.set(itemId, { ...listItem, value: quad.object.value } as ListItem)
    }

    if (isLinkedListNextItem(quad)) {
      const id = quad.subject.value;
      const listItem = linkedListValues.get(id) || {};
      linkedListValues.set(id, { ...listItem, next: quad.object.value } as ListItem)
    }

    if (isParameter(quad)) {
      const propertyId = quad.subject.value;
      const propertyParameters = parameters.get(propertyId) || [] as Parameter[];
      const name = quad.predicate.value;
      const value = quad.object.value;
      propertyParameters.push({ name, value } as Parameter);
      parameters.set(propertyId, propertyParameters)
    }

    if (isNodeParameter(quad)) {
      const propertyId = quad.subject.value;
      const nodeId = quad.object.value;
      nodeIds.set(propertyId, nodeId);
    }

    if (isProperty(quad)) {
      const shapeId = quad.subject.value;
      const propertyId = quad.object.value;
      const shapeProperties = propertyIds.get(shapeId) || [];
      shapeProperties.push(propertyId);
      propertyIds.set(shapeId, shapeProperties);
    }

    if (isTargetClass(quad)) {
      const shapeId = quad.subject.value;
      const shapeTargetClasses = targetClasses.get(shapeId) || [] as string[];
      const targetClass = quad.object.value;
      shapeTargetClasses.push(targetClass);
      targetClasses.set(shapeId, shapeTargetClasses);
    }

    if (isShape(quad)) {
      const shapeId = quad.subject.value;
      shapeIds.push(shapeId);
    }
  })

  return shapeIds.map(shapeId => {
    const shapeTargetClasses = targetClasses.get(shapeId) || [];
    const classname = getClassname(shapeId, shapeTargetClasses);
    const shortSubject = getShortSubject(classname);
    const properties = getShapeProperties(shapeId, propertyIds, parameters);
    const nodes = getNodes(shapeId, propertyIds, nodeIds);

    const shape: Shape = {
      shaclShapeId,
      subject: shapeId,
      classname,
      shortSubject,
      properties,
      nodes,
      targetClasses: shapeTargetClasses,
    }

    return shape;
  })
}
