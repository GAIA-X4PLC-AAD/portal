/* test coverage not required */
import axios from 'axios';
import { Resource } from 'types/resources.model';

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
  async getAllResources(types: string[]): Promise<Resource[]> {
    if (!types.length) {
      return [];
    }
    const typeLabels = types.join('\', \'');

    return cypherQuery({
      statement: `
      MATCH (resource)
      WHERE ANY (label IN labels(resource) WHERE label IN ['${typeLabels}'])
        AND 'DataResource' IN labels(resource)
      WITH COUNT(resource) AS totalCount, resource

      OPTIONAL MATCH (resource)-[relation]-(nodeProperty)
      WITH
        properties(resource) AS properties,
        labels(resource) AS labels,
        COLLECT({
          name: type(relation),
          labels: labels(nodeProperty),
          properties: properties(nodeProperty)
        }) AS nodeProperties,
        totalCount

      WITH labels, properties, nodeProperties,
        [property IN nodeProperties WHERE property.name = 'format'] AS formatNodeProperty,
        [property IN nodeProperties WHERE property.name = 'producedBy'] AS producedByNodeProperty,
        totalCount

      RETURN
        COALESCE(
          HEAD(formatNodeProperty).properties.type,
          HEAD(formatNodeProperty).properties.formatType
        ) AS format,
        HEAD(producedByNodeProperty).properties.legalName AS vendor,
        labels,
        properties.name AS name,
        properties.description AS description,
        properties.uri AS uri,
        properties.claimsGraphUri AS claimsGraphUri
      ORDER BY name, uri 
      `,
    }).then(queryResult => queryResult.items);
  },

  /**
   * Returns all participants.
   *
   * @return the selected participant in a {@link CypherQueryResult} type  */
  async getAllParticipants(): Promise<CypherQueryResult> {
    return cypherQuery({
      statement: `
      MATCH (participant)
        WHERE 'LegalParticipant' IN labels(participant)
      RETURN
        properties(participant).legalName AS legalName,
        labels(participant) AS labels
      `
    });
  },

  /**
   * Returns a single participant selected by it legal name.
   *
   * @param legalName is the property by which the participant is selected.
   * @return the selected participant in a {@link CypherQueryResult} type  */
  async getParticipantDetails(legalName: string): Promise<CypherQueryResult> {
    return cypherQuery({
      statement: `
      MATCH (participant)
        WHERE 'LegalParticipant' IN labels(participant) AND properties(participant).legalName CONTAINS '${legalName}'
      RETURN
        properties(participant).legalName AS legalName,
        properties(participant).claimsGraphUri AS claimsGraphUri,
        properties(participant).uri AS uri,
        properties(participant).gaiaxTermsAndConditions AS gaiaxTermsAndConditions,
        labels(participant) AS labels
      `
    });
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
