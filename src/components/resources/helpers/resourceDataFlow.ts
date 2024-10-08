import { CypherQueryApiService as cypherQuery } from '../../../services/cypherQueryApiService';
import { Resource } from '../../../types/resources.model';

/**
 * Loads resources for which the following criteria are met:
 * - the node labels should contain at least one of the selected filters passed in as `typeFilter` param
 * - the node labels should contain the DataResource label too
 *
 * @param resourceTypes only resources with this label will be loaded
 * @return the list of resources
 */
export const loadResources = async (resourceTypes: string[]): Promise<Resource[]> =>
  cypherQuery
    .getAllResources(resourceTypes)
    .catch(error => {
      console.error('Error fetching resources:', error);
      throw error;
    });
