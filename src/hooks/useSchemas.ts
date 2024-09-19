import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { schemasLoadedAction } from '../actions/schemasActions';
import { AuthContext } from '../context/AuthContextProvider';
import { fetchAllOntologiesFromSchemas } from '../services/ontologyService.utils';
import { fetchAllSchemas } from '../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../services/shapeService.utils';

export const useSchemas = () => {
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const { isLoading, shapes, ontologies } = useSelector((state) => ({
    isLoading: state.schemas.isLoading,
    shapes: state.schemas.shapes,
    ontologies: state.schemas.ontologies
  }))

  useEffect(() => {
    if (authContext.isAuthenticated) {
      (async () => {
        const schemas = await fetchAllSchemas();
        const shapes = await fetchAllShapesFromSchemas(schemas);
        const ontologies = await fetchAllOntologiesFromSchemas(schemas, shapes)

        dispatch(schemasLoadedAction({
          shapes,
          ontologies
        }))
      })();
    }
  }, [authContext.isAuthenticated]);

  return {
    isLoading,
    shapes,
    ontologies
  }
}
