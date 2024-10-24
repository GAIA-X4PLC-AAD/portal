import { renderHook } from '@testing-library/react';
import { act, useReducer } from 'react';

import {
  initialResourceBuyingStateMachineState as initialState,
  resourceBuyingStateMachine
} from '../../../../src/components/resources/helpers/resourceBuyingStateMachine';
import {
  ContractNegotiationInput,
  DataTransferInitiationInput,
  DataTransferStatusCheckInput,
  RetrieveAgreementInput,
  RetrieveContractInfoInput
} from '../../../../src/types/edc.model';
import { ResourceDetails } from '../../../../src/types/resources.model';

jest.mock('i18next', () => ({
  t: (translationId: string) => translationId
}))

describe('resourceBuyingStateMachine', () => {
  const contractId = '12345678'
  const edcConsumerBaseUrl = 'https://edc-co.gxfs.gx4fm.org';
  const edcProducerBaseUrl = 'https://edc-pr.gxfs.gx4fm.org';
  const resourceDetails = { contractId } as ResourceDetails
  const retrieveContractInfoInput = {
    contractId,
    edcConsumerBaseUrl,
    dataDestinationContainer: 'container',
    dataDestinationAccount: 'account'
  } as RetrieveContractInfoInput
  const contractNegotiationInput = {
    edcConsumerBaseUrl,
    edcProducerBaseUrl,
    contractDefinitionId: '5646545-4464-646464',
    assetNameFull: 'bullwhip'
  } as ContractNegotiationInput
  const retrieveAgreementInfoInput = {
    edcConsumerBaseUrl,
    contractNegotiationUID: '27492379-hktwert-rtwjlre-ret23423'
  } as RetrieveAgreementInput
  const dataTransferInitiationInput = {
    edcConsumerBaseUrl,
    edcProducerBaseUrl,
    dataDestinationContainer: 'container',
    dataDestinationAccount: 'account',
  } as DataTransferInitiationInput
  const dataTransferStatusCheckInput = {
    edcConsumerBaseUrl,
    transferProcessId: '12345678'
  } as DataTransferStatusCheckInput

  describe('transitions from INIT state', () => {
    it('is in INIT state when it is created', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      expect(state).toEqual(initialState)
    })

    it('enables buy button, if contractId exists', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('disables buy button, if contractId not exists', () => {
      const resourceDetails = { contractId: undefined } as ResourceDetails
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_DISABLED' })
    })
  });

  describe('transitions from TRANSFER_ENABLED state', () => {
    it('opens transfer popup dialog, if buy button is pressed', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_DIALOG' })
    })
  });

  describe('transitions from TRANSFER_DIALOG state', () => {
    it('closes the dialog if cancel button is pressed, and the buy button is still enabled', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'CANCEL' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('keeps dialog open and displays a validation message, if a contractId field is empty', () => {
      const invalidDataTransferInput: RetrieveContractInfoInput = {
        ...retrieveContractInfoInput,
        contractId: undefined
      }
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION',
        payload: { retrieveContractInfoInput: invalidDataTransferInput }
      }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_DIALOG' })
    })

    it('keeps dialog open and displays a validation message, if a consumerBaseUrl field is empty', () => {
      const invalidDataTransferInput: RetrieveContractInfoInput = {
        ...retrieveContractInfoInput,
        edcConsumerBaseUrl: undefined
      }
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION',
        payload: { retrieveContractInfoInput: invalidDataTransferInput }
      }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_DIALOG' })
    })

    it('keeps dialog open and displays a validation message, if a container field is empty', () => {
      const invalidDataTransferInput: RetrieveContractInfoInput = {
        ...retrieveContractInfoInput,
        dataDestinationContainer: undefined
      }
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION',
        payload: { retrieveContractInfoInput: invalidDataTransferInput }
      }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_DIALOG' })
    })

    it('keeps dialog open and displays a validation message, if a account field is empty', () => {
      const invalidDataTransferInput: RetrieveContractInfoInput = {
        ...retrieveContractInfoInput,
        dataDestinationAccount: undefined
      }
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION',
        payload: { retrieveContractInfoInput: invalidDataTransferInput }
      }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_DIALOG' })
    })

    it('retrieves contract info, if all inputs are valid', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'RETRIEVE_CONTRACT_INFORMATION' })
    })
  });

  describe('transitions from RETRIEVE_CONTRACT_INFO state', () => {
    it('cancels the retrieve contract info process, if cancel button is clicked', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'CANCEL' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('shows an error notification dialog with an error message, ' +
      'if an error was thrown during contract info retrieve', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'ERROR', payload: { message: 'failed-to-retrieve-contract-info' } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'ERROR_NOTIFICATION_DIALOG', message: 'failed-to-retrieve-contract-info' })
    })

    it('closes the error notification dialog, and goes back to showing the buy button in enabled state, ' +
      'if an error was thrown during retrieving contract information', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'ERROR', payload: { message: 'Error during retrieving contract info' } }))
      act(() => dispatch({ type: 'CLOSE' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('negotiates contract, if contract information was transferred correctly', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'CONTRACT_NEGOTIATION' })
    })
  });

  describe('transitions from CONTRACT_NEGOTIATION state', () => {
    it('cancels contract negotiation, if cancel button was clicked', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      act(() => dispatch({ type: 'CANCEL' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('shows an error notification dialog with an error message, ' +
      'if an error was thrown during contract negotiation', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      act(() => dispatch({ type: 'ERROR', payload: { message: 'contract-negotiation-failed' } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'ERROR_NOTIFICATION_DIALOG', message: 'contract-negotiation-failed' })
    })

    it('closes the error notification dialog, and goes back to showing the buy button in enabled state, ' +
      'if an error was thrown during contract negotiation', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      act(() => dispatch({ type: 'ERROR', payload: { message: 'Error during contract negotiation' } }))
      act(() => dispatch({ type: 'CLOSE' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('retrieves agreement information, if contract negotiation was successful', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'RETRIEVE_AGREEMENT_INFORMATION', nrOfRetires: 0 })
    })
  });

  describe('transitions from RETRIEVE_AGREEMENT_INFORMATION state', () => {
    it('cancels contract agreement retrieval, if cancel button is pressed', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'CANCEL' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('shows an error notification dialog with an error message, if an error was thrown during agreement retrieval', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({
        type: 'ERROR',
        payload: { message: 'failed-to-retrieve-agreement-info' }
      }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'ERROR_NOTIFICATION_DIALOG', message: 'failed-to-retrieve-agreement-info' })
    })

    it('retries to retrieve agreement information and increments counter, if previous attempt was unsuccessful', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i < 10; ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
        const [newState] = result.current
        expect(newState).toEqual({ name: 'RETRIEVE_AGREEMENT_INFORMATION', nrOfRetires: i })
      }
    })

    it('shows an error notification dialog with an error message, after 10 retry attempts', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= 10; ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }

      const [newState] = result.current
      expect(newState).toEqual({
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: 'failed-to-retrieve-agreement-info'
      })
    })

    it('close error message, after 10 retry attempts failure', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= 10; ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'CLOSE' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED', })
    })

    it('initiates data transfer, if contract agreement was fetched correctly', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'DATA_TRANSFER_INITIATION' })
    })
  });

  describe('transitions from DATA_TRANSFER_INITIATION state', () => {
    it('cancels contract agreement retrieval, if cancel button is pressed', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CANCEL' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('shows an error notification dialog with an error message, ' +
      'if an error was thrown during data transfer initiation', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'ERROR', payload: { message: 'data-transfer-initiation-failed' } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'ERROR_NOTIFICATION_DIALOG', message: 'data-transfer-initiation-failed' })
    })

    it('close error notification dialog, ' +
      'if an error was thrown during data transfer initiation', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'ERROR', payload: { message: 'data-transfer-initiation-failed' } }))
      act(() => dispatch({ type: 'CLOSE' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('starts checking data transfer status, if data transfer initiation was successful', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS', payload: { dataTransferStatusCheckInput } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'CHECKING_DATA_TRANSFER_STATUS', dataTransferStatusCheckInput, nrOfRetries: 0 })
    })
  });

  describe('transitions from CHECKING_DATA_TRANSFER_STATUS state', () => {
    it('show an error notification dialog with an error message, ' +
      'if an error was thrown during checking data transfer status', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS', payload: { dataTransferStatusCheckInput } }))
      act(() => dispatch({ type: 'ERROR', payload: { message: 'check-data-transfer-status-failed' } }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'ERROR_NOTIFICATION_DIALOG', message: 'check-data-transfer-status-failed' })
    })

    it('closes error notification dialog, ' +
      'if an error was thrown during the data transfer status check!', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS', payload: { dataTransferStatusCheckInput } }))
      act(() => dispatch({ type: 'ERROR', payload: { message: 'check-data-transfer-status-failed' } }))
      act(() => dispatch({ type: 'CLOSE' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })

    it('displays transfer status, if data transfer status check was successful', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS', payload: { dataTransferStatusCheckInput } }))
      act(() => dispatch({ type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: { status: 'COMPLETED' } }))

      const [newState] = result.current
      expect(newState).toEqual({
        name: 'DISPLAY_DATA_TRANSFER_STATUS',
        status: 'COMPLETED',
        nrOfRetries: 0,
        dataTransferStatusCheckInput
      })
    })
  });

  describe('transitions from DISPLAY_DATA_TRANSFER_STATUS state', () => {
    it('retries data transfer status check and counts the retries, if status is not COMPLETED', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      for (let i = 0; i <= Math.ceil(Math.random() * 9); ++i) {
        act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      }
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS', payload: { dataTransferStatusCheckInput } }))
      for (let i = 1; i <= Math.ceil(Math.random() * 6); ++i) {
        act(() => dispatch({ type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: { status: 'INITIATED' } }))
        act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS' }))
        const [newState] = result.current
        expect(newState).toEqual({
          name: 'CHECKING_DATA_TRANSFER_STATUS',
          dataTransferStatusCheckInput,
          nrOfRetries: i,
        })
      }
    });

    it('shows error message, if status is not COMPLETED and there were 6 attempts to check data transfer status', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS', payload: { dataTransferStatusCheckInput } }))
      for (let i = 1; i <= 7; ++i) {
        act(() => dispatch({ type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: { status: 'INITIATED' } }))
        act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS' }))
      }
      const [newState] = result.current
      expect(newState).toEqual({ name: 'ERROR_NOTIFICATION_DIALOG', message: 'check-data-transfer-status-failed' })
    })

    it('stops, if data transfer status is COMPLETED', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS', payload: { dataTransferStatusCheckInput } }))
      for (let i = 1; i <= Math.ceil(Math.random() * 6); ++i) {
        act(() => dispatch({ type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: { status: 'INITIATED' } }))
        act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS' }))
      }
      act(() => dispatch({ type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: { status: 'COMPLETED' } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'FINISHED' })

    })
  })

  describe('transitions from FINISHED state', () => {
    it('starts over,  if buy button is clicked', () => {
      const { result } = renderHook(() => useReducer(resourceBuyingStateMachine, initialState));
      const [state, dispatch] = result.current

      act(() => dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails } }))
      act(() => dispatch({ type: 'BUY' }))
      act(() => dispatch({ type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput } }))
      act(() => dispatch({ type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput } }))
      act(() => dispatch({ type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput } }))
      act(() => dispatch({ type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS', payload: { dataTransferStatusCheckInput } }))
      for (let i = 1; i <= Math.ceil(Math.random() * 6); ++i) {
        act(() => dispatch({ type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: { status: 'INITIATED' } }))
        act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS' }))
      }
      act(() => dispatch({ type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: { status: 'COMPLETED' } }))
      act(() => dispatch({ type: 'CHECK_DATA_TRANSFER_STATUS' }))
      act(() => dispatch({ type: 'BUY' }))

      const [newState] = result.current
      expect(newState).toEqual({ name: 'TRANSFER_ENABLED' })
    })
  });
});
