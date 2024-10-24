import { t } from 'i18next';

import {
  ContractNegotiationInput,
  DataTransferInitiationInput,
  DataTransferStatusCheckInput,
  DataTransferStatuses,
  RetrieveAgreementInput,
  RetrieveContractInfoInput
} from '../../../types/edc.model';
import { ResourceDetails } from '../../../types/resources.model';

////////////////////////////////////////////////////////////////////////////////
// Type definitions
////////////////////////////////////////////////////////////////////////////////
export type ResourceBuyingAction =
  | { type: 'CHECK_TRANSFER_ENABLED', payload: { resourceDetails: ResourceDetails } }
  | { type: 'CLOSE' }
  | { type: 'CANCEL' }
  | { type: 'BUY' }
  | { type: 'ERROR', payload: { message: string } }
  | { type: 'RETRIEVE_CONTRACT_INFORMATION', payload: { retrieveContractInfoInput: RetrieveContractInfoInput } }
  | { type: 'NEGOTIATE_CONTRACT', payload: { contractNegotiationInput: ContractNegotiationInput } }
  | { type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: { retrieveAgreementInfoInput: RetrieveAgreementInput } }
  | { type: 'INITIATE_DATA_TRANSFER', payload: { dataTransferInitiationInput: DataTransferInitiationInput } }
  | { type: 'CHECK_DATA_TRANSFER_STATUS', payload?: { dataTransferStatusCheckInput: DataTransferStatusCheckInput } }
  | { type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: { status: DataTransferStatuses } }

export type ResourceBuyingState =
  | { name: 'INIT' }
  | { name: 'TRANSFER_ENABLED' }
  | { name: 'TRANSFER_DISABLED' }
  | { name: 'TRANSFER_DIALOG' }
  | { name: 'ERROR_NOTIFICATION_DIALOG', message: string }
  | { name: 'RETRIEVE_CONTRACT_INFORMATION' }
  | { name: 'CONTRACT_NEGOTIATION' }
  | { name: 'RETRIEVE_AGREEMENT_INFORMATION', nrOfRetires: number }
  | { name: 'DATA_TRANSFER_INITIATION' }
  |
  {
    name: 'CHECKING_DATA_TRANSFER_STATUS',
    nrOfRetries: number,
    dataTransferStatusCheckInput: DataTransferStatusCheckInput
  }
  |
  {
    name: 'DISPLAY_DATA_TRANSFER_STATUS',
    status: string,
    nrOfRetries: number,
    dataTransferStatusCheckInput: DataTransferStatusCheckInput
  }
  | { name: 'FINISHED' }

////////////////////////////////////////////////////////////////////////////////
// Initial state
////////////////////////////////////////////////////////////////////////////////
export const initialResourceBuyingStateMachineState: ResourceBuyingState = { name: 'INIT' }

////////////////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////////////////
export const resourceBuyingStateMachine = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  switch (state.name) {
  case 'INIT':
    return transitionsOfInitState(state, action)
  case 'TRANSFER_ENABLED':
    return transitionsOfTransferEnabledState(state, action)
  case 'TRANSFER_DIALOG':
    return transitionsOfTransferDialogState(state, action)
  case 'RETRIEVE_CONTRACT_INFORMATION':
    return transitionsOfRetrieveContractInfoState(state, action)
  case 'ERROR_NOTIFICATION_DIALOG':
    return transitionsOfErrorNotificationDialogState(state, action)
  case 'CONTRACT_NEGOTIATION':
    return transitionsOfContractNegotiationsState(state, action)
  case 'RETRIEVE_AGREEMENT_INFORMATION':
    return transitionsOfRetrieveAgreementInfoState(state, action)
  case 'DATA_TRANSFER_INITIATION':
    return transitionsOfDataTransferInitiationState(state, action)
  case 'CHECKING_DATA_TRANSFER_STATUS':
    return transitionsOfDataTransferStatusCheckState(state, action)
  case 'DISPLAY_DATA_TRANSFER_STATUS':
    return transitionsOfDisplayDataTransferStatusState(state, action)
  case 'FINISHED':
    return transitionsOfFinishedState(state, action)
  }
  return state
}

const transitionsOfInitState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'CHECK_TRANSFER_ENABLED') {
    return action.payload.resourceDetails.contractId ? { name: 'TRANSFER_ENABLED' } : { name: 'TRANSFER_DISABLED' }
  }
  return state
}

const transitionsOfTransferEnabledState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'BUY') {
    return { name: 'TRANSFER_DIALOG' }
  }
  return state
}

const transitionsOfErrorNotificationDialogState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'CLOSE') {
    return { name: 'TRANSFER_ENABLED' }
  }
  return state
}

