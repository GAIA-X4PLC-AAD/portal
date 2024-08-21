import * as N3 from 'n3';
import { Quad } from 'n3';

import { Ontology } from '../types/ontologies.model';
import { Shape } from '../types/shapes.model';

import { getSchemaById } from './SchemaApiService';
import { getRelatedShapes } from './shapeService.utils';

export const fetchOntologies = async (ontologiesStringArray: string[]) => {
  const promises = ontologiesStringArray.map(async id => {
    const relatedShapes = await getRelatedShapes(id);
    const promise = await getSchemaById(id);
    const parsedOntology = await parseSingleOntology(promise);
    return createOntologyObject(parsedOntology, relatedShapes);
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
  console.log(quads);
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

    if (predicateId === 'http://www.w3.org/2000/01/rdf-schema#label' || predicateId ==='http://www.w3.org/2002/07/owl#ObjectProperty') {
      nodes.push({ id: subjectId, label: objectId, type: typesMap[subjectId] || 'Unknown' });
    } else if (predicateId === 'http://www.w3.org/2000/01/rdf-schema#subClassOf' || predicateId ==='http://www.w3.org/2000/01/rdf-schema#domain' || predicateId ==='http://www.w3.org/2000/01/rdf-schema#range') {
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

export const getOntologyById = async (id: string) => {
  const relatedShapes = await getRelatedShapes(id);
  const response = await getSchemaById(id);
  const parsedOntology = await parseSingleOntology(response);
  return createOntologyObject(parsedOntology, relatedShapes);
}
