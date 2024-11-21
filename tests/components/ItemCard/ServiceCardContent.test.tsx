import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom';
import React from 'react';

import ServiceCardContent from '../../../src/components/ItemCard/ServiceCardContent';
import { ServiceOffering } from '../../../src/types/serviceOfferings.model';
import { withRouter } from '../../common/testHelper';

const navigate = jest.fn();
const useNavigate = jest.fn(() => navigate)
jest.mock('react-router-dom', () => ({
  useNavigate: () => useNavigate()
}))

describe('ServiceCardContent', () => {
  it('renders service', () => {
    const { getByText } = render(withRouter(
      <ServiceCardContent
        service={
          {
            name: 'service name',
            description: 'service description'
          } as ServiceOffering
        }
      />))

    expect(getByText('service name')).toBeInTheDocument();
    expect(getByText('service description')).toBeInTheDocument();
  })

  it('renders service without name and description', () => {
    const { getByText } = render(withRouter(
      <ServiceCardContent
        service={
          {
            name: '',
            description: ''
          } as ServiceOffering
        }
      />))

    expect(getByText('service-offerings.no-title')).toBeInTheDocument();
    expect(getByText('service-offerings.no-description')).toBeInTheDocument();
  })

  it('handles detail button click', () => {
    const { getByRole } = render(withRouter(
      <ServiceCardContent
        service={
          {
            name: 'service name',
            description: 'service description',
            uri: 'uri'
          } as ServiceOffering
        }
      />))

    const detailButton = getByRole('button', { name: 'details.more-details' });
    fireEvent.click(detailButton);
    expect(navigate).toHaveBeenCalledWith('/services/details/uri');
  })
});
