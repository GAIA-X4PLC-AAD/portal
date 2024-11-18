import { t } from 'i18next';

import {
  ContractInfo,
  DataTransferDialogUserInput,
  DataTransferInput,
  DataTransferStatusCheckInput,
  DataTransferStatuses,
  NegotiatedContractInfo
} from '../../../types/edc.model';

////////////////////////////////////////////////////////////////////////////////
// Type definitions
////////////////////////////////////////////////////////////////////////////////
export type ResourceBuyingAction =
  | {
  type: 'CHECK_TRANSFER_ENABLED',
  payload: { contractId?: string, serviceAccessPoint?: { host: string; protocol: string } }
}
  | { type: 'CLOSE' }
  | { type: 'CANCEL' }
  | { type: 'BUY' }
  | { type: 'ERROR', payload: string }
  | { type: 'RETRIEVE_CONTRACT_INFORMATION', payload: DataTransferDialogUserInput }
  | { type: 'NEGOTIATE_CONTRACT', payload: ContractInfo }
  | { type: 'RETRIEVE_AGREEMENT_INFORMATION', payload: NegotiatedContractInfo }
  | { type: 'INITIATE_DATA_TRANSFER', payload: DataTransferInput }
  | { type: 'CHECK_DATA_TRANSFER_STATUS', payload: DataTransferStatusCheckInput }

export type ResourceBuyingState =
  {
    name: 'INIT'
  } |
  {
    name: 'TRANSFER_DISABLED'
  } |
  {
    name: 'TRANSFER_ENABLED',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string }
  } |
  {
    name: 'TRANSFER_DIALOG',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    edcConsumerBaseUrl: string,
    edcProducerBaseUrl: string,
    dataDestinationAccount: string,
    dataDestinationContainer: string
  } |
  {
    name: 'RETRIEVE_CONTRACT_INFORMATION',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    edcConsumerBaseUrl: string,
    edcProducerBaseUrl: string,
    dataDestinationAccount: string,
    dataDestinationContainer: string
  } |
  {
    name: 'CONTRACT_NEGOTIATION',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    edcConsumerBaseUrl: string,
    edcProducerBaseUrl: string,
    dataDestinationAccount: string,
    dataDestinationContainer: string,
    contractDefinitionId: string,
    assetNameFull: string
  } |
  {
    name: 'RETRIEVE_AGREEMENT_INFORMATION',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    edcConsumerBaseUrl: string,
    edcProducerBaseUrl: string,
    dataDestinationAccount: string,
    dataDestinationContainer: string,
    assetNameFull: string,
    contractNegotiationUID: string,
    nrOfRetries: number
  } |
  {
    name: 'DATA_TRANSFER_INITIATION',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    edcConsumerBaseUrl: string,
    edcProducerBaseUrl: string,
    dataDestinationAccount: string,
    dataDestinationContainer: string,
    assetNameFull: string,
    contractAgreementUID: string,
  } |
  {
    name: 'CHECKING_DATA_TRANSFER_STATUS',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    edcConsumerBaseUrl: string,
    transferProcessId: string,
    nrOfRetries: number,
    status: DataTransferStatuses
  } |
  {
    name: 'FINISHED',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    status: string
  } |
  {
    name: 'ERROR_NOTIFICATION_DIALOG',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    message: string,
  }

export interface ResourceBuyingStateMachineParams {
  contractId?: string;
  serviceAccessPoint?: {
    host: string;
    protocol: string;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Initial state
////////////////////////////////////////////////////////////////////////////////
export const initialState: ResourceBuyingState = { name: 'INIT' }

////////////////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////////////////
export const reducer = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  console.debug('action:', action)

  switch (state.name) {
  case 'INIT':
    return transitionsOfInitState(state, action);
  case 'TRANSFER_ENABLED':
    return transitionsOfTransferEnabledState(state, action);
  case 'TRANSFER_DIALOG':
    return transitionsOfTransferDialogState(state, action);
  case 'RETRIEVE_CONTRACT_INFORMATION':
    return transitionsOfRetrieveContractInfoState(state, action)
  case 'CONTRACT_NEGOTIATION':
    return transitionsOfContractNegotiationsState(state, action)
  case 'RETRIEVE_AGREEMENT_INFORMATION':
    return transitionsOfRetrieveAgreementInfoState(state, action)
  case 'DATA_TRANSFER_INITIATION':
    return transitionsOfDataTransferInitiationState(state, action)
  case 'CHECKING_DATA_TRANSFER_STATUS':
    return transitionsOfDataTransferStatusCheckState(state, action)
  case 'FINISHED':
    return transitionsOfFinishedState(state, action)
  case 'ERROR_NOTIFICATION_DIALOG':
    return transitionsOfErrorNotificationDialogState(state, action)
  }
  return state
}

const transitionsOfInitState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'INIT') {
    if (action.type === 'CHECK_TRANSFER_ENABLED') {
      return action.payload.contractId && action.payload.serviceAccessPoint
        ? {
          name: 'TRANSFER_ENABLED',
          contractId: action.payload.contractId,
          serviceAccessPoint: action.payload.serviceAccessPoint
        }
        : { name: 'TRANSFER_DISABLED' }
    }
  }
  return state
}

