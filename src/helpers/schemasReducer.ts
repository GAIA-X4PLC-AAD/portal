import { AnyAction } from 'redux';

import { Ontology } from '../types/ontologies.model';
import { Shape } from '../types/shapes.model';

////////////////////////////////////////////////////////////////////////////////
// Action types
////////////////////////////////////////////////////////////////////////////////
const SET_ALL_SCHEMAS = 'SET_ALL_SCHEMAS';
const SET_ALL_SCHEMAS_LOADING_ERROR = 'SET_ALL_SCHEMAS_LOADING_ERROR';

////////////////////////////////////////////////////////////////////////////////
// Type definitions
////////////////////////////////////////////////////////////////////////////////
type IsLoading = { isLoading: boolean; }

type AllSchemas = {
    ontologies: Ontology[];
    shapes: Shape[];
}

type AllSchemasError = {
  error: string | Error;
}

// TODO: Extend the AnyAction type
type AllSchemasAction =
    { type: 'SET_ALL_SCHEMAS', payload: AllSchemas } |
    { type: 'SET_ALL_SCHEMAS_LOADING_ERROR', payload: AllSchemasError }

export type AllSchemasState = (AllSchemas & { hasError: false } | AllSchemasError & { hasError: true }) & IsLoading

////////////////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////////////////
export const schemasReducer = (state: AllSchemasState, action: AnyAction): AllSchemasState => {
  switch (action.type) {

  case SET_ALL_SCHEMAS:
    return { ...action.payload, isLoading: false, hasError: false }

  case SET_ALL_SCHEMAS_LOADING_ERROR:
    return { ...action.payload, isLoading: false, hasError: true }

  }
  return state
}

////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////
export const schemasLoadedAction = (payload: AllSchemas): AllSchemasAction => ({
  type: SET_ALL_SCHEMAS,
  payload
})

export const schemasLoadingErrorAction = (payload: AllSchemasError): AllSchemasAction => ({
  type: SET_ALL_SCHEMAS_LOADING_ERROR,
  payload
})
