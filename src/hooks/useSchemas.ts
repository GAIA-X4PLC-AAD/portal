import { useEffect } from 'react';

import { loadSchemas } from '../helpers/schemasDataFlow';
import { AllSchemasState, schemasReducer } from '../helpers/schemasReducer';
import { useThunkReducer } from '../reducers/useThunkReducer';

export const initialSchemaState: AllSchemasState = {
  isLoading: true,
  hasError: false,
  shapes: [],
  ontologies: []
}

export const useSchemas = (): AllSchemasState => {
  const [schemas, dispatch] = useThunkReducer(schemasReducer, initialSchemaState);

  useEffect(
    () => dispatch(loadSchemas),
    []
  );

  return {
    ...schemas
  }
}

