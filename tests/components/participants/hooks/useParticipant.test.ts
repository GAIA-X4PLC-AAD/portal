import { renderHook, waitFor } from '@testing-library/react'; // For testing hooks

import { loadParticipantDetails } from '../../../../src/components/participants/helpers/participantDataFlow'; // Import the mock
import { useParticipant } from '../../../../src/components/participants/hooks/useParticipant';

import { mockParticipant } from './__fixtures__/participant';

jest.mock('../../../../src/components/participants/helpers/participantDataFlow', () => ({
  loadParticipantDetails: jest.fn(),
}));

describe('useParticipant', () => {
  const mockLegalName = 'msg systems ag'; // Example legal name for testing

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return SHOW_PARTICIPANT when a participant is found', async () => {
    console.log(mockParticipant);
    // Mock the API call to return the participant data
    loadParticipantDetails.mockResolvedValue(mockParticipant); // Return a single participant

    const { result } = renderHook(() => useParticipant(mockLegalName));

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_PARTICIPANT'));
    expect(result.current.participant).toEqual(mockParticipant);
  });

  it('should return SHOW_NO_RESULT when no participant is found', async () => {
    // Mock the API call to return null or undefined (no participant found)
    loadParticipantDetails.mockResolvedValue(undefined);

    const { result } = renderHook(() => useParticipant(mockLegalName));

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_NO_RESULT'));
    expect(result.current.participant).toBeUndefined();
  });
});
