import { CypherQueryApiService as cypherQuery } from '../../../services/cypherQueryApiService';
import { Participant, ParticipantDetail } from '../../../types/participants.model';

export const loadParticipants = async (): Promise<Participant[]> => {
  try {
    const participantsResponse = await cypherQuery.getAllParticipants();
    return participantsResponse.items;
  } catch (error) {
    console.error('Error fetching participants:', error);
    throw error;
  }
}

export const getParticipantByLegalName = async (legalName: string): Promise<ParticipantDetail> => {
  try {
    const participantDetail = await cypherQuery.getParticipantByLegalName(legalName);
    return participantDetail.items.length ? participantDetail.items[0] : null;
  } catch (error) {
    console.error('Error getting participant by legal name:', error);
    throw error;
  }
};
