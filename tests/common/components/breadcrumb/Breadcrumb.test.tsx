import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { Breadcrumb } from '../../../../src/common/components/breadcrumb/Breadcrumb';
import { withRouter } from '../../testHelper';

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('Breadcrumb', () => {
  it('renders a breadcrumb correctly', () => {
    const { getByRole } = render(withRouter(<Breadcrumb breadcrumbs={[
      {
        label: 'Service Offerings',
        to: '/service-offerings'
      },
      {
        label: 'Service Offering Details',
        to: '/service-offerings/id'
      }
    ]}/>));
    const link_service_offerings = getByRole('link', { name: /Service Offerings/i });
    expect(link_service_offerings).toBeInTheDocument();
    expect(link_service_offerings).toHaveAttribute('href', '/service-offerings');
    const link_service_offering_details = getByRole('link', { name: /Service Offering Details/i });
    expect(link_service_offering_details).toBeInTheDocument();
    expect(link_service_offering_details).toHaveAttribute('href', '/service-offerings/id');
  });
});
