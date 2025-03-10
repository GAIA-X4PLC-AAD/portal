import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import { ResourceDetailsContext } from '../../../../src/components/context/ResourceDetailsContext';
import ResourceActions from '../../../../src/components/resources/components/ResourceActions';
import { getAllSelfDescriptionDetails } from '../../../../src/helpers/selfDescriptionDataFlow';
import { downloadFile } from '../../../../src/utils/fileUtils';

const dispatch = jest.fn();
const useResourceBuyingStateMachine = jest.fn();

const renderComponent = (mockDetails?) => {
  return render(
    mockDetails ? (
      <ResourceDetailsContext.Provider value={mockDetails}>
        <ResourceActions />
      </ResourceDetailsContext.Provider>
    ) : (
      <ResourceActions />
    )
  );
}

jest.mock('../../../../src/components/resources/hooks/useResourceBuyingStateMachine', () => ({
  useResourceBuyingStateMachine: (params) => useResourceBuyingStateMachine(params)
}))
jest.mock('i18next', () => ({
  t: (translationId: string) => translationId
}))
jest.mock('../../../../src/helpers/selfDescriptionDataFlow');
jest.mock('../../../../src/utils/fileUtils', () => ({
  downloadFile: jest.fn(),
}));

console.error = jest.fn()
describe('ResourceActions', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('does not render dialogs in init state', () => {
    useResourceBuyingStateMachine.mockReturnValue({ state: { name: 'INIT', } });

    renderComponent();
    expect(screen.queryByText('some error message')).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue('edc consumer base url')).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue('account')).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue('container')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'details.sidebar-buy-button' })).toBeDisabled()
  })

  it('displays notification dialog if state is ERROR_NOTIFICATION_DIALOG', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: 'some error message'
      }
    });

    renderComponent();
    expect(screen.getByText('some error message')).toBeInTheDocument()
  })

  it('displays notification dialog if state is ERROR_NOTIFICATION_DIALOG', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: 'some error message'
      },
      dispatch
    });

    renderComponent();

    const buyButton = screen.getByRole('button', { name: 'common.close' })
    fireEvent.click(buyButton)
    expect(dispatch).toHaveBeenCalledWith({ type: 'CLOSE' })
  })

  it('displays resource buying modal dialog if state is TRANSFER_DIALOG', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'TRANSFER_DIALOG',
        edcConsumerBaseUrl: 'edc consumer base url',
        dataDestinationAccount: 'account',
        dataDestinationContainer: 'container',
      }
    });

    renderComponent();

    expect(screen.getByDisplayValue('edc consumer base url')).toBeInTheDocument()
    expect(screen.getByDisplayValue('account')).toBeInTheDocument()
    expect(screen.getByDisplayValue('container')).toBeInTheDocument()
  })

  it('displays data transfer initiation progress dialog if state is RETRIEVE_CONTRACT_INFORMATION', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'RETRIEVE_CONTRACT_INFORMATION',
      }
    });

    renderComponent();

    expect(screen.getByText('buy-dialog.retrieve-contract-info')).toBeInTheDocument()
  })

  it('displays data transfer initiation progress dialog if state is CONTRACT_NEGOTIATION', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'CONTRACT_NEGOTIATION',
      }
    });

    renderComponent();

    expect(screen.getByText('buy-dialog.negotiate-contract')).toBeInTheDocument()
  })

  it('displays data transfer initiation progress dialog if state is RETRIEVE_AGREEMENT_INFORMATION', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'RETRIEVE_AGREEMENT_INFORMATION',
      }
    });

    renderComponent();

    expect(screen.getByText('buy-dialog.retrieve-agreement-info')).toBeInTheDocument()
  })

  it('displays data transfer initiation progress dialog if state is DATA_TRANSFER_INITIATION', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'DATA_TRANSFER_INITIATION',
      }
    });

    renderComponent();

    expect(screen.getByText('buy-dialog.initiate-data-transfer')).toBeInTheDocument()
  })

  it('enables buy button if state is TRANSfER_ENABLED', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'TRANSFER_ENABLED',
      }
    });

    renderComponent();
    expect(screen.getByRole('button', { name: 'details.sidebar-buy-button' })).not.toBeDisabled()
  })

  it('enables buy button if state is FINISHED', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'FINISHED',
      }
    });

    renderComponent();
    expect(screen.getByRole('button', { name: 'details.sidebar-buy-button' })).not.toBeDisabled()
  })

  it('dispatches BUY action if buy button is clicked', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'TRANSFER_ENABLED',
      },
      dispatch
    });

    renderComponent();

    const buyButton = screen.getByRole('button', { name: 'details.sidebar-buy-button' })
    fireEvent.click(buyButton)
    expect(dispatch).toHaveBeenCalledWith({ type: 'BUY' })
  })

  it('shows download button when serviceOfferingDetails exist and response length is greater than 0', async () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'CONTRACT_NEGOTIATION',
      }
    });

    const mockDetails = { details: { claimsGraphUri: 'test-uri', contractId: 'test-contract-id' } };
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
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'CONTRACT_NEGOTIATION',
      }
    });

    const mockDetails = { details: { contractId: 'test-contract-id' } };

    renderComponent (mockDetails);

    expect(screen.queryByText('resources.download-description')).not.toBeInTheDocument();
    expect(screen.queryByText('Actions')).toBeInTheDocument();
    expect(screen.queryByText('details.view-graph')).toBeInTheDocument();
    expect(screen.queryByText('details.sidebar-buy-button')).toBeInTheDocument();
  });

  it('does not show download button when response length is 0', async () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'CONTRACT_NEGOTIATION',
      }
    });

    const mockDetails = { details: { claimsGraphUri: 'test-uri', contractId: 'test-contract-id' } };
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
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'CONTRACT_NEGOTIATION',
      }
    });

    const mockDetails = { details: { claimsGraphUri: 'test-uri', contractId: 'test-contract-id' } };
    const mockResponse = [{ holder: 'holder1' }];

    (getAllSelfDescriptionDetails as jest.Mock).mockResolvedValue(mockResponse);

    renderComponent (mockDetails);

    await waitFor(() => {
      const button = screen.getByText('resources.download-description');
      fireEvent.click(button);
    });
    expect(downloadFile).toHaveBeenCalledTimes(1)
  });
});
