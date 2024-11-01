import { t } from 'i18next';
import { useEffect, useReducer } from 'react';

import {
  checkTransferStatus,
  initiateDataTransfer,
  negotiateContract,
  retrieveAgreement,
  retrieveContractInformation
} from '../../../services/edcServiceApi';
import {
  ContractInfo,
  DataTransferDialogUserInput,
  DataTransferInput,
  DataTransferStatusCheckInput,
  DataTransferStatuses,
  NegotiatedContractInfo
} from '../../../types/edc.model';
import { delay } from '../../../utils/timers';

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
  | { type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: DataTransferStatuses }

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
  } |
  {
    name: 'DISPLAY_DATA_TRANSFER_STATUS',
    contractId: string,
    serviceAccessPoint: { host: string, protocol: string },
    edcConsumerBaseUrl: string,
    transferProcessId: string,
    nrOfRetries: number,
    status: string,
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

type ResourceBuyingStateMachineRetVal = { state: ResourceBuyingState, dispatch: React.Dispatch<ResourceBuyingAction> }
type ResourceBuyingStateMachineHook = (params: ResourceBuyingStateMachineParams) => ResourceBuyingStateMachineRetVal

////////////////////////////////////////////////////////////////////////////////
// Initial state
////////////////////////////////////////////////////////////////////////////////
const initialState: ResourceBuyingState = { name: 'INIT' }

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
  case 'DISPLAY_DATA_TRANSFER_STATUS':
    return transitionsOfDisplayDataTransferStatusState(state, action)
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
        edcConsumerBaseUrl: action.payload.edcConsumerBaseUrl
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
    if (action.type === 'DISPLAY_DATA_TRANSFER_STATUS') {
      return {
        name: 'DISPLAY_DATA_TRANSFER_STATUS',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        transferProcessId: state.transferProcessId,
        edcConsumerBaseUrl: state.edcConsumerBaseUrl,
        nrOfRetries: state.nrOfRetries,
        status: action.payload
      }
    }
  }
  return state
}

const transitionsOfDisplayDataTransferStatusState = (state: ResourceBuyingState, action: ResourceBuyingAction): ResourceBuyingState => {
  if (state.name === 'DISPLAY_DATA_TRANSFER_STATUS') {
    if (state.status === 'COMPLETED') {
      return {
        name: 'FINISHED',
        contractId: state.contractId,
        serviceAccessPoint: state.serviceAccessPoint,
        status: state.status
      }
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
        edcConsumerBaseUrl: action.payload.edcConsumerBaseUrl
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

////////////////////////////////////////////////////////////////////////////////
// State Machine
////////////////////////////////////////////////////////////////////////////////
export const useResourceBuyingStateMachine: ResourceBuyingStateMachineHook = ({
  contractId,
  serviceAccessPoint,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.debug('state:', state)

    if (state.name === 'INIT') {
      dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { contractId, serviceAccessPoint } })
    }

    if (state.name === 'RETRIEVE_CONTRACT_INFORMATION') {
      const { contractId, edcProducerBaseUrl } = state;
      retrieveContractInformation({ contractId, edcProducerBaseUrl })
        .then((contractInfo) => {
          dispatch({ type: 'NEGOTIATE_CONTRACT', payload: contractInfo })
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: `${t('buy-dialog.failed-to-retrieve-contract-info')} ${error}` })
        })
    }

    if (state.name === 'CONTRACT_NEGOTIATION') {
      const { edcConsumerBaseUrl, edcProducerBaseUrl, contractDefinitionId, assetNameFull } = state;
      negotiateContract({ edcConsumerBaseUrl, edcProducerBaseUrl, contractDefinitionId, assetNameFull })
        .then((negotiatedContractInfo) => {
          dispatch({
            type: 'RETRIEVE_AGREEMENT_INFORMATION',
            payload: { ...negotiatedContractInfo }
          })
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: `${t('buy-dialog.contract-negotiation-failed')} ${error}` })
        })
    }

    if (state.name === 'RETRIEVE_AGREEMENT_INFORMATION') {
      const { edcConsumerBaseUrl, contractNegotiationUID } = state;
      retrieveAgreement({ edcConsumerBaseUrl, contractNegotiationUID })
        .then((agreementInfo) => {
          if (agreementInfo.state !== 'FINALIZED') {
            const { contractNegotiationUID, nrOfRetries } = state
            delay(nrOfRetries * 1000).then(() => dispatch({
              type: 'RETRIEVE_AGREEMENT_INFORMATION',
              payload: { contractNegotiationUID }
            }))
          } else {
            const { contractAgreementUID } = agreementInfo;
            dispatch({
              type: 'INITIATE_DATA_TRANSFER',
              payload: {
                edcConsumerBaseUrl: state.edcConsumerBaseUrl,
                edcProducerBaseUrl: state.edcProducerBaseUrl,
                dataDestinationAccount: state.dataDestinationAccount,
                dataDestinationContainer: state.dataDestinationContainer,
                contractAgreementUID: contractAgreementUID || '',
                assetNameFull: state.assetNameFull,
              }
            })
          }
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: `${t('buy-dialog.failed-to-retrieve-agreement-info')} ${error}` })
        })
    }

    if (state.name === 'DATA_TRANSFER_INITIATION') {
      const {
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer,
        contractAgreementUID,
        assetNameFull
      } = state
      initiateDataTransfer({
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer,
        contractAgreementUID,
        assetNameFull
      })
        .then((transferProcessInfo) => {
          dispatch({
            type: 'CHECK_DATA_TRANSFER_STATUS',
            payload: {
              transferProcessId: transferProcessInfo.transferProcessId || '',
              edcConsumerBaseUrl,
            }
          })
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: `${t('buy-dialog.data-transfer-initiation-failed')} ${error}` })
        })
    }

    if (state.name === 'CHECKING_DATA_TRANSFER_STATUS') {
      const { transferProcessId, edcConsumerBaseUrl } = state
      checkTransferStatus({ transferProcessId, edcConsumerBaseUrl })
        .then((transferStatusInfo) => {
          dispatch({ type: 'DISPLAY_DATA_TRANSFER_STATUS', payload: transferStatusInfo.status })
        })
        .catch((error) => {
          dispatch({ type: 'ERROR', payload: `${t('buy-dialog.check-data-transfer-status-failed')} ${error}` })
        })
    }

    if (state.name === 'DISPLAY_DATA_TRANSFER_STATUS') {
      delay((state.status !== 'COMPLETED' ? state.nrOfRetries : 0) * 1000).then(() => {
        dispatch({
          type: 'CHECK_DATA_TRANSFER_STATUS',
          payload: {
            transferProcessId: state.transferProcessId || '',
            edcConsumerBaseUrl: state.edcConsumerBaseUrl,
          }
        })
      })
    }
  },
  [
    state.name,
    state.name === 'RETRIEVE_AGREEMENT_INFORMATION' ? state.nrOfRetries : null
  ]);

  return {
    state,
    dispatch
  }
}
