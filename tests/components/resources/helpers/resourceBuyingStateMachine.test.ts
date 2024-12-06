import {
  reducer,
  ResourceBuyingAction,
  ResourceBuyingState
} from '../../../../src/components/resources/helpers/resourceBuyingStateMachine';

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

jest.mock('i18next', () => ({
  t: (translationId) => translationId
}))

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('INIT', () => {
  it('remains in the same state if unknown action happens', () => {
    const state = { name: 'INIT' } as ResourceBuyingState
    const action = { type: 'UNKNOWN_ACTION' } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({ name: 'INIT' });
  })

  it('transitions to CHECK_TRANSFER_ENABLED if contractId and serviceAccessPoint are valid', () => {
    const state = { name: 'INIT' } as ResourceBuyingState
    const action = {
      type: 'CHECK_TRANSFER_ENABLED',
      payload: { contractId, serviceAccessPoint }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'TRANSFER_ENABLED',
      contractId,
      serviceAccessPoint
    });
  })

  it('transitions to TRANSFER_DISABLE if contractId is not valid', () => {
    const state = { name: 'INIT' } as ResourceBuyingState
    const action = {
      type: 'CHECK_TRANSFER_ENABLED',
      payload: { contractId: undefined, serviceAccessPoint }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({ name: 'TRANSFER_DISABLED' });
  })

  it('transitions to TRANSFER_DISABLE if serviceAccessPoint is not valid', () => {
    const state = { name: 'INIT' } as ResourceBuyingState
    const action = {
      type: 'CHECK_TRANSFER_ENABLED',
      payload: { contractId, serviceAccessPoint: undefined }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({ name: 'TRANSFER_DISABLED' });
  })
});

describe('TRANSFER_ENABLED', () => {
  it('transitions to TRANSFER_DIALOG', () => {
    const state = {
      name: 'TRANSFER_ENABLED',
      contractId,
      serviceAccessPoint
    } as ResourceBuyingState
    const action = {
      type: 'BUY', payload: {
        contractId, serviceAccessPoint
      }
    } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'TRANSFER_DIALOG',
        contractId,
        serviceAccessPoint,
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationContainer,
        dataDestinationAccount
      });
  })

  it('remains in the same state in case of unknown action', () => {
    const state = {
      name: 'TRANSFER_ENABLED',
      contractId,
      serviceAccessPoint
    } as ResourceBuyingState
    const action = { type: 'UNKNOWN' } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'TRANSFER_ENABLED',
        contractId,
        serviceAccessPoint
      });
  })
});

describe('TRANSFER_DIALOG', () => {
  it('remains in the same state if unknown action happens', () => {
    const state = {
      name: 'TRANSFER_DIALOG',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationContainer,
      dataDestinationAccount
    } as ResourceBuyingState
    const action = { type: 'UNKNOWN_ACTION' } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual(state);
  })

  it('transitions to TRANSFER_ENABLED if CANCEL action happens', () => {
    const state = {
      name: 'TRANSFER_DIALOG',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationContainer,
      dataDestinationAccount
    } as ResourceBuyingState
    const action = { type: 'CANCEL' } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'TRANSFER_ENABLED',
        contractId,
        serviceAccessPoint
      });
  })

  it('transitions to TRANSFER_DIALOG if RETRIEVE_CONTRACT_INFORMATION action happens and edcConsumerBaseUrl is ' +
    'invalid', () => {
    const state = {
      name: 'TRANSFER_DIALOG',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationContainer,
      dataDestinationAccount
    } as ResourceBuyingState
    const action = {
      type: 'RETRIEVE_CONTRACT_INFORMATION',
      payload: {
        edcConsumerBaseUrl: '',
        dataDestinationAccount,
        dataDestinationContainer
      }
    } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'TRANSFER_DIALOG',
        contractId,
        serviceAccessPoint,
        edcConsumerBaseUrl: '',
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer,
      });
  })

  it('transitions to TRANSFER_DIALOG if RETRIEVE_CONTRACT_INFORMATION action happens and dataDestinationAccount is ' +
    'invalid', () => {
    const state = {
      name: 'TRANSFER_DIALOG',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationContainer,
      dataDestinationAccount
    } as ResourceBuyingState
    const action = {
      type: 'RETRIEVE_CONTRACT_INFORMATION',
      payload: {
        edcConsumerBaseUrl,
        dataDestinationAccount: '',
        dataDestinationContainer
      }
    } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'TRANSFER_DIALOG',
        contractId,
        serviceAccessPoint,
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount: '',
        dataDestinationContainer,
      });
  })

  it('transitions to TRANSFER_DIALOG if RETRIEVE_CONTRACT_INFORMATION action happens and dataDestinationContainer is ' +
    'invalid', () => {
    const state = {
      name: 'TRANSFER_DIALOG',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationContainer,
      dataDestinationAccount
    } as ResourceBuyingState
    const action = {
      type: 'RETRIEVE_CONTRACT_INFORMATION',
      payload: {
        edcConsumerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer: ''
      }
    } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'TRANSFER_DIALOG',
        contractId,
        serviceAccessPoint,
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer: '',
      });
  })

  it('transitions to RETRIEVE_CONTRACT_INFORMATION if RETRIEVE_CONTRACT_INFORMATION action happens', () => {
    const state = {
      name: 'TRANSFER_DIALOG',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationContainer,
      dataDestinationAccount
    } as ResourceBuyingState
    const action = {
      type: 'RETRIEVE_CONTRACT_INFORMATION',
      payload: {
        edcConsumerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer
      }
    } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'RETRIEVE_CONTRACT_INFORMATION',
        contractId,
        serviceAccessPoint,
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer
      });
  })
});

