import { renderHook, waitFor } from '@testing-library/react';

import { loadParticipants } from '../../../../src/components/participants/helpers/participantDataFlow';
import { useParticipants } from '../../../../src/components/participants/hooks/useParticipants';

import { mockParticipants } from './__fixtures__/participants';

jest.mock('../../../../src/components/participants/helpers/participantDataFlow', () => ({
  loadParticipants: jest.fn(),
}));

describe('useParticipants', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('should return LOADING initially', () => {
    // Mock getAllParticipants to not resolve immediately
    (loadParticipants as jest.Mock).mockReturnValue(new Promise(() => {
    }));

    const { result } = renderHook(() => useParticipants());

    expect(result.current.viewContentType).toBe('LOADING');
    expect(result.current.participants).toEqual([]);
  });

  it('should return SHOW_PARTICIPANTS when participants are fetched', async () => {
    // Mock loadParticipants to resolve with participant data
    (loadParticipants as jest.Mock).mockResolvedValue(mockParticipants);

    const { result } = renderHook(() => useParticipants());

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_PARTICIPANTS'));
    expect(result.current.participants).toEqual(mockParticipants);
  });

  it('should return SHOW_NO_RESULTS when no participants are found', async () => {
    // Mock loadParticipants to resolve with an empty array
    (loadParticipants as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useParticipants());

    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_NO_RESULTS'));
    expect(result.current.participants).toEqual([]);
  });

  it('should filter participants based on search text', async () => {
    // Mock loadParticipants to resolve with participant data including "msg systems ag"
    const filteredParticipants = [
      { id: 1, name: 'msg systems ag' },
      { id: 2, name: 'other company' },
    ];
    (loadParticipants as jest.Mock).mockResolvedValue(filteredParticipants);

    const { result } = renderHook(() => useParticipants());

    // Wait for participants to load
    await waitFor(() => expect(result.current.viewContentType).toBe('SHOW_PARTICIPANTS'));

    // Search for "msg systems ag"
    result.current.search('msg systems ag');

    // Check that the filtered participants contain only the expected result
    await waitFor(() => {
      expect(result.current.participants).toEqual([{ id: 1, name: 'msg systems ag' }]);
    });
  });
});
