import { CypherQueryApiService as cypherQuery } from '../../../services/cypherQueryApiService';
import {
  fetchAllOntologiesFromSchemas,
  getResourceFormats,
  getResourceTypes
} from '../../../services/ontologyService.utils';
import { fetchAllSchemas } from '../../../services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../../services/shapeService.utils';
import { Resource } from '../../../types/resources.model';
import { mapResources } from '../../../utils/dataMapper';

export interface ResourceSearchPageData {
    resources: Resource[],
    resourceTypes: string[],
    resourceFormats: string[]
}

export const loadResourceSearchPageData = async (): Promise<ResourceSearchPageData> => {
  const { resourceTypes, resourceFormats } = await loadResourceFilterAssets();
  const resources = await loadResources(resourceTypes);

  return {
    resources,
    resourceTypes,
    resourceFormats
  }
}

/**
 * Loads resources for which the following criteria are met:
 * - the node labels should contain at least one of the selected filters passed in as `typeFilter` param
 * - the node labels should contain the DataResource label too
 * - only main nodes (for which the uri does not start with `pnode://`) are returned as result
 *
 * @param resourceTypes only resources with this label will be loaded
 * @return the list of resources
 */
const loadResources = async (resourceTypes: string[]): Promise<Resource[]> =>
  cypherQuery
    .getAllResources(resourceTypes)
    .then((resourceInput) => mapResources(resourceInput))
    .catch(error => {
      console.error('Error fetching resources:', error);
      throw error;
    });

/**
 * Loads resource filter assets.
 *
 * @return a list of each resource assets
 */
const loadResourceFilterAssets = async (): Promise<{
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
