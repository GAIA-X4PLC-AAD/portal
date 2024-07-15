import * as N3 from 'n3';
import { Quad } from 'n3';

import { Ontology, Shape } from '../types/shapesAndOntologies.model';

import { getAllShapes, getSchemaById } from './SchemaApiService';

export const fetchOntologies = async (ontologiesStringArray: string[]) => {
  const promises = ontologiesStringArray.map(async id => {
    const promise = await getSchemaById(id);
    const parsedOntology = await parseSingleOntology(promise);
    return createOntologyObject(parsedOntology);
  });

  return await Promise.all(promises);
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

export const createOntologyObject = (quads: Quad[], shapes?: Shape[]): Ontology => {
  const firstSubject = quads.length > 0 ? quads[0].subject.id : 'No subject available!';
  const nodes: { id: string; label: string; type: string }[] = [];
  const links: { source: string; target: string }[] = [];
  const namespace: string = firstSubject.substring(0, firstSubject.lastIndexOf('/')+1);
  const relatedShapes: Shape[] = [];

  if (shapes && firstSubject != 'No subject available!') {
    const shapesToPush: Shape[] = shapes.filter(shape => shape.subject.startsWith(namespace));
    relatedShapes.push(...shapesToPush);
  }

  let subject = firstSubject;
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
      typesMap[subjectId] = objectId;
    }

    if (predicateId === 'http://www.w3.org/2000/01/rdf-schema#label') {
      nodes.push({ id: subjectId, label: objectId, type: typesMap[subjectId] || 'Unknown' });
    } else if (predicateId === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
      links.push({ source: subjectId, target: objectId });
    }

    // get the ontology information
    if (subjectId === firstSubject) {
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
    namespace,
    relatedShapes,
    nodes,
    links
  };
};

export const getOntologyById = async (id: string) => {
  const shapes = await getAllShapes();
  const response = await getSchemaById(id);
  const parsedOntology = await parseSingleOntology(response);
  return createOntologyObject(parsedOntology, shapes);
}
