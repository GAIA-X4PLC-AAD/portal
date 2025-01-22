import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { ServiceOfferingDetailsContext } from '../../../../src/components/context/ServiceOfferingDetailsContext';
import ServiceOfferingDetailMainContent
  from '../../../../src/components/serviceOfferings/components/ServiceOfferingDetailMainContent';
import { mockServiceOfferingDetails } from '../__fixtures__/mockServiceOfferingDetails';

describe('ServiceOfferingDetailMainContent', () => {

  const renderComponent = (contextValue: any) => {
    return render(
      <ServiceOfferingDetailsContext.Provider value={contextValue}>
        <ServiceOfferingDetailMainContent/>
      </ServiceOfferingDetailsContext.Provider>
    );
  };

  it('renders nothing when no details are provided', () => {
    const { container } = renderComponent({});
    expect(container).toBeEmptyDOMElement();
  });

  it('renders main content when service offering details are provided', () => {
    const { getByText } = renderComponent({
      serviceOfferingDetails: mockServiceOfferingDetails,
      viewContentType: 'SHOW_SERVICE_OFFERING',
    });

    expect(getByText(mockServiceOfferingDetails.name)).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.description)).not.toBeNull();
    expect(getByText('common.general-details')).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.resultingFileDescription)).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.resultingFileSpecification)).not.toBeNull();
  });

  it('renders required files list correctly', () => {
    const { getByText } = renderComponent({
      serviceOfferingDetails: mockServiceOfferingDetails,
      viewContentType: 'SHOW_SERVICE_OFFERING',
    });

    mockServiceOfferingDetails.requiredFilesList.forEach((file) => {
      expect(getByText(file.specification)).not.toBeNull();
      expect(getByText(file.description)).not.toBeNull();
    });
  });

  it('renders service access point details correctly', () => {
    const { getByText } = renderComponent({
      serviceOfferingDetails: mockServiceOfferingDetails,
      viewContentType: 'SHOW_SERVICE_OFFERING',
    });

    expect(getByText(mockServiceOfferingDetails.serviceAccessPointHost)).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.serviceAccessPointName)).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.serviceAccessPointOpenAPI)).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.serviceAccessPointProtocol)).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.serviceAccessPointPort)).not.toBeNull();
  });

  it('renders hosted on details correctly', () => {
    const { getByText } = renderComponent({
      serviceOfferingDetails: mockServiceOfferingDetails,
      viewContentType: 'SHOW_SERVICE_OFFERING',
    });

    expect(getByText(mockServiceOfferingDetails.hostedOnLocation)).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.hostedOnDescription)).not.toBeNull();
    expect(getByText(mockServiceOfferingDetails.hostedOnName)).not.toBeNull();
  });

  it('renders related offerings links correctly', () => {
    const { getByText } = renderComponent({
      serviceOfferingDetails: mockServiceOfferingDetails,
      viewContentType: 'SHOW_SERVICE_OFFERING',
    });

    mockServiceOfferingDetails.claimsGraphUri.forEach((uri) => {
      expect(getByText(uri)).not.toBeNull();
    });
  });
});
