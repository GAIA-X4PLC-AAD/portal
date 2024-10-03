import { CypherQueryApiService as cypherQuery } from '../../../services/cypherQueryApiService';

import { mapParticipants } from './dataMapper';

export const loadParticipants = async (): Promise<any> => {
  return cypherQuery.getAllParticipants().then((participant) => mapParticipants(participant)).catch(
    error => {
      console.error('Error fetching resources:', error);
      throw error;
    }
  )
}

// export const getParticipantByLegalName = async (legalName: string): Promise<any> => {
//   try {
//     const participant = await cypherQuery.getParticipantByLegalName(legalName);
//     return mapResources(participant);
//   } catch (error) {
//     console.error('Error getting participant by legal name:', error);
//     throw error;
//   }
// };

export const getParticipantByLegalName = (legalName: string): Promise<any> => {
  return cypherQuery.getParticipantByLegalName(legalName)
    .then(participant => mapParticipants(participant))
    .catch(error => {
      console.error('Error getting participant by legal name:', error);
      throw error;
    });
};
