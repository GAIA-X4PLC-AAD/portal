import { fetchOntologyById } from '../../../services/ontologyService.utils';
import { fetchAllSchemas } from '../../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../../services/shapeService.utils';

/**
 * Loads the ontology by its id.
 * @param ontologyId the id of the ontology to be loaded.
 */
export const loadOntology = async (ontologyId: string) => {
  const schemas = await fetchAllSchemas();
  const shapes = await fetchAllShapesFromSchemas(schemas);
  return await fetchOntologyById(shapes, ontologyId);
}