const transitionsOfTransferEnabledState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'TRANSFER_ENABLED') {
    if (action.type === 'BUY') {
      const protocol = state.serviceAccessPoint ? state.serviceAccessPoint.protocol : '';
      const host = state.serviceAccessPoint ? state.serviceAccessPoint.host.replace(/\/$/, '') : '';

      const edcProducerBaseUrl = `${protocol}://${host}`;
      const edcConsumerBaseUrl = process.env.REACT_APP_DEFAULT_EDC_CONSUMER.replace(/\/$/, '');
      const dataDestinationAccount = process.env.REACT_APP_DEFAULT_EDC_DESTINATION_ACCOUNT;
      const dataDestinationContainer = process.env.REACT_APP_DEFAULT_EDC_DESTINATION_CONTAINER;

      return {
        name: 'TRANSFER_DIALOG',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer
      }
    }
  }
  return state
}

const transitionsOfTransferDialogState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'TRANSFER_DIALOG') {
    if (action.type === 'CANCEL') {
      return { name: 'TRANSFER_ENABLED', contractId: state.contractId, serviceAccessPoint: state.serviceAccessPoint }
    }
    if (action.type === 'RETRIEVE_CONTRACT_INFORMATION') {
      if (
        !action.payload.edcConsumerBaseUrl ||
        !action.payload.dataDestinationAccount ||
        !action.payload.dataDestinationContainer) {
        return {
          name: 'TRANSFER_DIALOG',
          contractId: state.contractId,
          serviceAccessPoint: state.serviceAccessPoint,
          edcConsumerBaseUrl: action.payload.edcConsumerBaseUrl || '',
          edcProducerBaseUrl: state.edcProducerBaseUrl,
          dataDestinationAccount: action.payload.dataDestinationAccount || '',
          dataDestinationContainer: action.payload.dataDestinationContainer || ''
        }
      }

      return {
        name: 'RETRIEVE_CONTRACT_INFORMATION',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        edcConsumerBaseUrl: action.payload.edcConsumerBaseUrl,
        edcProducerBaseUrl: state.edcProducerBaseUrl,
        dataDestinationAccount: action.payload.dataDestinationAccount,
        dataDestinationContainer: action.payload.dataDestinationContainer
      }
    }
  }
  return state
}

const transitionsOfRetrieveContractInfoState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'RETRIEVE_CONTRACT_INFORMATION') {
    if (action.type === 'CANCEL') {
      return { name: 'TRANSFER_ENABLED', contractId: state.contractId, serviceAccessPoint: state.serviceAccessPoint }
    }
    if (action.type === 'ERROR') {
      return {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: action.payload,
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint
      }
    }
    if (action.type === 'NEGOTIATE_CONTRACT') {
      return {
        name: 'CONTRACT_NEGOTIATION',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        edcConsumerBaseUrl: state.edcConsumerBaseUrl,
        edcProducerBaseUrl: state.edcProducerBaseUrl,
        dataDestinationAccount: state.dataDestinationAccount,
        dataDestinationContainer: state.dataDestinationContainer,
        contractDefinitionId: action.payload.contractDefinitionId || '',
        assetNameFull: action.payload.assetNameFull || ''
      }
    }
  }
  return state
}

const transitionsOfContractNegotiationsState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'CONTRACT_NEGOTIATION') {
    if (action.type === 'CANCEL') {
      return { name: 'TRANSFER_ENABLED', contractId: state.contractId, serviceAccessPoint: state.serviceAccessPoint }
    }
    if (action.type === 'ERROR') {
      return {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: action.payload,
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint
      }
    }
    if (action.type === 'RETRIEVE_AGREEMENT_INFORMATION') {
      return {
        name: 'RETRIEVE_AGREEMENT_INFORMATION',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        edcConsumerBaseUrl: state.edcConsumerBaseUrl,
        edcProducerBaseUrl: state.edcProducerBaseUrl,
        dataDestinationAccount: state.dataDestinationAccount,
        dataDestinationContainer: state.dataDestinationContainer,
        assetNameFull: state.assetNameFull,
        contractNegotiationUID: action.payload.contractNegotiationUID,
        nrOfRetries: 0
      }
    }
  }
  return state
}

