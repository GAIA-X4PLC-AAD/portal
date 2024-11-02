import { renderHook, waitFor } from '@testing-library/react';
import { act, Dispatch } from 'react';

import {
  ResourceBuyingAction,
  ResourceBuyingState,
  ResourceBuyingStateMachineParams
} from '../../../../src/components/resources/helpers/resourceBuyingStateMachine';
import {
  useResourceBuyingStateMachine
} from '../../../../src/components/resources/hooks/useResourceBuyingStateMachine';
import {
  AgreementInfo,
  ContractInfo,
  ContractNegotiationInput,
  DataTransferInput,
  DataTransferProcessInfo,
  DataTransferStatusCheckInput,
  NegotiatedContractInfo,
  RetrieveAgreementInput,
  RetrieveContractInfoInput,
  TransferStatusInfo
} from '../../../../src/types/edc.model';
import { ResourceDetails } from '../../../../src/types/resources.model';
import { delay } from '../../../../src/utils/timers';

jest.useFakeTimers();
jest.mock('i18next', () => ({
  t: (translationId: string) => translationId
}))

const retrieveContractInformation = jest.fn();
const negotiateContract = jest.fn();
const retrieveAgreement = jest.fn();
const initiateDataTransfer = jest.fn();
const checkTransferStatus = jest.fn();

jest.mock('../../../../src/services/edcServiceApi', () => ({
  retrieveContractInformation: (input: RetrieveContractInfoInput) => retrieveContractInformation(input),
  negotiateContract: (input: ContractNegotiationInput) => negotiateContract(input),
  retrieveAgreement: (input: RetrieveAgreementInput) => retrieveAgreement(input),
  initiateDataTransfer: (input: DataTransferInput) => initiateDataTransfer(input),
  checkTransferStatus: (input: DataTransferStatusCheckInput) => checkTransferStatus(input)
}))

