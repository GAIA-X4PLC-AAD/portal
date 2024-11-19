import { fireEvent, render } from '@testing-library/react'
import React from 'react';

import DataTransferInitiationProgress
  from '../../../../src/components/resources/components/DataTransferInitiationProgress';
import { ResourceBuyingState } from '../../../../src/components/resources/helpers/resourceBuyingStateMachine';

jest.mock('i18next', () => ({
  t: (translationId: string) => translationId,
}))

describe('DataTransferInitiationProgress', () => {
  const dispatch = jest.fn()

  it('is closed for any other state than: RETRIEVE_CONTRACT_INFORMATION, CONTRACT_NEGOTIATION,' +
    ' RETRIEVE_AGREEMENT_INFORMATION, DATA_TRANSFER_INITIATION', () => {
    const state = { name: 'INIT' } as ResourceBuyingState
    const { queryByText, queryByRole } = render(
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
    );
    expect(queryByText('buy-dialog.retrieve-contract-info')).toBeNull();
    expect(queryByRole('progressbar')).toBeNull();
  })

  it('is visible and contains the following status text: buy-dialog.retrieve-contract-info if state equals to' +
    ' RETRIEVE_CONTRACT_INFORMATION', () => {
    const state = { name: 'RETRIEVE_CONTRACT_INFORMATION' } as ResourceBuyingState
    const { getByText, getByRole } = render(
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
    );
    expect(getByText('buy-dialog.retrieve-contract-info')).not.toBeNull();
    expect(getByRole('progressbar').value).toBe(1)
  })

  it('is visible and contains the following status text: buy-dialog.negotiate-contract if state equals to' +
    ' CONTRACT_NEGOTIATION', () => {
    const state = { name: 'CONTRACT_NEGOTIATION' } as ResourceBuyingState
    const { getByText, getByRole } = render(
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
    );
    expect(getByText('buy-dialog.negotiate-contract')).not.toBeNull();
    expect(getByRole('progressbar').value).toBe(2)
  })

  it('is visible and contains the following status text: buy-dialog.retrieve-agreement-info if state equals to' +
    ' RETRIEVE_AGREEMENT_INFORMATION and nrOfRetries is 0', () => {
    const state = { name: 'RETRIEVE_AGREEMENT_INFORMATION', nrOfRetries: 0 } as ResourceBuyingState
    const { getByText, getByRole } = render(
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
    );
    expect(getByText('buy-dialog.retrieve-agreement-info')).not.toBeNull();
    expect(getByRole('progressbar').value).toBe(3)
  })

  it('is visible and contains the following status text: buy-dialog.retrieve-agreement-info (3/10) if state equals to' +
    ' RETRIEVE_AGREEMENT_INFORMATION and nrOfRetries is 3', () => {
    const state = { name: 'RETRIEVE_AGREEMENT_INFORMATION', nrOfRetries: 3 } as ResourceBuyingState
    const { getByText, getByRole } = render(
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
    );
    expect(getByText('buy-dialog.retrieve-agreement-info (3 / 10)')).not.toBeNull();
    expect(getByRole('progressbar').value).toBe(6)
  })

  it('is visible and contains the following status text: buy-dialog.initiate-data-transfer if state equals to' +
    ' DATA_TRANSFER_INITIATION', () => {
    const state = { name: 'DATA_TRANSFER_INITIATION' } as ResourceBuyingState
    const { getByText, getByRole } = render(
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
    );
    expect(getByText('buy-dialog.initiate-data-transfer')).not.toBeNull();
    expect(getByRole('progressbar').value).toBe(13)
  })

  it('can be cancelled', () => {
    const state = { name: 'RETRIEVE_CONTRACT_INFORMATION' } as ResourceBuyingState
    const { getByRole } = render(
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
    );
    const xButton = getByRole('button', { name: '×' })
    fireEvent.click(xButton)
    expect(dispatch).toHaveBeenCalledWith({ type: 'CANCEL' })
  })

  it('can be cancelled', () => {
    const state = { name: 'RETRIEVE_CONTRACT_INFORMATION' } as ResourceBuyingState
    const { getByRole } = render(
      <DataTransferInitiationProgress
        state={state}
        dispatch={dispatch}
      />
    );
    const xButton = getByRole('button', { name: 'buy-dialog.cancel-button' })
    fireEvent.click(xButton)
    expect(dispatch).toHaveBeenCalledWith({ type: 'CANCEL' })
  })
});
