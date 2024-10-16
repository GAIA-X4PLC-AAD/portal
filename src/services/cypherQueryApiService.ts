/* test coverage not required */
import axios from 'axios';

import { CypherQueryResult, ServiceOfferingInput } from '../utils/dataMapper';

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
const cypherQuery = async (requestBody: { statement: string }): Promise<CypherQueryResult> => {
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
      console.error('An error occurred when executing this cypher query:', requestBody.statement, 'Error:', error);
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
  async getOneSelfDescriptions(claimsGraphUri: string): Promise<CypherQueryResult> {
    const uri = claimsGraphUri.replace(/'/g, '\\\'');
    return cypherQuery({
      statement: `MATCH (n:HDMap) WHERE '${uri}' IN n.claimsGraphUri RETURN properties(n), labels(n) LIMIT 1`,
    })
  },

  /**
   * Returns all resources of type included in the type asset list passed in as parameter.
   *
   * @param types the list of requested resource types
   */
  async getAllResources(types: string[]): Promise<CypherQueryResult> {
    const typeLabels = types.join('\', \'');

    return cypherQuery({
      statement: `
      MATCH (dataResource:DataResource)
      WHERE ANY (label IN labels(dataResource) WHERE label IN ['${typeLabels}'])

      OPTIONAL MATCH (dataResource)-[:format]-(format)
      OPTIONAL MATCH (dataResource)-[:producedBy]-(producedBy)
      OPTIONAL MATCH (dataResource)-[:general]-(general)
      OPTIONAL MATCH (general)-[:description]-(description)
      
      WHERE description IS NULL OR properties(dataResource).uri IN properties(description).claimsGraphUri

      RETURN
        coalesce(properties(description).name, properties(dataResource).name) AS name,
        coalesce(properties(description).description, properties(dataResource).description) AS description,
        properties(dataResource).uri AS uri,
        properties(dataResource).claimsGraphUri AS claimsGraphUri,
        coalesce(properties(format).type, properties(format).formatType) AS format,
        properties(producedBy).legalName AS vendor,
        labels(dataResource) AS labels
        ORDER BY name, uri
      `,
    });
  },

  async getResourceDetails(uri: string): Promise<CypherQueryResult> {
    return cypherQuery({
      statement: `
      MATCH (dataResource:DataResource)
      WHERE properties(dataResource).uri='${uri}'

      OPTIONAL MATCH (dataResource)-[:instanceOf]-(instantiatedVirtualResource:InstantiatedVirtualResource)
      OPTIONAL MATCH (instantiatedVirtualResource)-[:serviceAccessPoint]-(serviceAccessPoint:ServiceAccessPoint)
      OPTIONAL MATCH (dataResource)-[:general]-(general:General)
      OPTIONAL MATCH (general)-[:data]-(data:Data)
      OPTIONAL MATCH (general)-[:description]-(description:Description)

      WHERE (data IS NULL OR properties(dataResource).uri IN properties(data).claimsGraphUri)
        AND (description IS NULL OR properties(dataResource).uri IN properties(description).claimsGraphUri)
      
      WITH COUNT(*) AS totalCount,
           coalesce(properties(description).name, properties(dataResource).name) AS name,
           coalesce(properties(description).description, properties(dataResource).description) AS description,
           properties(dataResource).uri AS uri,
           labels(dataResource) AS labels,
           CASE
             WHEN serviceAccessPoint IS NOT NULL THEN {
             name:     properties(serviceAccessPoint).name,
             protocol: properties(serviceAccessPoint).protocol,
             host:     properties(serviceAccessPoint).host,
             port:     properties(serviceAccessPoint).port,
             version:  properties(serviceAccessPoint).version
           }
             ELSE null
             END AS serviceAccessPoint,
           properties(data).contractId AS contractId

      RETURN name, uri, contractId, serviceAccessPoint, labels
      `
    })
  },

  /**
   * Returns all entries from the cypher db. This method is used for development purposes only, in cases when
   * available data has to be analysed.
   */
  async getEverything(): Promise<CypherQueryResult> {
    return cypherQuery({
      statement: 'MATCH (n) RETURN properties(n) AS properties, labels(n) AS labels LIMIT 1000',
    })
  },
}
