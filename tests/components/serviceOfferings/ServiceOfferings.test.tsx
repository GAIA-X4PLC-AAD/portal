import { render } from '@testing-library/react';
import React from 'react'

import ServiceOfferings from '../../../src/components/serviceOfferings/ServiceOfferings';
import { ServiceOffering } from '../../../src/types/serviceOfferings.model';
import { withRouter } from '../../common/testHelper';

const useServiceOfferings = jest.fn()
jest.mock('../../../src/components/serviceOfferings/useServiceOfferings', () => ({
  useServiceOfferings: () => useServiceOfferings(),
}))
jest.mock('i18next', () => ({
  t: (translationId) => translationId,
}))

console.error = jest.fn()
describe('ServiceOffering', () => {
  it('renders content if state is SHOW_OFFERINGS', () => {
    useServiceOfferings.mockReturnValue({
      state: 'SHOW_OFFERINGS',
      serviceOfferings: [
        {
          name: 'ServiceOffering 1',
          label: 'ServiceOffering 1 label',
          claimsGraphUri: 'claims-graph-uri 1',
          uri: 'uri1',
          description: 'description 1',
          policy: 'policy 1'
        },
        {
          name: 'ServiceOffering 2',
          label: 'ServiceOffering 2 label',
          claimsGraphUri: 'claims-graph-uri 2',
          uri: 'uri2',
          description: 'description 2',
          policy: 'policy 2'
        }
      ] as ServiceOffering[],
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
