import { CypherQueryApiService as cypherQuery } from '../../../services/cypherQueryApiService';
import { Resource } from '../../../types/resources.model';
import { mapResources } from '../../../utils/dataMapper';

/**
 * Loads resources for which the following criteria are met:
 * - the node labels should contain at least one of the selected filters passed in as `typeFilter` param
 * - the node labels should contain the DataResource label too
 * - only main nodes (for which the uri does not start with `pnode://`) are returned as result
 *
 * @param resourceTypes only resources with this label will be loaded
 * @return the list of resources
 */
export const loadResources = async (resourceTypes: string[]): Promise<Resource[]> =>
  cypherQuery
    .getAllResources(resourceTypes)
    .then((resourceInput) => mapResources(resourceInput))
    .catch(error => {
      console.error('Error fetching resources:', error);
      throw error;
    });
