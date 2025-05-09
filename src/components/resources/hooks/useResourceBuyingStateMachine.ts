/* test coverage not required */
import { t } from 'i18next';
import React, { useEffect, useReducer } from 'react';

import {
  checkTransferStatus,
  DataTransferError,
  initiateDataTransfer,
  negotiateContract,
  retrieveAgreement,
  retrieveContractInformation
} from '../../../services/edcServiceApi';
import { delay } from '../../../utils/timers';
import {
  initialState,
  reducer,
  ResourceBuyingAction,
  ResourceBuyingState,
  ResourceBuyingStateMachineParams
} from '../helpers/resourceBuyingStateMachine';

////////////////////////////////////////////////////////////////////////////////
// State Machine
////////////////////////////////////////////////////////////////////////////////
type ResourceBuyingStateMachineRetVal = { state: ResourceBuyingState, dispatch: React.Dispatch<ResourceBuyingAction> }
type ResourceBuyingStateMachineHook = (params: ResourceBuyingStateMachineParams) => ResourceBuyingStateMachineRetVal

export const useResourceBuyingStateMachine: ResourceBuyingStateMachineHook = ({
  contractId,
  serviceAccessPoint,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.debug('state:', state)

    switch (state.name) {
    case 'INIT':
      initActionHandler(state, dispatch, contractId, serviceAccessPoint);
      break
    case 'RETRIEVE_CONTRACT_INFORMATION':
      retrieveContractInformationActionHandler(state, dispatch);
      break
    case 'CONTRACT_NEGOTIATION':
      negotiateContractActionHandler(state, dispatch);
      break
    case 'RETRIEVE_AGREEMENT_INFORMATION':
      retrieveAgreementInformationActionHandler(state, dispatch);
      break
    case 'DATA_TRANSFER_INITIATION':
      initiateDataTransferActionHandler(state, dispatch);
      break
    case 'CHECKING_DATA_TRANSFER_STATUS':
      checkDataTransferStatusActionHandler(state, dispatch);
      break
    }
  },
  [state.name, 'nrOfRetries' in state ? state.nrOfRetries : null]);

  return {
    state,
    dispatch
  }
}

////////////////////////////////////////////////////////////////////////////////
// Action Handlers
////////////////////////////////////////////////////////////////////////////////
const initActionHandler = (
  state: ResourceBuyingState,
  dispatch: React.Dispatch<ResourceBuyingAction>,
  contractId?: string,
  serviceAccessPoint?: { host: string; protocol: string }
) => {
  if (state.name === 'INIT') {
    dispatch({ type: 'CHECK_TRANSFER_ENABLED', payload: { contractId, serviceAccessPoint } })
  }
}

const retrieveContractInformationActionHandler = (
  state: ResourceBuyingState,
  dispatch: React.Dispatch<ResourceBuyingAction>
) => {
  if (state.name === 'RETRIEVE_CONTRACT_INFORMATION') {
    retrieveContractInformation(state)
      .then((contractInfo) => {
        dispatch({ type: 'NEGOTIATE_CONTRACT', payload: contractInfo })
      })
      .catch((error: DataTransferError) => {
        dispatch({ type: 'ERROR', payload: `${t('buy-dialog.failed-to-retrieve-contract-info')} ${error.message}` })
      })
  }
}

const negotiateContractActionHandler = (
  state: ResourceBuyingState,
  dispatch: React.Dispatch<ResourceBuyingAction>
) => {
  if (state.name === 'CONTRACT_NEGOTIATION') {
    negotiateContract(state)
      .then((negotiatedContractInfo) => {
        dispatch({
          type: 'RETRIEVE_AGREEMENT_INFORMATION',
          payload: negotiatedContractInfo
        })
      })
      .catch((error: DataTransferError) => {
        dispatch({ type: 'ERROR', payload: `${t('buy-dialog.contract-negotiation-failed')} ${error.message}` })
      })
  }
}

const retrieveAgreementInformationActionHandler = (
  state: ResourceBuyingState,
  dispatch: React.Dispatch<ResourceBuyingAction>
) => {
  if (state.name === 'RETRIEVE_AGREEMENT_INFORMATION') {
    delay(state.nrOfRetries * 1000).then(() => {
      retrieveAgreement(state)
        .then((agreementInfo) => {
          if (agreementInfo.state !== 'FINALIZED') {
            dispatch({
              type: 'RETRIEVE_AGREEMENT_INFORMATION',
              payload: { contractNegotiationUID: state.contractNegotiationUID }
            })
          } else {
            dispatch({
              type: 'INITIATE_DATA_TRANSFER',
              payload: {
                edcConsumerBaseUrl: state.edcConsumerBaseUrl,
                edcProducerBaseUrl: state.edcProducerBaseUrl,
                dataDestinationAccount: state.dataDestinationAccount,
                dataDestinationContainer: state.dataDestinationContainer,
                contractAgreementUID: agreementInfo.contractAgreementUID || '',
                assetNameFull: state.assetNameFull,
              }
            })
          }
        })
        .catch((error: DataTransferError) => {
          dispatch({ type: 'ERROR', payload: `${t('buy-dialog.failed-to-retrieve-agreement-info')} ${error.message}` })
        })
    })
  }
}

const initiateDataTransferActionHandler = (
  state: ResourceBuyingState,
  dispatch: React.Dispatch<ResourceBuyingAction>
) => {
  if (state.name === 'DATA_TRANSFER_INITIATION') {
    initiateDataTransfer(state)
      .then((transferProcessInfo) => {
        dispatch({
          type: 'CHECK_DATA_TRANSFER_STATUS',
          payload: {
            transferProcessId: transferProcessInfo.transferProcessId || '',
            edcConsumerBaseUrl: state.edcConsumerBaseUrl,
            status: null
          }
        })
      })
      .catch((error: DataTransferError) => {
        dispatch({ type: 'ERROR', payload: `${t('buy-dialog.data-transfer-initiation-failed')} ${error.message}` })
      })
  }
}

const checkDataTransferStatusActionHandler = (
  state: ResourceBuyingState,
  dispatch: React.Dispatch<ResourceBuyingAction>
) => {
  if (state.name === 'CHECKING_DATA_TRANSFER_STATUS') {
    const timeout = state.nrOfRetries * 1000;
    delay(timeout).then(() => {
      checkTransferStatus(state)
        .then((transferStatusInfo) => {
          dispatch({
            type: 'CHECK_DATA_TRANSFER_STATUS',
            payload: {
              transferProcessId: state.transferProcessId || '',
              edcConsumerBaseUrl: state.edcConsumerBaseUrl,
              status: transferStatusInfo.status
            }
          })
        })
        .catch((error: DataTransferError) => {
          dispatch({
            type: 'ERROR',
            payload: `${t('buy-dialog.check-data-transfer-status-failed')} ${error.message}`
          })
        })
    })
  }
}