describe('RETRIEVE_CONTRACT_INFORMATION', () => {
  it('remains in the same state in case of an unknown action', () => {
    const state = {
      name: 'RETRIEVE_CONTRACT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer
    } as ResourceBuyingState
    const action = { type: 'unknown' } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'RETRIEVE_CONTRACT_INFORMATION',
        contractId,
        serviceAccessPoint,
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer
      });
  })

  it('transitions to TRANSFER_ENABLED in case of CANCEL action', () => {
    const state = {
      name: 'RETRIEVE_CONTRACT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer
    } as ResourceBuyingState
    const action = { type: 'CANCEL' } as ResourceBuyingAction
    expect(reducer(state, action))
      .toEqual({
        name: 'TRANSFER_ENABLED',
        contractId,
        serviceAccessPoint,
      });
  })

  it('transitions to ERROR_NOTIFICATION_DIALOG in case of ERROR', () => {
    const state = {
      name: 'RETRIEVE_CONTRACT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer
    } as ResourceBuyingState
    const action = {
      type: 'ERROR',
      payload: 'message'
    } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'ERROR_NOTIFICATION_DIALOG',
        contractId,
        serviceAccessPoint,
        message: 'message'
      });
  })

  it('transitions to CONTRACT_NEGOTIATION ', () => {
    const state = {
      name: 'RETRIEVE_CONTRACT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer
    } as ResourceBuyingState
    const action = {
      type: 'NEGOTIATE_CONTRACT',
      payload: {
        contractDefinitionId,
        assetNameFull
      }
    } as ResourceBuyingAction

    expect(reducer(state, action))
      .toEqual({
        name: 'CONTRACT_NEGOTIATION',
        contractId,
        serviceAccessPoint,
        edcConsumerBaseUrl,
        edcProducerBaseUrl,
        dataDestinationAccount,
        dataDestinationContainer,
        contractDefinitionId,
        assetNameFull
      });
  })
});

describe('CONTRACT_NEGOTIATION', () => {
  it('remains in the same state in case of an unknown action', () => {
    const state = {
      name: 'CONTRACT_NEGOTIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractDefinitionId,
      nrOfRetries: 0
    } as ResourceBuyingState
    const action = { type: 'UNKNOWN', } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual(state);
  })

  it('transitions to TRANSFER_ENABLED in case of CANCEL action', () => {
    const state = {
      name: 'CONTRACT_NEGOTIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractDefinitionId
    } as ResourceBuyingState
    const action = { type: 'CANCEL', } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'TRANSFER_ENABLED',
      contractId,
      serviceAccessPoint
    });
  })

  it('transitions to TRANSFER_ENABLED in case of ERROR action', () => {
    const state = {
      name: 'CONTRACT_NEGOTIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractDefinitionId
    } as ResourceBuyingState
    const action = {
      type: 'ERROR',
      payload: 'message'
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'message',
      contractId,
      serviceAccessPoint
    });
  })

  it('transitions to RETRIEVE_AGREEMENT_INFORMATION in case of RETRIEVE_AGREEMENT_INFORMATION action', () => {
    const state = {
      name: 'CONTRACT_NEGOTIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractDefinitionId
    } as ResourceBuyingState
    const action = {
      type: 'RETRIEVE_AGREEMENT_INFORMATION',
      payload: {
        contractNegotiationUID,
        nrOfRetries: 0
      }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'RETRIEVE_AGREEMENT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractNegotiationUID,
      nrOfRetries: 0
    });
  })
});

