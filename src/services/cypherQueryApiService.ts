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
 * @param authContext authorization token for server calls
 * @param requestBody graph db query request
 */
const cypherQuery = async (authContext: AuthContextType, requestBody: { statement: string }): Promise<any> => {
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

export const CypherQueryApiService = {

  /**
   * Returns every Service Offering available
   *
   * @param authContext authorization token for server calls
   */
  async getAllSelfDescriptions(authContext: AuthContextType): Promise<ServiceOfferingInput> {
    return cypherQuery(authContext, {
      statement: 'MATCH (n:ServiceOffering) RETURN properties(n), labels(n) LIMIT 100',
    })
  },

  /**
   * Returns details about a resource
   *
   * @param authContext authorization token for server calls
   * @param claimsGraphUri the id of the resource to be queried
   */
  async getOneSelfDescriptions(authContext: AuthContextType, claimsGraphUri: string): Promise<ISelfDescription> {
    const uri = claimsGraphUri.replace(/'/g, '\\\'');
    return cypherQuery(authContext, {
      statement: `MATCH (n:HDMap) WHERE '${uri}' IN n.claimsGraphUri RETURN properties(n), labels(n) LIMIT 1`,
    })
  },

  /**
   * Returns all resources
   *
   * @param authContext authorization token for server calls
   */
  async getAllResources(authContext: AuthContextType): Promise<ResourceInput> {
    return cypherQuery(authContext, {
      statement: 'MATCH (n) RETURN properties(n), labels(n)',
    })
  },
}
