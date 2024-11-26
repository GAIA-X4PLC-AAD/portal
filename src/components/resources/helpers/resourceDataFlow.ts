import BusinessObjectsNotFound from '../../../common/errorHandling/exceptions/BusinessObjectsNotFound';
import MultipleBusinessObjectsFound from '../../../common/errorHandling/exceptions/MultipleBusinessObjectsFound';
import { CypherQueryApiService as cypherQuery } from '../../../services/cypherQueryApiService';
import { Resource, ResourceDetails } from '../../../types/resources.model';

/**
 * Loads resources for which the following criteria are met:
 * - the node labels should contain at least one of the selected filters passed in as `typeFilter` param
 * - the node labels should contain the DataResource label too
 *
 * @param resourceTypes only resources with this label will be loaded
 * @return the list of resources
 */
export const loadResources = async (resourceTypes: string[]): Promise<Resource[]> => {
  if (!resourceTypes.length) {
    return [];
  }

  return cypherQuery
    .getAllResources(resourceTypes)
    .then(queryResult => queryResult.items)
    .catch(error => {
      console.error('Error fetching resources:', error);
      throw error;
    });
}

/**
 * Loads details for a given resource by its uri.
 *
 * @param resourceUri identifies the resource for which the details have to be loaded.
 *
 * @return the details of the resource
 * @throws BusinessObjectsNotFound if the resource with the give uri was not found.
 * @throws MultipleBusinessObjectsFound it more than one result with the same uri was found.
 */
export const loadResourceDetails = async (resourceUri: string): Promise<ResourceDetails> =>
  cypherQuery
    .getResourceDetails(resourceUri)
    .then(queryResult => {
      if (queryResult.items.length === 0) {
        console.error(`Data resource with the given uri '${resourceUri}' does not exists!`);
        throw new BusinessObjectsNotFound(
          `Data resource with the given uri '${resourceUri}' does not exists!`, resourceUri
        )
      }
      if (queryResult.items.length > 1) {
        console.error(`Multiple resources exists with the given uri '${resourceUri}'`);
        throw new MultipleBusinessObjectsFound(
          `Multiple resources exists with the given uri '${resourceUri}'`, resourceUri
        )
      }
      const { name, uri, contractId, serviceAccessPoint } = queryResult.items[0];
      return {
        name, uri,
        ...(!contractId ? {} : { contractId }),
        ...(!serviceAccessPoint ? {} : { serviceAccessPoint })
      }
    })
