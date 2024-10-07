import axios from 'axios';

import { Asset } from '../components/resources/helpers/resourceFilterAssetHelper';
import { ResourceDetails } from '../types/resources.model';
import { ISelfDescription, ResourceInput, ServiceOfferingInput } from '../utils/dataMapper';

const getHeaders = () => {
  return {
    'Access-Control-Allow-Origin': '*',
  };
}

function getEndpoint() {
  if (!process.env.REACT_APP_FEDERATED_CATALOGUE_API_URL) {
    throw new Error('REACT_APP_FEDERATED_CATALOGUE_API_URL is not defined');
  }
  const serverUrl = process.env.REACT_APP_FEDERATED_CATALOGUE_API_URL;
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
   * @param uri the id of the resource to be queried
   */
  async getOneSelfDescriptions(uri: string): Promise<ISelfDescription> {
    return cypherQuery({
      statement: `MATCH (n) WHERE '${uri}' IN n.uri RETURN properties(n), labels(n)`,
    })
  },

  /**
   * Returns details about a resource
   * ${uri}
   * @param uri the id of the resource to be queried
   */
  async getOneResourceDetails(uri: string): Promise<ResourceDetails> {
    return cypherQuery(  {
      statement:
          `CALL { MATCH (resource)
          WHERE ${uri} IN resource.uri
          RETURN
            resource.license as license,
            resource.expirationDateTime as expirationDateTime,
            resource.copyrightOwnedBy as copyrightOwnedBy,
            resource.containsPII as containsPII, resource.name as name,
            resource.description as description,
            resource.obsoleteDateTime as obsoleteDateTime }
          CALL { MATCH (resource)
          WHERE ${uri} IN resource.claimsGraphUri
            RETURN head(collect(resource.roadTypes)) AS roadType,
          collect(resource.laneTypes) AS laneTypes,
          head(collect(resource.levelOfDetail)) AS levelOfDetail,
          head(collect(resource.trafficDirection)) AS trafficDirection }
          RETURN *`
    })
  },

  /**
   * Returns all resources of type included in the type asset list passed in as parameter.
   *
   * @param typeFilters the list of requested resource types
   */
  async getAllResources(typeFilters: Asset[]): Promise<ResourceInput> {
    const whereDataResource = typeFilters.length ? `
    WHERE ANY (label IN labels(n) WHERE label IN [ '${typeFilters.map(asset => asset.label).join('\', \'')}'])
      AND 'DataResource' IN labels(n)
      AND NOT n.uri STARTS WITH 'bnode://'`
      : ''

    const matchFormatNode = `
    OPTIONAL MATCH(m)
    WHERE n.uri IN m.claimsGraphUri 
      AND ANY(label IN labels(m) WHERE label CONTAINS 'Format')`

    return cypherQuery({
      statement: `
      MATCH (n) 
      ${whereDataResource} 
      ${matchFormatNode}
      RETURN 
        properties(n) AS properties, 
        labels(n) AS labels, 
        properties(m).type AS format`,
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
