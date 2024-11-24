import '@testing-library/jest-dom';
import BusinessObjectsNotFound from '../../../../src/common/errorHandling/exceptions/BusinessObjectsNotFound';
import MultipleBusinessObjectsFound from '../../../../src/common/errorHandling/exceptions/MultipleBusinessObjectsFound';
import {
  loadParticipantDetails,
  loadParticipants
} from '../../../../src/components/participants/helpers/participantDataFlow';
import { mockParticipant_msg_systems_AG, mockParticipant_msg_systems_ag } from '../__fixtures__/participants';

import { mockParticipantsQueryResults } from './__fixtures__/participants_queryResults';

const getAllParticipants = jest.fn();
const getParticipantDetails = jest.fn();

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging

// Mock the services
jest.mock('../../../../src/services/cypherQueryApiService', () => ({
  CypherQueryApiService: {
    getAllParticipants: () => getAllParticipants(),
    getParticipantDetails: (legalName: string) => getParticipantDetails(legalName),
  }
}));

describe('Participant Data Flow', () => {

  console.error = jest.fn(); // Disable error logging
  console.debug = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  describe('loadParticipants', () => {
    it('should load participants successfully', async () => {
      //Mock the API response
      getAllParticipants.mockResolvedValue(mockParticipantsQueryResults);

      const participants = await loadParticipants();

      // Assert that the correct participants are returned
      expect(participants).toEqual(mockParticipantsQueryResults.items);
      expect(getAllParticipants).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw an error when loading participants fails', async () => {
    const errorMessage = 'Failed to fetch participants';

    // Mock the API to reject with an error
    getAllParticipants.mockRejectedValue(new Error(errorMessage));

    // Assert that an error is thrown
    await expect(loadParticipants()).rejects.toThrow(errorMessage);
    expect(getAllParticipants).toHaveBeenCalledTimes(1);
  });

  describe('loadParticipantDetails', () => {
    it('should return participant details when found', async () => {
      const mockParticipantDetail = { totalCount: 1, items: [mockParticipant_msg_systems_AG] };

      // Mock the API response
      getParticipantDetails.mockResolvedValue(mockParticipantDetail);

      const participant = await loadParticipantDetails('msg systems AG');

      // Assert that the correct participant details are returned
      expect(participant).toEqual(mockParticipant_msg_systems_AG);
      expect(getParticipantDetails).toHaveBeenCalledWith('msg systems AG');
    });

    it('should throw BusinessObjectNotFound when no participants are found', async () => {
      const mockResponse = { totalCount: 0, items: [] };

      // Mock the API response
      getParticipantDetails.mockResolvedValue(mockResponse);

      // Assert that BusinessObjectNotFound is thrown
      await expect(loadParticipantDetails('Non-existent Participant')).rejects.toThrow(BusinessObjectsNotFound);
    });

    it('should throw MultipleBusinessObjectFound when more than one participant is found', async () => {
      const mockResponse = {
        totalCount: 2,
        items: [mockParticipant_msg_systems_ag, mockParticipant_msg_systems_AG]
      };

      // Mock the API response
      getParticipantDetails.mockResolvedValue(mockResponse);

      // Assert that MultipleBusinessObjectFound is thrown
      await expect(loadParticipantDetails('Duplicate Participant')).rejects.toThrow(MultipleBusinessObjectsFound);
    });

    it('should throw an error when fetching participant details fails', async () => {
      const errorMessage = 'Failed to fetch participant details';

      // Mock the API to reject with an error
      getParticipantDetails.mockRejectedValue(new Error(errorMessage));

      // Assert that an error is thrown
      await expect(loadParticipantDetails('Participant')).rejects.toThrow(errorMessage);
      expect(getParticipantDetails).toHaveBeenCalledWith('Participant');
    });
  });
});
