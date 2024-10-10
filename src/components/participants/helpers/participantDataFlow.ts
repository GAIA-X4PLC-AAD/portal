import BusinessObjectNotFound from '../../../common/exceptions/BusinessObjectNotFound';
import MultipleBusinessObjectFound from '../../../common/exceptions/MultipleBusinessObjectFound';
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

    if (participantDetail.totalCount === 0) {
      throw new BusinessObjectNotFound(`Participant with the given LegalName: '${legalName}' does not exist!`, legalName);
    }

    if (participantDetail.totalCount > 1) {
      throw new MultipleBusinessObjectFound(`Multiple participant exist with the given LegalName: '${legalName}'`, legalName);
    }

    return participantDetail.items[0];
  } catch (error) {
    console.error('Error getting participant by legal name:', error);
    throw error;
  }
};