describe('RETRIEVE_AGREEMENT_INFORMATION', () => {
  it('remains on the same state in case of unknown action', () => {
    const state = {
      name: 'RETRIEVE_AGREEMENT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractNegotiationUID,
      nrOfRetries: 0
    } as ResourceBuyingState
    const action = { type: 'UNKNOWN', } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual(state)
  })

  it('transitions to TRANSFER_ENABLED on CANCEL action', () => {
    const state = {
      name: 'RETRIEVE_AGREEMENT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractNegotiationUID,
      nrOfRetries: 0
    } as ResourceBuyingState
    const action = { type: 'CANCEL', } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'TRANSFER_ENABLED',
      contractId,
      serviceAccessPoint
    })
  })

  it('transitions to ERROR_NOTIFICATION_DIALOG on ERROR action', () => {
    const state = {
      name: 'RETRIEVE_AGREEMENT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractNegotiationUID,
      nrOfRetries: 0
    } as ResourceBuyingState
    const action = { type: 'ERROR', payload: 'message' } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'message',
      contractId,
      serviceAccessPoint
    })
  })

  it('remains on the same state and increments nrOfRetries in case of RETRIEVE_AGREEMENT_INFORMATION', () => {
    const state = {
      name: 'RETRIEVE_AGREEMENT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractNegotiationUID,
      nrOfRetries: 0
    } as ResourceBuyingState
    const action = {
      type: 'RETRIEVE_AGREEMENT_INFORMATION',
      payload: {
        contractNegotiationUID,
      }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'RETRIEVE_AGREEMENT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractNegotiationUID,
      nrOfRetries: 1
    })
  })

  it('transitions to ERROR_NOTIFICATION_DIALOG after failed 10 retry attempts', () => {
    const state = {
      name: 'RETRIEVE_AGREEMENT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractNegotiationUID,
      nrOfRetries: 10
    } as ResourceBuyingState
    const action = {
      type: 'RETRIEVE_AGREEMENT_INFORMATION',
      payload: {
        contractNegotiationUID,
      }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'buy-dialog.failed-to-retrieve-agreement-info-after-10-attempts',
      contractId,
      serviceAccessPoint,
    })
  })

  it('transitions to DATA_TRANSFER_INITIATION in case of INITIATE_DATA_TRANSFER', () => {
    const state = {
      name: 'RETRIEVE_AGREEMENT_INFORMATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractNegotiationUID,
      nrOfRetries: 9
    } as ResourceBuyingState
    const action = {
      type: 'INITIATE_DATA_TRANSFER',
      payload: {
        contractAgreementUID,
      }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'DATA_TRANSFER_INITIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractAgreementUID
    })
  })
});

describe('DATA_TRANSFER_INITIATION', () => {
  it('remains in the same state in case of an unknown action', () => {
    const state = {
      name: 'DATA_TRANSFER_INITIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractAgreementUID
    } as ResourceBuyingState
    const action = { type: 'UNKNOWN' } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'DATA_TRANSFER_INITIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractAgreementUID
    })
  })

  it('transitions to TRANSFER_ENABLED in case of CANCEL action', () => {
    const state = {
      name: 'DATA_TRANSFER_INITIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractAgreementUID
    } as ResourceBuyingState
    const action = { type: 'CANCEL' } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'TRANSFER_ENABLED',
      contractId,
      serviceAccessPoint,
    })
  })

  it('transitions to ERROR_NOTIFICATION_DIALOG on ERROR action', () => {
    const state = {
      name: 'DATA_TRANSFER_INITIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractAgreementUID
    } as ResourceBuyingState
    const action = {
      type: 'ERROR',
      payload: 'message'
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'message',
      contractId,
      serviceAccessPoint,
    })
  })

  it('transitions to CHECKING_DATA_TRANSFER_STATUS in case of CHECK_DATA_TRANSFER_STATUS', () => {
    const state = {
      name: 'DATA_TRANSFER_INITIATION',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer,
      assetNameFull,
      contractAgreementUID
    } as ResourceBuyingState
    const action = {
      type: 'CHECK_DATA_TRANSFER_STATUS',
      payload: {
        transferProcessId,
        edcConsumerBaseUrl,
        status: 'INITIATED'
      }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'CHECKING_DATA_TRANSFER_STATUS',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      transferProcessId,
      status: 'INITIATED',
      nrOfRetries: 0,
    })
  })
});

