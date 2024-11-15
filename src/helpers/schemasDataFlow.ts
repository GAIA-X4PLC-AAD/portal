import { ThunkDispatch } from '../reducers/useThunkReducer';
import { fetchAllOntologiesFromSchemas } from '../services/ontologyService.utils';
import { fetchAllSchemas } from '../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../services/shapeService.utils';

import { AllSchemasError, schemasLoadedAction, schemasLoadingErrorAction } from './schemasReducer';

export const loadSchemas = async (dispatch: ThunkDispatch) => {
  try {
    const schemas = await fetchAllSchemas();
    const shapes = await fetchAllShapesFromSchemas(schemas);
    const ontologies = await fetchAllOntologiesFromSchemas(schemas, shapes)

    dispatch(schemasLoadedAction({
      shapes,
      ontologies
    }))
  } catch (error) {
    dispatch(schemasLoadingErrorAction(error as AllSchemasError))
  }
}
