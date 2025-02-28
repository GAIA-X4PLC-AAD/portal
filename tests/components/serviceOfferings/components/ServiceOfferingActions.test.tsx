import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { ServiceOfferingDetailsContext } from '../../../../src/components/context/ServiceOfferingDetailsContext';
import ServiceOfferingActions from '../../../../src/components/serviceOfferings/components/ServiceOfferingActions';
import { getAllSelfDescriptionDetails } from '../../../../src/helpers/selfDescriptionDataFlow';
import { downloadFile } from '../../../../src/utils/fileUtils';

jest.mock('../../../../src/helpers/selfDescriptionDataFlow');
jest.mock('../../../../src/utils/fileUtils', () => ({
  downloadFile: jest.fn(),
}));

const renderComponent = (mockDetails?) => {
  return render(
    mockDetails ? (
      <ServiceOfferingDetailsContext.Provider value={mockDetails}>
        <ServiceOfferingActions />
      </ServiceOfferingDetailsContext.Provider>
    ) : (
      <ServiceOfferingActions />
    )
  );
}

describe('ServiceOfferingActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Clears mocks between tests to avoid interference
  });

  it('shows download button when serviceOfferingDetails exist and response length is greater than 0', async () => {
    const mockDetails = { serviceOfferingDetails: { claimsGraphUri: 'test-uri' } };
    const mockResponse = [{ holder: 'holder1' }];
    (getAllSelfDescriptionDetails as jest.Mock).mockResolvedValue(mockResponse);

    renderComponent (mockDetails);

    await waitFor(() => {
      expect(screen.getByText('resources.download-description')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
      expect(screen.getByText('details.view-graph')).toBeInTheDocument();
      expect(screen.getByText('details.sidebar-buy-button')).toBeInTheDocument();
    });
  });

  it('does not show download button when serviceOfferingDetails do not exist', () => {
    const mockDetails = { serviceOfferingDetails: null };

    renderComponent (mockDetails);

    expect(screen.queryByText('resources.download-description')).not.toBeInTheDocument();
    expect(screen.queryByText('Actions')).toBeInTheDocument();
    expect(screen.queryByText('details.view-graph')).toBeInTheDocument();
    expect(screen.queryByText('details.sidebar-buy-button')).toBeInTheDocument();
  });

  it('does not show download button when response length is 0', async () => {
    const mockDetails = { serviceOfferingDetails: { claimsGraphUri: 'test-uri' } };
    const mockResponse = [];
    (getAllSelfDescriptionDetails as jest.Mock).mockResolvedValue(mockResponse);

    renderComponent (mockDetails);

    await waitFor(() => {
      expect(screen.queryByText('resources.download-description')).not.toBeInTheDocument();
      expect(screen.queryByText('Actions')).toBeInTheDocument();
      expect(screen.queryByText('details.view-graph')).toBeInTheDocument();
      expect(screen.queryByText('details.sidebar-buy-button')).toBeInTheDocument();
    });
  });

  it('calls appropriate function when download description button is clicked', async () => {
    const mockDetails = { serviceOfferingDetails: { claimsGraphUri: 'test-uri' } };
    const mockResponse = [{ holder: 'holder1' }];

    (getAllSelfDescriptionDetails as jest.Mock).mockResolvedValue(mockResponse);

    renderComponent (mockDetails);

    await waitFor(() => {
      const button = screen.getByText('resources.download-description');
      fireEvent.click(button);
    });
    expect(downloadFile).toHaveBeenCalledTimes(1)
  });

  it('calls appropriate function when view graph button is clicked', () => {
    renderComponent();
    const button = screen.getByText('details.view-graph');

    fireEvent.click(button);
    // Add any expected behavior verification for the click here
  });

  it('calls appropriate function when buy button is clicked', () => {
    renderComponent();
    const button = screen.getByText('details.sidebar-buy-button');

    fireEvent.click(button);
    // Add any expected behavior verification for the click here
  });
});
