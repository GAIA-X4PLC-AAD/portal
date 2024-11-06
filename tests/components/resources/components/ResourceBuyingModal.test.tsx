import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import ResourceBuyingModal from '../../../../src/components/resources/components/ResourceBuyingModal';

describe('ResourceBuyingModal', () => {
  console.error = jest.fn()
  const dispatch = jest.fn();

  it('is visible if status equals to TRANSFER_DIALOG', async () => {
    const { getByDisplayValue } = render(
      <ResourceBuyingModal
        state={{
          name: 'TRANSFER_DIALOG',
          edcConsumerBaseUrl: 'http://localhost:3000/',
          dataDestinationAccount: 'account',
          dataDestinationContainer: 'container',
        }}
        dispatch={dispatch}
        title={'Resource Buying Modal'}
      />
    );

    await waitFor(() => expect(getByDisplayValue('http://localhost:3000/')).not.toBeNull());
    await waitFor(() => expect(getByDisplayValue('account')).not.toBeNull());
    await waitFor(() => expect(getByDisplayValue('container')).not.toBeNull());
  })

  it('is visible if status equals to TRANSFER_DIALOG', async () => {
    const { queryByDisplayValue } = render(
      <ResourceBuyingModal
        state={{
          name: 'INIT',
          edcConsumerBaseUrl: 'http://localhost:3000/',
          dataDestinationAccount: 'account',
          dataDestinationContainer: 'container',
        }}
        dispatch={dispatch}
        title={'Resource Buying Modal'}
      />
    );

    await waitFor(() => expect(queryByDisplayValue('http://localhost:3000/')).toBeNull());
    await waitFor(() => expect(queryByDisplayValue('account')).toBeNull());
    await waitFor(() => expect(queryByDisplayValue('container')).toBeNull());
  })

  it('dispatches CANCEL event if cancel button is clicked', () => {
    const { getByRole } = render(
      <ResourceBuyingModal
        state={{
          name: 'TRANSFER_DIALOG',
          edcConsumerBaseUrl: 'http://localhost:3000/',
          dataDestinationAccount: 'account',
          dataDestinationContainer: 'container',
        }}
        dispatch={dispatch}
        title={'Resource Buying Modal'}
      />
    );
    const cancelButton = getByRole('button', { name: 'buy-dialog.cancel-button' })
    fireEvent.click(cancelButton);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'CANCEL',
    })
  })

  it('dispatches CANCEL event if x button is clicked', () => {
    const { getByRole } = render(
      <ResourceBuyingModal
        state={{
          name: 'TRANSFER_DIALOG',
          edcConsumerBaseUrl: 'http://localhost:3000/',
          dataDestinationAccount: 'account',
          dataDestinationContainer: 'container',
        }}
        dispatch={dispatch}
        title={'Resource Buying Modal'}
      />
    );
    const cancelButton = getByRole('button', { name: '×' })
    fireEvent.click(cancelButton);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'CANCEL',
    })
  })

  it('dispatches event if transfer button is clicked', () => {
    const { getByRole } = render(
      <ResourceBuyingModal
        state={{
          name: 'TRANSFER_DIALOG',
          edcConsumerBaseUrl: 'http://localhost:3000/',
          dataDestinationAccount: 'account',
          dataDestinationContainer: 'container',
        }}
        dispatch={dispatch}
        title={'Resource Buying Modal'}
      />
    );
    const transferButton = getByRole('button', { name: 'buy-dialog.transfer-button' })
    fireEvent.click(transferButton);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'RETRIEVE_CONTRACT_INFORMATION',
      payload: {
        dataDestinationAccount: 'account',
        dataDestinationContainer: 'container',
        edcConsumerBaseUrl: 'http://localhost:3000/'
      }
    })
  })

  it('empty edc consumer base url field is invalid', () => {
    const { getByRole, getByTestId } = render(
      <ResourceBuyingModal
        state={{
          name: 'TRANSFER_DIALOG',
          edcConsumerBaseUrl: 'http://localhost:3000/',
          dataDestinationAccount: 'account',
          dataDestinationContainer: 'container',
        }}
        dispatch={dispatch}
        title={'Resource Buying Modal'}
      />
    );
    const form = getByTestId('resource-buying-form');
    const edcAddressInput = getByTestId(/buy-dialog.edc-address/i);
    fireEvent.change(edcAddressInput, { target: { value: '' } })
    fireEvent.submit(form);

    expect(edcAddressInput).toBeInvalid()
  })

  it('empty destination account field is invalid', () => {
    const { getByRole, getByTestId } = render(
      <ResourceBuyingModal
        state={{
          name: 'TRANSFER_DIALOG',
          edcConsumerBaseUrl: 'http://localhost:3000/',
          dataDestinationAccount: 'account',
          dataDestinationContainer: 'container',
        }}
        dispatch={dispatch}
        title={'Resource Buying Modal'}
      />
    );
    const form = getByTestId('resource-buying-form');
    const destinationAccountInput = getByTestId(/buy-dialog.edc-destination-account/i);
    fireEvent.change(destinationAccountInput, { target: { value: '' } })
    fireEvent.submit(form);
    expect(destinationAccountInput).toBeInvalid()
  })

  it('empty destination container field is invalid', () => {
    const { getByRole, getByTestId } = render(
      <ResourceBuyingModal
        state={{
          name: 'TRANSFER_DIALOG',
          edcConsumerBaseUrl: 'http://localhost:3000/',
          dataDestinationAccount: 'account',
          dataDestinationContainer: 'container',
        }}
        dispatch={dispatch}
        title={'Resource Buying Modal'}
      />
    );
    const form = getByTestId('resource-buying-form');
    const destinationContainerInput = getByTestId(/buy-dialog.edc-destination-container/i);
    fireEvent.change(destinationContainerInput, { target: { value: '' } })
    fireEvent.submit(form);
    expect(destinationContainerInput).toBeInvalid()
  })
})
