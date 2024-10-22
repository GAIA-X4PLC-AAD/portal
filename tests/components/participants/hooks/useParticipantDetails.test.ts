import { renderHook, waitFor } from '@testing-library/react';

import { useParticipantDetails } from '../../../../src/components/participants/hooks/useParticipantDetails';

import { mockParticipant } from './__fixtures__/participant';

const loadParticipantDetails = jest.fn();
jest.mock('../../../../src/components/participants/helpers/participantDataFlow', () => ({
  loadParticipantDetails: () => loadParticipantDetails(),
}));

describe('useParticipant', () => {
  const mockLegalName = 'msg systems ag'; // Example legal name for testing

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return SHOW_PARTICIPANT when a participant is found', async () => {
    // Mock the API call to return the participant data
    loadParticipantDetails.mockResolvedValue(mockParticipant); // Return a single participant

    const { result } = renderHook(() => useParticipantDetails(mockLegalName));

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_PARTICIPANT'));
    expect(result.current.participant).toEqual(mockParticipant);
  });

  it('should return SHOW_NO_RESULT when no participant is found', async () => {
    // Mock the API call to return null or undefined (no participant found)
    loadParticipantDetails.mockResolvedValue(undefined);

    const { result } = renderHook(() => useParticipantDetails(mockLegalName));

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_NO_RESULT'));
    expect(result.current.participant).toBeUndefined();
  });
});
