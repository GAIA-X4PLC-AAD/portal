import BusinessObjectsNotFound from '../../../common/errorHandling/exceptions/BusinessObjectsNotFound';
import MultipleBusinessObjectsFound from '../../../common/errorHandling/exceptions/MultipleBusinessObjectsFound';
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

export const loadParticipantDetails = async (legalName: string): Promise<ParticipantDetail> => {
  try {
    const cypherQueryResult = await cypherQuery.getParticipantDetails(legalName);

    if (cypherQueryResult.items.length === 0) {
      throw new BusinessObjectsNotFound(`Participant with the given LegalName: '${legalName}' does not exist!`, legalName);
    }

    if (cypherQueryResult.items.length > 1) {
      throw new MultipleBusinessObjectsFound(`Multiple participant exist with the given LegalName: '${legalName}'`, legalName);
    }

    return cypherQueryResult.items[0];
  } catch (error) {
    console.error('Error getting participant by legal name:', error);
    throw error;
  }
};
