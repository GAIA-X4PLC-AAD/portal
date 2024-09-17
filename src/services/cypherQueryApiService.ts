import axios from 'axios';

import { Asset } from '../components/resources/helpers/resourceFilterAssetHelper';
import { ISelfDescription, ResourceInput, ServiceOfferingInput } from '../utils/dataMapper';

const getHeaders = () => {
  return {
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
 * @param requestBody graph db query request
 */
const cypherQuery = async (requestBody: { statement: string }): Promise<any> => {
  const endpoint = getEndpoint();
  const headers = getHeaders();

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
   */
  async getAllSelfDescriptions(): Promise<ServiceOfferingInput> {
    return cypherQuery({
      statement: 'MATCH (n:ServiceOffering) RETURN properties(n), labels(n) LIMIT 100',
    })
  },

  /**
   * Returns details about a resource
   *
   * @param claimsGraphUri the id of the resource to be queried
   */
  async getOneSelfDescriptions(claimsGraphUri: string): Promise<ISelfDescription> {
    const uri = claimsGraphUri.replace(/'/g, '\\\'');
    return cypherQuery({
      statement: `MATCH (n:HDMap) WHERE '${uri}' IN n.claimsGraphUri RETURN properties(n), labels(n) LIMIT 1`,
    })
  },

  /**
   * Returns all resources of type included in the type asset list passed in as parameter.
   *
   * @param typeFilters the list of requested resource types
   */
  async getAllResources(typeFilters: Asset[]): Promise<ResourceInput> {
    const whereDataResource = typeFilters.length ? `
    WHERE ANY (label IN labels(resource) WHERE label IN [ '${typeFilters.map(asset => asset.label).join('\', \'')}'])
      AND 'DataResource' IN labels(resource)
      AND NOT resource.uri STARTS WITH 'bnode://'`
      : ''

    const matchFormatPropertyNode = `
    OPTIONAL MATCH(formatProperty)
    WHERE resource.uri IN formatProperty.claimsGraphUri 
      AND ANY(label IN labels(formatProperty) WHERE label CONTAINS 'Format')`

    const matchCopyrightOwnedBy = `
    OPTIONAL MATCH(copyrightOwner)
    WHERE copyrightOwner.uri = resource.copyrightOwnedBy`

    return cypherQuery({
      statement: `
      MATCH (resource) 
      ${whereDataResource} 
      ${matchFormatPropertyNode}
      ${matchCopyrightOwnedBy}
      RETURN 
        properties(resource) AS properties, 
        labels(resource) AS labels, 
        properties(formatProperty).type AS format,
        properties(copyrightOwner).legalName AS vendor`,
    })
  },

  /**
   * Returns all entries from the cypher db. This method is used for development purposes only, in cases when
   * available data has to be analysed.
   */
  async getEverything(): Promise<ResourceInput> {
    return cypherQuery({
      statement: 'MATCH (n) RETURN properties(n) AS properties, labels(n) AS labels LIMIT 1000',
    })
  },
}
