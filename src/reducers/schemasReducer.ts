import { AllSchemas, AllSchemasAction, AllSchemasError } from '../actions/schemasActions';
import { SET_ALL_SCHEMAS, SET_ALL_SCHEMAS_LOADING_ERROR } from '../actions/types';

type IsLoading = { isLoading: boolean; }
export type AllSchemasState = (AllSchemas & { hasError: false } | AllSchemasError & { hasError: true }) & IsLoading

const initialState: AllSchemasState = {
  isLoading: true,
  hasError: false,
  shapes: [],
  ontologies: []
}

export default (state: AllSchemasState = initialState, action: AllSchemasAction) => {
  switch (action.type) {

  case SET_ALL_SCHEMAS:
    return { ...action.payload, isLoading: false, hasError: false }

  case SET_ALL_SCHEMAS_LOADING_ERROR:
    return { error: action.payload, isLoading: false, hasError: true }

  }
  return state

}
