import {
  fetchAllOntologiesFromSchemas,
  getResourceFormats,
  getResourceTypes
} from '../../../services/ontologyService.utils';
import { fetchAllSchemas } from '../../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../../services/shapeService.utils';

/**
 * Loads resource filter assets.
 *
 * @return a list of each resource assets
 */
export const loadResourceFilterAssets = async (): Promise<{
    resourceTypes: string[];
    resourceFormats: string[];
}> => {
  try {
    const schemas = await fetchAllSchemas();
    const shapes = await fetchAllShapesFromSchemas(schemas);
    const ontologies = await fetchAllOntologiesFromSchemas(schemas, shapes)

    const resourceTypes = getResourceTypes(ontologies);
    const resourceFormats = getResourceFormats(ontologies);

    return { resourceTypes, resourceFormats };
  } catch (error) {
    console.error('Error loading filter assets', error);
    throw error;
  }
}