const transitionsOfRetrieveAgreementInfoState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'RETRIEVE_AGREEMENT_INFORMATION') {
    if (action.type === 'CANCEL') {
      return { name: 'TRANSFER_ENABLED', contractId: state.contractId, serviceAccessPoint: state.serviceAccessPoint }
    }
    if (action.type === 'ERROR') {
      return {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: action.payload,
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint
      }
    }
    if (action.type === 'RETRIEVE_AGREEMENT_INFORMATION') {
      if (state.nrOfRetries >= 10) {
        return {
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: t('buy-dialog.failed-to-retrieve-agreement-info-after-10-attempts'),
          contractId: state.contractId,
          serviceAccessPoint: state.serviceAccessPoint
        }
      }
      return {
        name: 'RETRIEVE_AGREEMENT_INFORMATION',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        edcConsumerBaseUrl: state.edcConsumerBaseUrl,
        edcProducerBaseUrl: state.edcProducerBaseUrl,
        dataDestinationAccount: state.dataDestinationAccount,
        dataDestinationContainer: state.dataDestinationContainer,
        assetNameFull: state.assetNameFull,
        contractNegotiationUID: action.payload.contractNegotiationUID,
        nrOfRetries: state.nrOfRetries + 1
      }
    }
    if (action.type === 'INITIATE_DATA_TRANSFER') {
      return {
        name: 'DATA_TRANSFER_INITIATION',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        edcConsumerBaseUrl: state.edcConsumerBaseUrl,
        edcProducerBaseUrl: state.edcProducerBaseUrl,
        dataDestinationAccount: state.dataDestinationAccount,
        dataDestinationContainer: state.dataDestinationContainer,
        assetNameFull: state.assetNameFull,
        contractAgreementUID: action.payload.contractAgreementUID,
      }
    }
  }
  return state
}

const transitionsOfDataTransferInitiationState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'DATA_TRANSFER_INITIATION') {
    if (action.type === 'CANCEL') {
      return { name: 'TRANSFER_ENABLED', contractId: state.contractId, serviceAccessPoint: state.serviceAccessPoint }
    }
    if (action.type === 'ERROR') {
      return {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: action.payload,
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint
      }
    }
    if (action.type === 'CHECK_DATA_TRANSFER_STATUS') {
      return {
        name: 'CHECKING_DATA_TRANSFER_STATUS',
        nrOfRetries: 0,
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        transferProcessId: action.payload.transferProcessId,
        edcConsumerBaseUrl: action.payload.edcConsumerBaseUrl,
        status: action.payload.status
      }
    }
  }
  return state
}

const transitionsOfDataTransferStatusCheckState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'CHECKING_DATA_TRANSFER_STATUS') {
    if (action.type === 'ERROR') {
      return {
        name: 'ERROR_NOTIFICATION_DIALOG',
        message: action.payload,
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint
      }
    }
    if (action.type === 'CHECK_DATA_TRANSFER_STATUS') {
      if (action.payload.status === 'COMPLETED') {
        return {
          name: 'FINISHED',
          contractId: state.contractId,
          serviceAccessPoint: state.serviceAccessPoint,
          status: action.payload.status
        }
      }
      if (state.nrOfRetries >= 10) {
        return {
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: t('buy-dialog.check-data-transfer-status-failed'),
          contractId: state.contractId,
          serviceAccessPoint: state.serviceAccessPoint
        }
      }
      return {
        name: 'CHECKING_DATA_TRANSFER_STATUS',
        nrOfRetries: state.nrOfRetries + 1,
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        transferProcessId: action.payload.transferProcessId,
        edcConsumerBaseUrl: action.payload.edcConsumerBaseUrl,
        status: action.payload.status
      }
    }
  }
  return state
}

const transitionsOfErrorNotificationDialogState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'ERROR_NOTIFICATION_DIALOG') {
    if (action.type === 'CLOSE') {
      return { name: 'TRANSFER_ENABLED', contractId: state.contractId, serviceAccessPoint: state.serviceAccessPoint }
    }
  }
  return state
}

const transitionsOfFinishedState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'FINISHED') {
    if (action.type === 'BUY') {
      const protocol = state.serviceAccessPoint ? state.serviceAccessPoint.protocol : '';
      const host = state.serviceAccessPoint ? state.serviceAccessPoint.host.replace(/\/$/, '') : '';

      const edcProducerBaseUrl = `${protocol}://${host}`;
      const edcConsumerBaseUrl = process.env.REACT_APP_DEFAULT_EDC_CONSUMER.replace(/\/$/, '');
      const dataDestinationAccount = process.env.REACT_APP_DEFAULT_EDC_DESTINATION_ACCOUNT;
      const dataDestinationContainer = process.env.REACT_APP_DEFAULT_EDC_DESTINATION_CONTAINER;

      return {
        name: 'TRANSFER_DIALOG',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer
      }
    }
  }
  return state
}

