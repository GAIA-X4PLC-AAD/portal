import { render } from '@testing-library/react';
import React from 'react'

import ServiceOfferings from '../../../src/components/serviceOfferings/ServiceOfferings';
import { ServiceOffering } from '../../../src/types/serviceOfferings.model';
import { withRouter } from '../../common/testHelper';

import { mockServiceOfferings } from './__fixtures__/mockServiceOfferings';

const useServiceOfferings = jest.fn()
jest.mock('../../../src/components/serviceOfferings/hooks/useServiceOfferings', () => ({
  useServiceOfferings: () => useServiceOfferings(),
}))

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ServiceOffering', () => {
  it('renders content if state is SHOW_OFFERINGS', () => {
    useServiceOfferings.mockReturnValue({
      state: 'SHOW_OFFERINGS',
      serviceOfferings: mockServiceOfferings,
    })
    const { getByText } = render(withRouter(<ServiceOfferings/>));
    expect(getByText('ServiceOffering 1')).not.toBeNull();
    expect(getByText('ServiceOffering 2')).not.toBeNull();
  })

  it('it shows loading indicator if state is LOADING', () => {
    useServiceOfferings.mockReturnValue({
      state: 'LOADING',
      serviceOfferings: [] as ServiceOffering[],
    })
    const { queryByAltText } = render(withRouter(<ServiceOfferings/>));
    expect(queryByAltText('common.is-loading')).not.toBeNull();
  })

  it('shows text no content if there is no content', () => {
    useServiceOfferings.mockReturnValue({
      state: 'SHOW_NO_RESULTS',
      serviceOfferings: [] as ServiceOffering[],
    })
    const { queryByText } = render(withRouter(<ServiceOfferings/>));
    expect(queryByText('service-offerings.no-offerings-available')).not.toBeNull();
  })
});
