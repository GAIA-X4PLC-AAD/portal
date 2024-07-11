import { AxiosResponse } from 'axios';
import * as N3 from 'n3';

import { AuthContextType } from '../context/AuthContextProvider';
import { Ontology, ShapesAndOntologiesInput } from '../types/shapesAndOntologies.model';

import { getSchemaById, getSchemasByIds } from './SchemaApiService';

export const fetchOntologies = async (authContext: AuthContextType, response: AxiosResponse<any, any>) => {
  const ontologiesStringArray = mapOntologies(response);
  const promises = getSchemasByIds(authContext, ontologiesStringArray);
  const promiseAll = await Promise.all(promises);
  const parsedOntologies = await parseOntologies(promiseAll);
  return createAllOntologyObjects(parsedOntologies);
}

export const mapOntologies = (response: ShapesAndOntologiesInput): string[] => {
  return response.ontologies.map((ontology) => ontology);
}

export const parseSingleOntology = (item: string): any[] => {
  const parser = new N3.Parser();
  const quads: any[] = [];
  parser.parse(item,
    (error, quad) => {
      if (quad) {
        quads.push(quad);
      }
    });
  return quads;
}

export const parseOntologies = (items: string[]): any[] => {
  return items.map(parseSingleOntology);
}

export const createAllOntologyObjects = (data: any[]): Ontology[] => {
  return data.map((item) => {
    return createOntologyObject(item);
  });
}

export const createOntologyObject = (quads: any[]): Ontology => {
  const firstSubject = quads.length > 0 ? quads[0]._subject.id : 'No subject available!';
  const nodes: { id: string; label: string; type: string }[] = [];
  const links: { source: string; target: string }[] = [];

  let subject = firstSubject;
  let contributors: string[] = [];
  let description = 'No description available!';
  let version = 'No version available!';

  // Create a map to keep track of the types of each subject
  let typesMap: { [key: string]: string } = {};

  quads.forEach(quad => {
    const subjectId = quad._subject.id;
    const predicateId = quad._predicate.id;
    const objectId = quad._object.id;

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
    nodes,
    links
  };
};

export const getOntologyById = async (authContext: AuthContextType, id: string) => {
  const response = await getSchemaById(authContext, id);
  const parsedOntology = await parseSingleOntology(response);
  return createOntologyObject(parsedOntology);
}
