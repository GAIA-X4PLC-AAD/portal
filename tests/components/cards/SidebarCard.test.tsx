import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import ResourceActions from '../../../src/components/resources/components/ResourceActions';

const dispatch = jest.fn();
const useResourceBuyingStateMachine = jest.fn();
jest.mock('../../../src/components/resources/hooks/useResourceBuyingStateMachine', () => ({
  useResourceBuyingStateMachine: (params) => useResourceBuyingStateMachine(params)
}))
jest.mock('i18next', () => ({
  t: (translationId: string) => translationId
}))

console.error = jest.fn()
describe('SidebarCard', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('does not render dialogs in init state', () => {
    useResourceBuyingStateMachine.mockReturnValue({ state: { name: 'INIT', } });

    const { queryByText, queryByDisplayValue, getByRole } = render(<ResourceActions/>)
    expect(queryByText('some error message')).not.toBeInTheDocument()
    expect(queryByDisplayValue('edc consumer base url')).not.toBeInTheDocument()
    expect(queryByDisplayValue('account')).not.toBeInTheDocument()
    expect(queryByDisplayValue('container')).not.toBeInTheDocument()
    expect(getByRole('button', { name: 'details.sidebar-buy-button' })).toBeDisabled()
  })

  it('displays notification dialog if state is ERROR_NOTIFICATION_DIALOG', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: 'some error message'
      }
    });

    const { getByText } = render(<ResourceActions/>)
    expect(getByText('some error message')).toBeInTheDocument()
  })

  it('displays notification dialog if state is ERROR_NOTIFICATION_DIALOG', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: 'some error message'
      },
      dispatch
    });

    const { getByRole } = render(<ResourceActions/>)

    const buyButton = getByRole('button', { name: 'common.close' })
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

    const { getByDisplayValue } = render(<ResourceActions/>)

    expect(getByDisplayValue('edc consumer base url')).toBeInTheDocument()
    expect(getByDisplayValue('account')).toBeInTheDocument()
    expect(getByDisplayValue('container')).toBeInTheDocument()
  })

  it('displays data transfer initiation progress dialog if state is RETRIEVE_CONTRACT_INFORMATION', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'RETRIEVE_CONTRACT_INFORMATION',
      }
    });

    const { getByText } = render(<ResourceActions/>)

    expect(getByText('buy-dialog.retrieve-contract-info')).toBeInTheDocument()
  })

  it('displays data transfer initiation progress dialog if state is CONTRACT_NEGOTIATION', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'CONTRACT_NEGOTIATION',
      }
    });

    const { getByText } = render(<ResourceActions/>)

    expect(getByText('buy-dialog.negotiate-contract')).toBeInTheDocument()
  })

  it('displays data transfer initiation progress dialog if state is RETRIEVE_AGREEMENT_INFORMATION', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'RETRIEVE_AGREEMENT_INFORMATION',
      }
    });

    const { getByText } = render(<ResourceActions/>)

    expect(getByText('buy-dialog.retrieve-agreement-info')).toBeInTheDocument()
  })

  it('displays data transfer initiation progress dialog if state is DATA_TRANSFER_INITIATION', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'DATA_TRANSFER_INITIATION',
      }
    });

    const { getByText } = render(<ResourceActions/>)

    expect(getByText('buy-dialog.initiate-data-transfer')).toBeInTheDocument()
  })

  it('enables buy button if state is TRANSfER_ENABLED', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'TRANSFER_ENABLED',
      }
    });

    const { getByRole } = render(<ResourceActions/>)
    expect(getByRole('button', { name: 'details.sidebar-buy-button' })).not.toBeDisabled()
  })

  it('enables buy button if state is FINISHED', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'FINISHED',
      }
    });

    const { getByRole } = render(<ResourceActions/>)
    expect(getByRole('button', { name: 'details.sidebar-buy-button' })).not.toBeDisabled()
  })

  it('dispatches BUY action if buy button is clicked', () => {
    useResourceBuyingStateMachine.mockReturnValue({
      state: {
        name: 'TRANSFER_ENABLED',
      },
      dispatch
    });

    const { getByRole } = render(<ResourceActions/>)

    const buyButton = getByRole('button', { name: 'details.sidebar-buy-button' })
    fireEvent.click(buyButton)
    expect(dispatch).toHaveBeenCalledWith({ type: 'BUY' })
  })
});
