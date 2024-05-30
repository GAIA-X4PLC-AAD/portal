import { AxiosResponse } from 'axios';
import * as N3 from 'n3';

import { AuthContextValues } from '../context/AuthContextValues';
import { Ontology, Shape, ShapesAndOntologiesInput } from '../types/shapesAndOntologies.model';

import { getSchemasByIds } from './SchemaApiService';

export const fetchOntologies = async (authContext: AuthContextValues, response: AxiosResponse<any, any>) => {
  const ontologiesStringArray = mapShapesAndOntologies(response);
  const promises = getSchemasByIds(authContext, ontologiesStringArray);
  const promiseAll = await Promise.all(promises);
  const parsedOntologies = await parseOntologies(promiseAll);
  return createAllOntologyObjects(parsedOntologies);
}

export const mapShapesAndOntologies = (response: ShapesAndOntologiesInput): string[] => {
  return response.ontologies.map((ontology) => ontology);
}

export const parseOntologies = (response: string[]): any[] => {
  return response.map((item) => {
    const parser = new N3.Parser();
    const parsedItems: any[] = [];
    parser.parse(item,
      (error, quad) => {
        if (quad) {
          parsedItems.push(quad);
        }
      });
    return parsedItems;
  });
}

export const createAllOntologyObjects = (data: any[]): Ontology[] => {
  return data.map((item) => {
    return createOntologyObject(item);
  });
}

export const createOntologyObject = (data: any[]): Ontology => {
  const firstSubject = data.length > 0 ? data[0]._subject.id : 'No subject available!';

  let subject = firstSubject;
  let contributors: string[] = [];
  let description = 'No description available!';
  let version = 'No version available!';
  let shapes: Shape[];

  let shapeMap: { [key: string]: Shape } = {};

  data.forEach(item => {
    const subjectId = item._subject.id;
    const predicateId = item._predicate.id;
    const objectId = item._object.id;

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
  });

  shapes = Object.values(shapeMap).filter(shape => shape.label !== '');

  return {
    subject,
    contributors,
    description,
    version,
    shapes,
  };
};

export const downloadTurtleFile = (id: string, response: AxiosResponse<any, any>) => {
  const filename = id + '.ttl';
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
