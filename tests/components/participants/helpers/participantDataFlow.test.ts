import '@testing-library/jest-dom';
import BusinessObjectNotFound from '../../../../src/common/exceptions/BusinessObjectNotFound';
import MultipleBusinessObjectFound from '../../../../src/common/exceptions/MultipleBusinessObjectFound';
import {
  loadParticipantDetails,
  loadParticipants
} from '../../../../src/components/participants/helpers/participantDataFlow';
import { CypherQueryApiService as cypherQuery } from '../../../../src/services/cypherQueryApiService';

import { mockParticipantsQueryResults } from './__fixtures__/participants_queryResults';

// Mock the services
jest.mock('../../../../src/services/cypherQueryApiService', () => ({
  CypherQueryApiService: {
    getAllParticipants: jest.fn(),
    getParticipantByLegalName: jest.fn(),
  }
}));

describe('Participant Data Flow', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  describe('loadParticipants', () => {
    it('should load participants successfully', async () => {
      //Mock the API response
      (cypherQuery.getAllParticipants as jest.Mock).mockResolvedValue(mockParticipantsQueryResults);

      const participants = await loadParticipants();

      // Assert that the correct participants are returned
      expect(participants).toEqual(mockParticipantsQueryResults.items);
      expect(cypherQuery.getAllParticipants).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw an error when loading participants fails', async () => {
    const errorMessage = 'Failed to fetch participants';

    // Mock the API to reject with an error
    cypherQuery.getAllParticipants.mockRejectedValue(new Error(errorMessage));

    // Assert that an error is thrown
    await expect(loadParticipants()).rejects.toThrow(errorMessage);
    expect(cypherQuery.getAllParticipants).toHaveBeenCalledTimes(1);
  });

  describe('getParticipantByLegalName', () => {
    it('should return participant details when found', async () => {
      const mockParticipantDetail = { totalCount: 1, items: [mockParticipantsQueryResults.items[0]] };

      // Mock the API response
      cypherQuery.getParticipantDetails.mockResolvedValue(mockParticipantDetail);

      const participant = await loadParticipantDetails('msg systems AG');

      // Assert that the correct participant details are returned
      expect(participant).toEqual(mockParticipantDetail.items[0]);
      expect(cypherQuery.getParticipantDetails).toHaveBeenCalledWith('msg systems AG');
    });

    it('should throw BusinessObjectNotFound when no participants are found', async () => {
      const mockResponse = { totalCount: 0, items: [] };

      // Mock the API response
      cypherQuery.getParticipantDetails.mockResolvedValue(mockResponse);

      // Assert that BusinessObjectNotFound is thrown
      await expect(loadParticipantDetails('Non-existent Participant')).rejects.toThrow(BusinessObjectNotFound);
    });

    it('should throw MultipleBusinessObjectFound when more than one participant is found', async () => {
      const mockResponse = {
        totalCount: 2,
        items: [mockParticipantsQueryResults.items[0], mockParticipantsQueryResults.items[2]]
      };

      // Mock the API response
      cypherQuery.getParticipantDetails.mockResolvedValue(mockResponse);

      // Assert that MultipleBusinessObjectFound is thrown
      await expect(loadParticipantDetails('Duplicate Participant')).rejects.toThrow(MultipleBusinessObjectFound);
    });

    it('should throw an error when fetching participant details fails', async () => {
      const errorMessage = 'Failed to fetch participant details';

      // Mock the API to reject with an error
      cypherQuery.getParticipantDetails.mockRejectedValue(new Error(errorMessage));

      // Assert that an error is thrown
      await expect(loadParticipantDetails('Participant')).rejects.toThrow(errorMessage);
      expect(cypherQuery.getParticipantDetails).toHaveBeenCalledWith('Participant');
    });
  });
});