describe.skip('resourceBuyingStateMachine', () => {
  const contractId = '12345678';
  const serviceAccessPoint = { host: 'edc-pr.gxfs.gx4fm.org', protocol: 'https' };
  const edcConsumerBaseUrl = 'https://edc-co.gxfs.gx4fm.org';
  const edcProducerBaseUrl = 'https://edc-pr.gxfs.gx4fm.org';
  const dataDestinationAccount = 'msgedcstorage';
  const dataDestinationContainer = 'uc1-dest';
  const assetNameFull = 'bullwhip';
  const contractDefinitionId = '5646545-4464-646464';
  const contractNegotiationUID = 'dfs435kh3kh-fs89f-8su9fsd';
  const contractAgreementUID = '24o42oj4-42o34uo4u2-42o4o-24234';
  const transferProcessId = '7923847927492793491';
  const resourceDetails = { contractId, serviceAccessPoint } as ResourceDetails

  const resourceBuyingStateMachineParams = {
    contractId,
    serviceAccessPoint,
    edcConsumerBaseUrl,
    edcProducerBaseUrl,
    dataDestinationContainer,
    dataDestinationAccount
  } as ResourceBuyingStateMachineParams

  const retrieveContractInfoInput = {
    contractId,
    edcProducerBaseUrl,
  } as RetrieveContractInfoInput
  const contractInfo = {
    contractDefinitionId,
    assetNameFull
  } as ContractInfo

  const contractNegotiationInput = {
    edcConsumerBaseUrl,
    edcProducerBaseUrl,
    contractDefinitionId: '5646545-4464-646464',
    assetNameFull: 'bullwhip'
  } as ContractNegotiationInput
  const negotiatedContractInfo = {
    contractNegotiationUID
  } as NegotiatedContractInfo

  const retrieveAgreementInfoInput = {
    edcConsumerBaseUrl,
    contractNegotiationUID
  } as RetrieveAgreementInput
  const agreementInfo = {
    contractAgreementUID,
    state: 'FINALIZED'
  } as AgreementInfo

  const dataTransferInitiationInput = {
    edcConsumerBaseUrl,
    edcProducerBaseUrl,
    dataDestinationContainer,
    dataDestinationAccount,
    contractAgreementUID,
    assetNameFull
  } as DataTransferInput
  const dataTransferProcessInfo = {
    transferProcessId
  } as DataTransferProcessInfo

  const dataTransferStatusCheckInput = {
    edcConsumerBaseUrl,
    transferProcessId: '12345678'
  } as DataTransferStatusCheckInput
  const transferStatusInfo = { status: 'COMPLETED' } as TransferStatusInfo

  let result = {
    current: {
      state: { name: 'INIT' } as ResourceBuyingState,
      dispatch: jest.fn() as Dispatch<ResourceBuyingAction>
    }
  }
  beforeEach(() => {
    retrieveContractInformation.mockResolvedValueOnce(contractInfo)
    negotiateContract.mockResolvedValueOnce(negotiatedContractInfo)
    retrieveAgreement.mockResolvedValueOnce(agreementInfo)
    initiateDataTransfer.mockResolvedValueOnce(dataTransferProcessInfo)
    checkTransferStatus.mockResolvedValueOnce(transferStatusInfo)
    const hook = renderHook(() => useResourceBuyingStateMachine(resourceBuyingStateMachineParams));
    result = hook.result
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('transitions from INIT state', () => {
    it('enables buy button, if contractId exists', async () => {
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_ENABLED',
          contractId,
          serviceAccessPoint,
        })
      })
    })

    it('disables buy button, if contractId not exists', async () => {
      const { result } = renderHook(() => useResourceBuyingStateMachine({
        ...resourceBuyingStateMachineParams,
        contractId: undefined
      }));

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({ name: 'TRANSFER_DISABLED' })
      })
    })

    it('disables buy button, if serviceAccessPoint not exists', async () => {
      const { result } = renderHook(() => useResourceBuyingStateMachine({
        ...resourceBuyingStateMachineParams,
        serviceAccessPoint: undefined
      }));

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({ name: 'TRANSFER_DISABLED' })
      })
    })
  });

  describe('transitions from TRANSFER_ENABLED state', () => {
    it('opens transfer popup dialog, if buy button is pressed', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_DIALOG',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl,
          edcProducerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        })
      })

    })
  });

  describe('transitions from TRANSFER_DIALOG state', () => {
    it('closes the dialog if cancel button is pressed, and the buy button is still enabled', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state.name).toEqual('TRANSFER_DIALOG')
      })

      await act(() => dispatch({ type: 'CANCEL' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({ name: 'TRANSFER_ENABLED', contractId, serviceAccessPoint })
      })
    })

    it('retrieves contract info, if all inputs are valid', async () => {
      retrieveContractInformation.mockResolvedValueOnce(contractInfo)
      const { dispatch } = result.current

      act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl: 'https://custom.base.url',
          dataDestinationAccount: 'customedcstorage',
          dataDestinationContainer: 'customcontainer'
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'RETRIEVE_CONTRACT_INFORMATION',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl: 'https://custom.base.url',
          edcProducerBaseUrl,
          dataDestinationAccount: 'customedcstorage',
          dataDestinationContainer: 'customcontainer'
        })
      })
      await waitFor(() => expect(retrieveContractInformation)
        .toHaveBeenCalledWith({ contractId, edcProducerBaseUrl }))
    })

    it('keeps dialog open and displays a validation message, if a consumerBaseUrl field is empty', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl: undefined,
          dataDestinationAccount: 'customedcstorage',
          dataDestinationContainer: 'customcontainer'
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_DIALOG',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl: '',
          edcProducerBaseUrl,
          dataDestinationAccount: 'customedcstorage',
          dataDestinationContainer: 'customcontainer'
        })
      })
    })

    it('keeps dialog open and displays a validation message, if a account field is empty', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl: 'https://custom.base.url',
          dataDestinationAccount: undefined,
          dataDestinationContainer: 'customcontainer'
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_DIALOG',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl: 'https://custom.base.url',
          edcProducerBaseUrl,
          dataDestinationAccount: '',
          dataDestinationContainer: 'customcontainer'
        })
      })
    })

    it('keeps dialog open and displays a validation message, if a container field is empty', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl: 'https://custom.base.url',
          dataDestinationAccount: 'customedcstorage',
          dataDestinationContainer: ''
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_DIALOG',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl: 'https://custom.base.url',
          edcProducerBaseUrl,
          dataDestinationAccount: 'customedcstorage',
          dataDestinationContainer: ''
        })
      })
    })
  });

  describe('transitions from RETRIEVE_CONTRACT_INFO state', () => {
    it('cancels the retrieve contract info process, if cancel button is clicked', async () => {
      retrieveContractInformation.mockReset().mockResolvedValueOnce(delay(100).then(() => contractInfo))
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))

      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))
      await waitFor(() => {
        const { state } = result.current
        expect(state.name).toEqual('RETRIEVE_CONTRACT_INFORMATION')
      })

      await act(() => dispatch({ type: 'CANCEL' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({ name: 'TRANSFER_ENABLED', contractId, serviceAccessPoint })
      })
    })

    it('shows an error notification dialog with an error message, ' +
      'if an error was thrown during contract info retrieve', async () => {
      const message = 'some error message';
      retrieveContractInformation.mockReset().mockRejectedValueOnce(message)
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: `failed-to-retrieve-contract-info (${message})`,
          contractId,
          serviceAccessPoint
        })
      })
    })

    it('closes the error notification dialog, and goes back to showing the buy button in enabled state, ' +
      'if an error was thrown during retrieving contract information', async () => {
      const message = 'some error message';
      retrieveContractInformation.mockReset().mockRejectedValueOnce(message)

      const { dispatch } = result.current
      await act(() => dispatch({ type: 'BUY' }))

      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))
      await waitFor(() => {
        const { state } = result.current
        expect(state.name).toEqual('ERROR_NOTIFICATION_DIALOG')
      })

      await act(() => dispatch({ type: 'CLOSE' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_ENABLED',
          contractId,
          serviceAccessPoint
        })
      })
    })

    it('negotiates contract, if contract information was transferred correctly', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'DISPLAY_DATA_TRANSFER_STATUS',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl,
          transferProcessId,
          nrOfRetries: 0,
          status: 'COMPLETED'
        })
      })
      await waitFor(() => expect(negotiateContract).toHaveBeenCalledWith(contractNegotiationInput))
    })
  });

  describe('transitions from CONTRACT_NEGOTIATION state', () => {
    it('cancels the retrieve contract info process, if cancel button is clicked', async () => {
      negotiateContract.mockReset().mockResolvedValueOnce(delay(100).then(() => negotiatedContractInfo))
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))
      await waitFor(() => {
        const { state } = result.current
        expect(state.name).toEqual('CONTRACT_NEGOTIATION')
      })
      await act(() => dispatch({ type: 'CANCEL' }))

      const { state } = result.current
      expect(state).toEqual({ name: 'TRANSFER_ENABLED', contractId, serviceAccessPoint })
    })

    it('shows an error notification dialog with an error message, ' +
      'if an error was thrown during contract negotiation', async () => {
      const message = 'some error message';
      negotiateContract.mockReset().mockRejectedValueOnce(message)
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: `contract-negotiation-failed (${message})`,
          contractId,
          serviceAccessPoint
        })
      })
    })

    it('retrieves agreement information, if contract negotiation was successful', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => expect(negotiateContract).toHaveBeenCalled())
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalled())
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'DISPLAY_DATA_TRANSFER_STATUS',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl,
          transferProcessId,
          nrOfRetries: 0,
          status: 'COMPLETED',
        })
      })
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalledWith(retrieveAgreementInfoInput))
    })
  });

  describe('transitions from RETRIEVE_AGREEMENT_INFORMATION state', () => {
    it('cancels contract agreement retrieval, if cancel button is pressed', async () => {
      retrieveAgreement.mockReset().mockResolvedValueOnce(delay(100).then(() => agreementInfo))
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))

      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))
      await waitFor(() => {
        const { state } = result.current
        expect(state.name).toEqual('RETRIEVE_AGREEMENT_INFORMATION')
      })

      await act(() => dispatch({ type: 'CANCEL' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_ENABLED',
          contractId,
          serviceAccessPoint
        })
      })
    })

    it('shows an error notification dialog with an error message, if an error was thrown during agreement' +
      ' retrieval', async () => {
      const message = 'some error message'
      retrieveAgreement.mockReset().mockRejectedValueOnce(message)
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: `failed-to-retrieve-agreement-info (${message})`,
          contractId,
          serviceAccessPoint
        })
      })
    })

    it('retries to retrieve agreement information and increments counter, if previous attempt was unsuccessful', async () => {
      retrieveAgreement.mockReset()
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce(delay(100).then(() => agreementInfo))

      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'DISPLAY_DATA_TRANSFER_STATUS',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl,
          transferProcessId,
          nrOfRetries: 0,
          status: 'COMPLETED'
        })
      })
    })

    it('shows an error notification dialog with an error message, after 10 retry attempts', async () => {
      retrieveAgreement.mockReset()
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: 'failed-to-retrieve-agreement-info-after-10-attempts',
          contractId,
          serviceAccessPoint,
        })
      })
    })

    it('close error message, after 10 retry attempts failure', async () => {
      retrieveAgreement.mockReset()
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce({ ...agreementInfo, state: 'NOT_FINALIZED' })
        .mockResolvedValueOnce(delay(100).then(() => agreementInfo))
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: 'failed-to-retrieve-agreement-info-after-10-attempts',
          contractId,
          serviceAccessPoint,
        })
      })

      await dispatch({ type: 'CLOSE' })
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_ENABLED',
          contractId,
          serviceAccessPoint,
        })
      })
    })

    it('initiates data transfer, if contract agreement was fetched correctly', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => expect(negotiateContract).toHaveBeenCalled())
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalled())
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'DISPLAY_DATA_TRANSFER_STATUS',
          contractId,
          serviceAccessPoint,
          edcConsumerBaseUrl,
          transferProcessId,
          nrOfRetries: 0,
          status: 'COMPLETED'
        })
      })
      await waitFor(() => expect(initiateDataTransfer).toHaveBeenCalledWith({
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer,
        contractAgreementUID,
        assetNameFull
      }))
    })
  });

  describe('transitions from DATA_TRANSFER_INITIATION state', () => {
    it('cancels data initiation process, if cancel button is pressed', async () => {
      initiateDataTransfer.mockReset().mockResolvedValueOnce(delay(100).then(() => dataTransferProcessInfo))
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))

      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(initiateDataTransfer).toHaveBeenCalled())
      await waitFor(() => {
        const { state } = result.current
        expect(state.name).toEqual('DATA_TRANSFER_INITIATION')
      })

      await act(() => dispatch({ type: 'CANCEL' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_ENABLED',
          contractId,
          serviceAccessPoint
        })
      })
    })

    it('shows an error notification dialog with an error message, ' +
      'if an error was thrown during data transfer initiation', async () => {
      const message = 'some error message'
      initiateDataTransfer.mockReset().mockRejectedValueOnce(message)
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: `data-transfer-initiation-failed (${message})`,
          contractId,
          serviceAccessPoint
        })
      })
    })

    it('close error notification dialog, if an error was thrown during data transfer initiation', async () => {
      const message = 'some error message'
      initiateDataTransfer.mockReset().mockRejectedValueOnce(message)
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: `data-transfer-initiation-failed (${message})`,
          contractId,
          serviceAccessPoint
        })
      })

      await act(() => dispatch({ type: 'CLOSE' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_ENABLED',
          contractId,
          serviceAccessPoint,
        })
      })
    })

    it('starts checking data transfer status, if data transfer initiation was successful', async () => {
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => expect(negotiateContract).toHaveBeenCalled())
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalled())
      await waitFor(() => expect(initiateDataTransfer).toHaveBeenCalled())
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'DISPLAY_DATA_TRANSFER_STATUS',
          contractId,
          serviceAccessPoint,
          transferProcessId,
          edcConsumerBaseUrl,
          nrOfRetries: 0,
          status: 'COMPLETED'
        })
      })
      await waitFor(() => expect(checkTransferStatus).toHaveBeenCalledWith({
        transferProcessId: '7923847927492793491',
        edcConsumerBaseUrl: 'https://edc-co.gxfs.gx4fm.org'
      }))
    })
  });

  describe('transitions from CHECKING_DATA_TRANSFER_STATUS state', () => {
    it('show an error notification dialog with an error message, ' +
      'if an error was thrown during checking data transfer status', async () => {
      const message = 'some error message'
      checkTransferStatus.mockReset().mockRejectedValueOnce(message)
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))

      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: `check-data-transfer-status-failed (${message})`,
          contractId,
          serviceAccessPoint
        })
      })
    })

    it('closes error notification dialog, if an error was thrown during the data transfer status check!', async () => {
      const message = 'some error message'
      checkTransferStatus.mockReset().mockRejectedValueOnce(message)
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))

      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: `check-data-transfer-status-failed (${message})`,
          contractId,
          serviceAccessPoint
        })
      })

      await act(() => dispatch({ type: 'CLOSE' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_ENABLED',
          contractId,
          serviceAccessPoint,
        })
      })
    })

    it('displays transfer status, if data transfer status check was successful', async () => {
      checkTransferStatus.mockReset().mockResolvedValueOnce({
        status: 'STARTED'
      })
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => expect(negotiateContract).toHaveBeenCalled())
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalled())
      await waitFor(() => expect(initiateDataTransfer).toHaveBeenCalled())
      await waitFor(() => expect(checkTransferStatus).toHaveBeenCalled())
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'DISPLAY_DATA_TRANSFER_STATUS',
          contractId,
          serviceAccessPoint,
          transferProcessId,
          edcConsumerBaseUrl,
          nrOfRetries: 0,
          status: 'STARTED'
        })
      })
    })
  });

  describe('transitions from DISPLAY_DATA_TRANSFER_STATUS state', () => {
    it('retries data transfer status check and counts the retries, if status is not COMPLETED', async () => {
      checkTransferStatus.mockReset()
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => expect(negotiateContract).toHaveBeenCalled())
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalled())
      await waitFor(() => expect(initiateDataTransfer).toHaveBeenCalled())
      for (let i = 0; i < 6; ++i) {
        jest.advanceTimersByTime(10000);
        await waitFor(() => {
          const { state } = result.current
          expect(state).toEqual({
            name: 'DISPLAY_DATA_TRANSFER_STATUS',
            contractId,
            serviceAccessPoint,
            transferProcessId,
            edcConsumerBaseUrl,
            nrOfRetries: i,
            status: 'STARTED'
          })
        })
      }
      await waitFor(() => expect(checkTransferStatus).toHaveBeenCalledTimes(6))
    });

    it('shows error message, if status is not COMPLETED and there were 6 attempts to check data transfer status', async () => {
      checkTransferStatus.mockReset()
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => expect(negotiateContract).toHaveBeenCalled())
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalled())
      await waitFor(() => expect(initiateDataTransfer).toHaveBeenCalled())
      for (let i = 0; i <= 6; ++i) {
        jest.advanceTimersByTime(10000);
        await waitFor(() => {
          const { state } = result.current
          expect(state).toEqual({
            name: 'DISPLAY_DATA_TRANSFER_STATUS',
            contractId,
            edcConsumerBaseUrl,
            serviceAccessPoint,
            transferProcessId,
            nrOfRetries: i,
            status: 'STARTED'
          })
        })
      }

      await waitFor(() => expect(checkTransferStatus).toHaveBeenCalledTimes(7))
      jest.advanceTimersByTime(10000);
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: 'check-data-transfer-status-failed',
          contractId,
          serviceAccessPoint,
        })
      })
    })

    it('stops, if data transfer status is COMPLETED', async () => {
      checkTransferStatus.mockReset()
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'COMPLETED' })
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => expect(negotiateContract).toHaveBeenCalled())
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalled())
      await waitFor(() => expect(initiateDataTransfer).toHaveBeenCalled())
      for (let i = 0; i <= 6; ++i) {
        jest.advanceTimersByTime(10000);
        await waitFor(() => {
          const { state } = result.current
          expect(state).toEqual({
            name: 'DISPLAY_DATA_TRANSFER_STATUS',
            contractId,
            edcConsumerBaseUrl,
            serviceAccessPoint,
            transferProcessId,
            nrOfRetries: i,
            status: 'STARTED'
          })
        })
      }

      await waitFor(() => expect(checkTransferStatus).toHaveBeenCalledTimes(7))
      jest.advanceTimersByTime(10000);
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'ERROR_NOTIFICATION_DIALOG',
          message: 'check-data-transfer-status-failed',
          contractId,
          serviceAccessPoint,
        })
      })

      await act(() => dispatch({ type: 'CLOSE' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({
          name: 'TRANSFER_ENABLED',
          contractId,
          serviceAccessPoint,
        })
      })
    })
  })

  describe('transitions from FINISHED state', () => {
    it('starts over,  if buy button is clicked', async () => {
      checkTransferStatus.mockReset()
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'STARTED' })
        .mockResolvedValueOnce({ status: 'COMPLETED' })
      const { dispatch } = result.current

      await act(() => dispatch({ type: 'BUY' }))
      await act(() => dispatch({
        type: 'RETRIEVE_CONTRACT_INFORMATION', payload: {
          edcConsumerBaseUrl,
          dataDestinationAccount,
          dataDestinationContainer
        }
      }))

      await waitFor(() => expect(retrieveContractInformation).toHaveBeenCalled())
      await waitFor(() => expect(negotiateContract).toHaveBeenCalled())
      await waitFor(() => expect(retrieveAgreement).toHaveBeenCalled())
      await waitFor(() => expect(initiateDataTransfer).toHaveBeenCalled())
      for (let i = 0; ++i; i <= 6) {
        jest.advanceTimersByTime(10000);
        await waitFor(() => {
          const { state } = result.current
          expect(state).toEqual({
            name: 'FINISHED',
            contractId,
            serviceAccessPoint,
          })
        })
      }
      await waitFor(() => expect(checkTransferStatus).toHaveBeenCalledTimes(7))

      await act(() => dispatch({ type: 'BUY' }))
      await waitFor(() => {
        const { state } = result.current
        expect(state).toEqual({})
      })
    })
  })
})
