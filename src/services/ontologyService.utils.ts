import { AxiosResponse } from 'axios';
import * as N3 from 'n3';

import { AuthContextType } from '../context/AuthContextProvider';
import { Link, Node, Ontology, Shape, ShapesAndOntologiesInput } from '../types/shapesAndOntologies.model';

import { getSchemaById, getSchemasByIds } from './SchemaApiService';

export const fetchOntologies = async (authContext: AuthContextType, response: AxiosResponse<any, any>) => {
  const ontologiesStringArray = mapShapesAndOntologies(response);
  const promises = getSchemasByIds(authContext, ontologiesStringArray);
  const promiseAll = await Promise.all(promises);
  const parsedOntologies = await parseOntologies(promiseAll);
  return createAllOntologyObjects(parsedOntologies);
}

export const mapShapesAndOntologies = (response: ShapesAndOntologiesInput): string[] => {
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
  const nodes: Node[] = [];
  const links: Link[] = [];

  let subject = firstSubject;
  let contributors: string[] = [];
  let description = 'No description available!';
  let version = 'No version available!';
  let shapes: Shape[];

  let shapeMap: { [key: string]: Shape } = {};

  quads.forEach(quad => {
    const subjectId = quad._subject.id;
    const predicateId = quad._predicate.id;
    const objectId = quad._object.id;

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
    } else {
      // get the shape information
      if (!shapeMap[subjectId]) {
        shapeMap[subjectId] = {
          label: '',
          comment: '',
          subClasses: []
        };
      }

      switch (predicateId) {
      case 'http://www.w3.org/2000/01/rdf-schema#label':
        shapeMap[subjectId].label = objectId.replace(/(^"|"$)/g, '').split('"@')[0];
        break;
      case 'http://www.w3.org/2000/01/rdf-schema#comment':
        shapeMap[subjectId].comment = objectId.replace(/(^"|"$)/g, '');
        break;
      case 'http://www.w3.org/2000/01/rdf-schema#subClassOf':
        shapeMap[subjectId].subClasses.push(objectId.replace(/(^"|"$)/g, ''));
        break;
      }
    }

    const subject = quad.subject.value;
    const predicate = quad.predicate.value;
    const object = quad.object.value;

    if (!nodes.find(node => node.id === subject)) {
      nodes.push({ id: subject, group: '1' });
    }
    if (!nodes.find(node => node.id === object)) {
      nodes.push({ id: object, group: '2' });
    }

    links.push({ source: subject, target: object, value: '1' });

  });

  shapes = Object.values(shapeMap).filter(shape => shape.label !== '');

  return {
    subject,
    contributors,
    description,
    version,
    shapes,
    nodes,
    links
  };
};

export const downloadTurtleFile = async (authContext: AuthContextType, id: string) => {
  const response = await getSchemaById(authContext, id);
  const filename = id + '.ttl';
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const getOntologyById = async (authContext: AuthContextType, id: string) => {
  const response = await getSchemaById(authContext, id);
  const parsedOntology = await parseSingleOntology(response);
  return createOntologyObject(parsedOntology);
}
