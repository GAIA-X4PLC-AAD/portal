import { act, renderHook, waitFor } from '@testing-library/react';

import { useServiceOfferings } from '../../../../src/components/serviceOfferings/hooks/useServiceOfferings';
import { mockServiceOfferings } from '../__fixtures__/mockServiceOfferings';

const loadServiceOfferings = jest.fn();
jest.mock('../../../../src/components/serviceOfferings/helpers/serviceOfferingDataFlow', () => ({
  loadServiceOfferings: () => loadServiceOfferings(),
}));

describe('useServiceOfferings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return SHOW_OFFERINGS when service offerings are fetched', async () => {
    loadServiceOfferings.mockResolvedValue(mockServiceOfferings);

    const { result } = renderHook(() => useServiceOfferings());

    await waitFor(() => expect(result.current.state).toBe('SHOW_OFFERINGS'));
    expect(result.current.serviceOfferings).toEqual(mockServiceOfferings);
  });

  it('should return SHOW_NO_RESULTS when no service offerings are found', async () => {
    loadServiceOfferings.mockResolvedValue([]);

    const { result } = renderHook(() => useServiceOfferings());

    await waitFor(() => expect(result.current.state).toBe('SHOW_NO_RESULTS'));
    expect(result.current.serviceOfferings).toEqual([]);
  });

  it('should filter service offerings based on search text', async () => {
    loadServiceOfferings.mockResolvedValue(mockServiceOfferings);

    const { result } = renderHook(() => useServiceOfferings());

    await waitFor(() => expect(result.current.state).toBe('SHOW_OFFERINGS'));

    act(() => {
      result.current.search('ServiceOffering 1');
    });

    await waitFor(() => {
      expect(result.current.serviceOfferings.length).toBe(1); // Adjust based on your mock data
    });
  });

});
