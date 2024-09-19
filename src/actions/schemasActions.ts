import { Ontology } from '../types/ontologies.model';
import { Shape } from '../types/shapes.model';

import { SET_ALL_SCHEMAS, SET_ALL_SCHEMAS_LOADING_ERROR } from './types';

export type AllSchemas = {
    ontologies: Ontology[];
    shapes: Shape[];
}

export type AllSchemasError = {
    error: string;
}

export type AllSchemasAction =
    { type: 'SET_ALL_SCHEMAS', payload: AllSchemas } |
    { type: 'SET_ALL_SCHEMAS_LOADING_ERROR', payload: AllSchemasError }

export const schemasLoadedAction = (payload: AllSchemas): AllSchemasAction => ({
  type: SET_ALL_SCHEMAS,
  payload
})

export const schemasLoadingErrorAction = (payload: AllSchemasError): AllSchemasAction => ({
  type: SET_ALL_SCHEMAS_LOADING_ERROR,
  payload
})
