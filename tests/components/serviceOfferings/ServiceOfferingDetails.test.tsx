import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import ServiceOfferingDetails from '../../../src/components/serviceOfferings/ServiceOfferingDetails';
import { withRouter } from '../../common/testHelper';

import { normal_render } from './__fixtures__/useServiceOffering_serviceOfferingDetails';

const useServiceOfferingDetails = jest.fn();

jest.mock('../../../src/components/serviceOfferings/hooks/useServiceOfferingDetails', () => ({
  useServiceOfferingDetails: () => useServiceOfferingDetails(),
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ServiceOfferingDetails', () => {
  beforeAll(() => {
    useServiceOfferingDetails.mockReturnValue(normal_render);
  })

  it('renders a ServiceOfferingDetails correctly', () => {
    const { getByRole } = render(withRouter(<ServiceOfferingDetails/>));

    //Check the heading
    expect(getByRole('heading', { name: /service-offerings.detail-title → TT Data Processing Service/i })).toBeInTheDocument();
  })
})
