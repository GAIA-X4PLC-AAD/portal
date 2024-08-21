import * as N3 from 'n3';
import { Quad } from 'n3';

import { Ontology, ShapesAndOntologiesInput } from '../types/ontologies.model';
import { Shape } from '../types/shapes.model';

import { getSchemaById } from './SchemaApiService';
import { fetchAllShapesFromSchemas, findRelatedShapes } from './shapeService.utils';

export const fetchAllOntologiesFromSchemas = async (schemas: ShapesAndOntologiesInput) => {
  const allShapes = await fetchAllShapesFromSchemas(schemas);
  return Promise.all(
    schemas.ontologies.map(
      async id => fetchOntologyById(allShapes, id)));
}

export const parseSingleOntology = (item: string) => {
  const parser = new N3.Parser();
  const quads: Quad[] = [];
  parser.parse(item,
    (error, quad) => {
      if (quad) {
        quads.push(quad);
      }
    });
  return quads;
}

export const createOntologyObject = (quads: Quad[], relatedShapes: Shape[]): Ontology => {
  const nodes: { id: string; label: string; type: string }[] = [];
  const links: { source: string; target: string }[] = [];

  let subject = 'No subject available!';
  let contributors: string[] = [];
  let description = 'No description available!';
  let version = 'No version available!';

  // Create a map to keep track of the types of each subject
  let typesMap: { [key: string]: string } = {};
  quads.forEach(quad => {
    const subjectId = quad.subject.id;
    const predicateId = quad.predicate.id;
    const objectId = quad.object.id;

    // Track types of subjects
    if (predicateId === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
      //owl#Ontology is the overall subject of the ontology
      if (objectId === 'http://www.w3.org/2002/07/owl#Ontology') {
        subject = subjectId;
      }
      typesMap[subjectId] = objectId;
    }

    if (predicateId === 'http://www.w3.org/2000/01/rdf-schema#label' || predicateId === 'http://www.w3.org/2002/07/owl#ObjectProperty') {
      nodes.push({ id: subjectId, label: objectId, type: typesMap[subjectId] || 'Unknown' });
    } else if (predicateId === 'http://www.w3.org/2000/01/rdf-schema#subClassOf' || predicateId === 'http://www.w3.org/2000/01/rdf-schema#domain' || predicateId === 'http://www.w3.org/2000/01/rdf-schema#range') {
      links.push({ source: subjectId, target: objectId });
    }

    // get the ontology information
    if (subjectId === subject) {
      switch (predicateId) {
      case 'http://purl.org/dc/terms/contributor':
        contributors.push(objectId.replace(/(^"|"$)/g, ''));
        break;
      case 'http://www.w3.org/2000/01/rdf-schema#label':
        description = objectId.replace(/(^"|"$)/g, '').split('"@')[0];
        break;
      case 'http://www.w3.org/2002/07/owl#versionInfo':
        version = objectId.replace(/(^"|"$)/g, '').split('"^^')[0];
        break;
      }
    }
  });

  // Update nodes with type information
  nodes.forEach(node => {
    node.type = typesMap[node.id] || 'Unknown';
  });

  return {
    subject,
    contributors,
    description,
    version,
    nodes,
    links,
    relatedShapes,
  };
};

export const fetchOntologyById = async (shapes: Shape[], id: string) => {
  const relatedShapes = findRelatedShapes(shapes, id);

  return getSchemaById(id)
    .then((schema) => parseSingleOntology(schema))
    .then((parsedQuads) => createOntologyObject(parsedQuads, relatedShapes))
    .catch((error) => {
      throw error
    });
}

