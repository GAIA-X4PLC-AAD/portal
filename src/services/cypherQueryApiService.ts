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

      RETURN
        properties(description).name AS name,
        properties(description).description AS description,
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
      WHERE dataResource.uri = '${uri}'

      OPTIONAL MATCH (dataResource)-[:instanceOf]-(instantiatedVirtualResource)
      OPTIONAL MATCH (instantiatedVirtualResource)-[:serviceAccessPoint]-(serviceAccessPoint)
      
      OPTIONAL MATCH (dataResource)-[:general]-(general)
      OPTIONAL MATCH (general)-[:data]-(data)
      
      OPTIONAL MATCH (dataResource)-[:format]-(format) 
      OPTIONAL MATCH (dataResource)-[:content]-(content) 
      OPTIONAL MATCH (dataResource)-[:producedBy]-(producedBy) 

      RETURN 
           dataResource.name as name,
           dataResource.description as description, 
           dataResource.uri as uri,
           CASE
              WHEN serviceAccessPoint IS NOT NULL THEN {
                name:     properties(serviceAccessPoint).name,
                protocol: properties(serviceAccessPoint).protocol,
                host:     properties(serviceAccessPoint).host,
                port:     properties(serviceAccessPoint).port,
                version:  properties(serviceAccessPoint).version
              } 
              ELSE null
              END as serviceAccessPoint,
           data.contractId as contractId,
           dataResource.license as license,
           dataResource.copyrightOwnedBy as copyrightOwnedBy,
           dataResource.claimsGraphUri as claimsGraphUri,
           CASE dataResource.containsPII
              WHEN 'true' THEN true
                 WHEN 'false' THEN false
              ELSE null
              END as containsPII,
           dataResource.obsoleteDateTime as obsoleteDateTime, 
           dataResource.expirationDateTime as expirationDateTime, 
           content.levelOfDetail as levelOfDetail, 
           content.trafficDirection as trafficDirection, 
           content.roadTypes as roadTypes, 
           content.laneTypes as laneTypes, 
           producedBy.legalName as legalName,
           labels(dataResource) as labels
      `
    })
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
