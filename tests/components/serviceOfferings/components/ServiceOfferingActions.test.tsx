import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import ServiceOfferingActions from '../../../../src/components/serviceOfferings/components/ServiceOfferingActions';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('ServiceOfferingActions', () => {
  it('renders correctly with all buttons', () => {
    const { getByText } = render(<ServiceOfferingActions/>);

    expect(getByText('Actions')).toBeInTheDocument();
    expect(getByText('resources.download-description')).toBeInTheDocument();
    expect(getByText('details.view-graph')).toBeInTheDocument();
    expect(getByText('details.sidebar-buy-button')).toBeInTheDocument();
  });

  it('calls appropriate function when download description button is clicked', () => {
    const { getByText } = render(<ServiceOfferingActions/>);
    const button = getByText('resources.download-description');

    fireEvent.click(button);
    // Add any expected behavior verification for the click here
  });

  it('calls appropriate function when view graph button is clicked', () => {
    const { getByText } = render(<ServiceOfferingActions/>);
    const button = getByText('details.view-graph');

    fireEvent.click(button);
    // Add any expected behavior verification for the click here
  });

  it('calls appropriate function when buy button is clicked', () => {
    const { getByText } = render(<ServiceOfferingActions/>);
    const button = getByText('details.sidebar-buy-button');

    fireEvent.click(button);
    // Add any expected behavior verification for the click here
  });
});
