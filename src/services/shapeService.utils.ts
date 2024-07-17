import * as N3 from 'n3';
import { Quad } from 'n3';

import { Shape } from '../types/shapesAndOntologies.model';

import { getSchemaById } from './SchemaApiService';

export const fetchShapes = async (shapesStringArray: string[]) => {
  const promises = shapesStringArray.map(async id => {
    const promise = await getSchemaById(id);
    const parsedShape = await parseSingleShape(promise);
    return createShapeObject(id, parsedShape);
  });

  return await Promise.all(promises);
}

export const parseSingleShape = (item: string) => {
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

export const createShapeObject = (id: string, quads: Quad[]): Shape => {
  const firstSubject = quads.length > 0 ? quads[0].subject.id : 'No subject available!';
  const content: {predicate: string, object: string}[] = [];
  let subject = firstSubject;

  quads.forEach(quad => {
    const subjectId = quad.subject.id;
    const predicateId = quad.predicate.id;
    const objectId = quad.object.id;

    // if (subjectId != subject) {
    content.push({ object: objectId, predicate: predicateId });
    // }
  });

  return {
    id,
    subject,
    content,
  };
}

export const getShapeById = async (id: string) => {
  const response = await getSchemaById(id);
  const parsedShape = await parseSingleShape(response);
  return createShapeObject(id, parsedShape);
}