describe('CHECKING_DATA_TRANSFER_STATUS', () => {
  it('remains in the same state in case of unknown command', () => {
    const state = {
      name: 'CHECKING_DATA_TRANSFER_STATUS',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      transferProcessId,
      status: 'INITIATED',
      nrOfRetries: 0,
    } as ResourceBuyingState
    const action = { type: 'UNKNOWN', } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'CHECKING_DATA_TRANSFER_STATUS',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      transferProcessId,
      status: 'INITIATED',
      nrOfRetries: 0,
    })
  })

  it('transitions to ERROR_NOTIFICATION_DIALOG in case of ERROR action', () => {
    const state = {
      name: 'CHECKING_DATA_TRANSFER_STATUS',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      transferProcessId,
      status: 'INITIATED',
      nrOfRetries: 0,
    } as ResourceBuyingState
    const action = {
      type: 'ERROR',
      payload: 'message'
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'message',
      contractId,
      serviceAccessPoint,
    })
  })

  it('transitions to FINISHED if status is COMPLETED', () => {
    const state = {
      name: 'CHECKING_DATA_TRANSFER_STATUS',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      transferProcessId,
      status: 'INITIATED',
      nrOfRetries: 0,
    } as ResourceBuyingState
    const action = {
      type: 'CHECK_DATA_TRANSFER_STATUS',
      payload: { status: 'COMPLETED' }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'FINISHED',
      contractId,
      serviceAccessPoint,
      status: 'COMPLETED'
    })
  })

  it('transitions to ERROR_NOTIFICATION_DIALOG after 10 retries', () => {
    const state = {
      name: 'CHECKING_DATA_TRANSFER_STATUS',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      transferProcessId,
      status: 'INITIATED',
      nrOfRetries: 10,
    } as ResourceBuyingState
    const action = {
      type: 'CHECK_DATA_TRANSFER_STATUS',
      payload: { status: 'INITIATED' }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'buy-dialog.check-data-transfer-status-failed',
      contractId,
      serviceAccessPoint,
    })
  })

  it('remains in the same status in case', () => {
    const state = {
      name: 'CHECKING_DATA_TRANSFER_STATUS',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      transferProcessId,
      status: 'INITIATED',
      nrOfRetries: 0,
    } as ResourceBuyingState
    const action = {
      type: 'CHECK_DATA_TRANSFER_STATUS',
      payload: {
        status: 'INITIATED',
        transferProcessId,
        edcConsumerBaseUrl
      }
    } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'CHECKING_DATA_TRANSFER_STATUS',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      transferProcessId,
      status: 'INITIATED',
      nrOfRetries: 1,
    })
  })

});

describe('ERROR_NOTIFICATION_DIALOG', () => {
  it('remains in the same status in case of unknown action', () => {
    const state = {
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'message',
      contractId,
      serviceAccessPoint,
    } as ResourceBuyingState
    const action = { type: 'UNKNOWN' } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'message',
      contractId,
      serviceAccessPoint,
    })
  })

  it('transitions to TRANSFER_ENABLED in case of CLOSE action', () => {
    const state = {
      name: 'ERROR_NOTIFICATION_DIALOG',
      message: 'message',
      contractId,
      serviceAccessPoint,
    } as ResourceBuyingState
    const action = { type: 'CLOSE' } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'TRANSFER_ENABLED',
      contractId,
      serviceAccessPoint,
    })
  })
});

describe('FINISHED', () => {
  it('remains in the same status in case of unknown action', () => {
    const state = {
      name: 'FINISHED',
      contractId,
      serviceAccessPoint,
      status: 'COMPLETED'
    } as ResourceBuyingState
    const action = { type: 'UNKNOWN' } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual(state)
  })

  it('transition to TRANSFER_DIALOG in case of BUY', () => {
    const state = {
      name: 'FINISHED',
      contractId,
      serviceAccessPoint,
      status: 'COMPLETED'
    } as ResourceBuyingState
    const action = { type: 'BUY', } as ResourceBuyingAction

    expect(reducer(state, action)).toEqual({
      name: 'TRANSFER_DIALOG',
      contractId,
      serviceAccessPoint,
      edcConsumerBaseUrl,
      edcProducerBaseUrl,
      dataDestinationAccount,
      dataDestinationContainer
    })
  })
});
