import { AxiosResponse } from 'axios';
import * as N3 from 'n3';

import { AuthContextType } from '../context/AuthContextProvider';
import { Shape, ShapesAndOntologiesInput } from '../types/shapesAndOntologies.model';

import { getSchemaById } from './SchemaApiService';

export const fetchShapes = async (authContext: AuthContextType, response: AxiosResponse<any, any>) => {
  const shapesStringArray = mapShapes(response);

  const promises = shapesStringArray.map(async id => {
    const promise = await getSchemaById(authContext, id);
    const parsedShape = await parseSingleShape(promise);
    return createShapeObject(id, parsedShape);
  });

  return await Promise.all(promises);
}

export const mapShapes = (response: ShapesAndOntologiesInput): string[] => {
  return response.shapes.map((shape) => shape);
}

export const parseSingleShape = (item: string): any[] => {
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

export const createShapeObject = (id: string, quads: any[]): Shape => {
  const firstSubject = quads.length > 0 ? quads[0]._subject.id : 'No subject available!';
  const content: string[] = [];
  let subject = firstSubject;
  console.log('quads:', quads)
  quads.forEach(quad => {
    const subjectId = quad._subject.id;
    const predicateId = quad._predicate.id;
    const objectId = quad._object.id;
  });

  return {
    id,
    subject,
    content,
  };
}

export const getShapeById = async (authContext: AuthContextType, id: string) => {
  const response = await getSchemaById(authContext, id);
  const parsedShape = await parseSingleShape(response);
  return createShapeObject(id, parsedShape);
}
