import axios from 'axios';

import { AuthContextType } from '../context/AuthContextProvider';
import { ISelfDescription, ResourceInput, ServiceOfferingInput } from '../utils/dataMapper';

const getHeaders = (authContext: AuthContextType) => {
  return {
    Authorization: `Bearer ${authContext.token}`,
    'Access-Control-Allow-Origin': '*',
  };
}

function getEndpoint() {
  const serverUrl: string = 'https://fc-server.gxfs.gx4fm.org';
  return serverUrl + '/query';
}

/**
 * Executing a graph DB query and returning the results
 *
 * @param authContext in order to get authorization for server calls
 * @param requestBody graph db query request
 */
const graphQuery = async (authContext: AuthContextType, requestBody: { statement: string }): Promise<any> => {
  const endpoint = getEndpoint();
  const headers = getHeaders(authContext);

  return axios
    .options(endpoint, { headers })
    .then(() => {
      return axios.post(endpoint, requestBody, { headers });
    })
    .then((response) => {
      return response.data;
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

export const ApiService = {

  /**
   * Returns every Service Offering available
   *
   * @param authContext in order to get authorization for server calls
   */
  async getAllSelfDescriptions(authContext: AuthContextType): Promise<ServiceOfferingInput> {
    return graphQuery(authContext, {
      statement: 'MATCH (n:ServiceOffering) RETURN properties(n), labels(n) LIMIT 100',
    })
  },

  /**
   * Returns details about a resource
   *
   * @param authContext in order to get authorization for server calls
   * @param claimsGraphUri the id of the resource to be queried
   */
  async getOneSelfDescriptions(authContext: AuthContextType, claimsGraphUri: string): Promise<ISelfDescription> {
    const uri = claimsGraphUri.replace(/'/g, '\\\'');
    return graphQuery(authContext, {
      statement: `MATCH (n:HDMap) WHERE '${uri}' IN n.claimsGraphUri RETURN properties(n), labels(n) LIMIT 1`,
    })
  },

  /**
   * Returns all resources
   *
   * @param authContext in order to get authorization for server calls
   */
  async getAllResources(authContext: AuthContextType): Promise<ResourceInput> {
    return graphQuery(authContext, {
      statement: 'MATCH (n) RETURN properties(n), labels(n)',
    })
  }
}
