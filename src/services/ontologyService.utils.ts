import * as N3 from 'n3';
import { Quad } from 'n3';

import { Link, Node, Ontology, ShapesAndOntologiesInput } from '../types/ontologies.model';
import { Shape } from '../types/shapes.model';

import { getSchemaById } from './schemaApiService';
import { findRelatedShapes } from './shapeService.utils';

export const fetchAllOntologiesFromSchemas = async (schemas: ShapesAndOntologiesInput, shapes: Shape[]) => {
  return Promise.all(
    schemas.ontologies.map(
      async id => fetchOntologyById(shapes, id)));
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

export const getUniqueNodes = (ontologies: Ontology[], nodeFilter: (node: Node) => boolean): Node[] => {
  const uniqueNodes = new Map(ontologies
    .map(ontology => ontology.nodes)
    .flat()
    .filter(nodeFilter)
    .map((node: Node) => [node.id, node] as [string, Node]));

  return Array.from(uniqueNodes.values());
}

export function getUniqueLinks(ontologies: Ontology[], uniqueNode: Node[]) {
  const uniqueLinks = new Map(ontologies
    .map(ontology => ontology.links)
    .flat()
    .filter(link => uniqueNode.some(uniqueNode => uniqueNode.id === link.source))
    .filter(link => uniqueNode.some(uniqueNode => uniqueNode.id === link.target))
    .map(link => [link.source + link.target, link] as [string, Link]))

  return Array.from(uniqueLinks.values());
}

export function getResourceTypes(links: Link[], shapes: Shape[]) {
  return links
    .filter(link => link.target.endsWith('DataResource'))
    .map(link => findRelatedShapes(shapes, link.source))
    .flat()
    .map(shape => ({ id: shape.subject, label: shape.shortSubject }));
}