const transitionsOfTransferDialogState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'CANCEL') {
    return { name: 'TRANSFER_ENABLED' }
  }
  if (action.type === 'RETRIEVE_CONTRACT_INFORMATION') {
    if (!action.payload.retrieveContractInfoInput.contractId) {
      return { name: 'TRANSFER_DIALOG' }
    }
    if (!action.payload.retrieveContractInfoInput.edcConsumerBaseUrl) {
      return { name: 'TRANSFER_DIALOG' }
    }
    if (!action.payload.retrieveContractInfoInput.dataDestinationContainer) {
      return { name: 'TRANSFER_DIALOG' }
    }
    if (!action.payload.retrieveContractInfoInput.dataDestinationAccount) {
      return { name: 'TRANSFER_DIALOG' }
    }
    return { name: 'RETRIEVE_CONTRACT_INFORMATION' }
  }
  return state
}

const transitionsOfRetrieveContractInfoState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'CANCEL') {
    return { name: 'TRANSFER_ENABLED' }
  }
  if (action.type === 'ERROR') {
    return { name: 'ERROR_NOTIFICATION_DIALOG', message: action.payload.message }
  }
  if (action.type === 'NEGOTIATE_CONTRACT') {
    return { name: 'CONTRACT_NEGOTIATION' }
  }
  return state
}

const transitionsOfContractNegotiationsState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'CANCEL') {
    return { name: 'TRANSFER_ENABLED' }
  }
  if (action.type === 'ERROR') {
    return { name: 'ERROR_NOTIFICATION_DIALOG', message: action.payload.message }
  }
  if (action.type === 'RETRIEVE_AGREEMENT_INFORMATION') {
    return { name: 'RETRIEVE_AGREEMENT_INFORMATION', nrOfRetires: 0 }
  }
  return state
}

const transitionsOfRetrieveAgreementInfoState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'CANCEL') {
    return { name: 'TRANSFER_ENABLED' }
  }
  if (action.type === 'ERROR') {
    return { name: 'ERROR_NOTIFICATION_DIALOG', message: action.payload.message }
  }
  if (action.type === 'RETRIEVE_AGREEMENT_INFORMATION' && state.name === 'RETRIEVE_AGREEMENT_INFORMATION') {
    if (state.nrOfRetires === 9) {
      return { name: 'ERROR_NOTIFICATION_DIALOG', message: t('failed-to-retrieve-agreement-info') }
    }
    return { name: 'RETRIEVE_AGREEMENT_INFORMATION', nrOfRetires: state.nrOfRetires + 1 }
  }
  if (action.type === 'INITIATE_DATA_TRANSFER') {
    return { name: 'DATA_TRANSFER_INITIATION' }
  }
  return state
}

const transitionsOfDataTransferInitiationState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'CANCEL') {
    return { name: 'TRANSFER_ENABLED' }
  }
  if (action.type === 'ERROR') {
    return { name: 'ERROR_NOTIFICATION_DIALOG', message: action.payload.message }
  }
  if (action.type === 'CHECK_DATA_TRANSFER_STATUS') {
    if ('dataTransferStatusCheckInput' in state) {
      return {
        name: 'CHECKING_DATA_TRANSFER_STATUS',
        nrOfRetries: state.nrOfRetries + 1,
        dataTransferStatusCheckInput: state.dataTransferStatusCheckInput
      }
    } else if (action.payload) {
      return {
        name: 'CHECKING_DATA_TRANSFER_STATUS',
        nrOfRetries: 0,
        dataTransferStatusCheckInput: action.payload.dataTransferStatusCheckInput
      }
    }
  }
  return state
}

const transitionsOfDataTransferStatusCheckState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'ERROR') {
    return { name: 'ERROR_NOTIFICATION_DIALOG', message: action.payload.message }
  }
  if (action.type === 'DISPLAY_DATA_TRANSFER_STATUS') {
    if ('dataTransferStatusCheckInput' in state) {
      return {
        name: 'DISPLAY_DATA_TRANSFER_STATUS',
        status: action.payload.status,
        nrOfRetries: state.nrOfRetries,
        dataTransferStatusCheckInput: state.dataTransferStatusCheckInput
      }
    }
  }
  return state
}

const transitionsOfDisplayDataTransferStatusState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'CHECK_DATA_TRANSFER_STATUS') {
    if ('dataTransferStatusCheckInput' in state) {
      if (state.nrOfRetries >= 6) {
        return {
          name: 'ERROR_NOTIFICATION_DIALOG', message: 'check-data-transfer-status-failed'
        }
      }
      if (state.name === 'DISPLAY_DATA_TRANSFER_STATUS' && state.status === 'COMPLETED') {
        return { name: 'FINISHED' }
      }
      return {
        name: 'CHECKING_DATA_TRANSFER_STATUS',
        dataTransferStatusCheckInput: state.dataTransferStatusCheckInput,
        nrOfRetries: state.nrOfRetries + 1
      }
    }
  }
  return state
}

const transitionsOfFinishedState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (action.type === 'BUY') {
    return { name: 'TRANSFER_ENABLED' }
  }
  return state
}
