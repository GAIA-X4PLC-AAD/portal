import process from 'process';

import { v4 as randomUUID } from 'uuid';

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
} from '../types/edc.model';
import { delay } from '../utils/timers';

// -----------------------------------------------------------------------------
// Retrieve contract information
// -----------------------------------------------------------------------------
export const retrieveContractInformation = async (input: RetrieveContractInfoInput): Promise<ContractInfo> => {
  // mock axios call
  const axios = {
    get: (endpoint: string, headers: object) => delay(1000).then(() => ({
      data: {
        '@id': '123456789',
        'edc:assetsSelector': {
          'edc:operandRight': 'HadMap (testing transfer)'
        }
      }
    }))
  }

  const headers = {
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const baseUrl = `${input.edcProducerBaseUrl}/management`;
  const endpoint = `${baseUrl}/v2/contractdefinitions/${input.contractId}`

  return axios
    .get(endpoint, { headers })
    .then(response => response.data)
    .then(response => (
      {
        contractDefinitionId:
          '@id' in response ? response['@id'] : null,
        assetNameFull:
          'edc:assetsSelector' in response
            ? 'edc:operandRight' in response['edc:assetsSelector']
              ? response['edc:assetsSelector']['edc:operandRight']
              : null
            : null,
      } as ContractInfo
    ))
}

// -----------------------------------------------------------------------------
// Contract negotiation
// -----------------------------------------------------------------------------
export const negotiateContract = async (input: ContractNegotiationInput) => {
  // mock axios call
  const axios = {
    post: (endpoint: string, payload: object, headers: object) => delay(1000).then(() => ({
      data: { '@id': '987654321' }
    }))
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edcConsumerBaseUrl}/management/v2/contractnegotiations`
  const payload = {
    '@context': {
      edc: 'https://w3id.org/edc/v0.0.1/ns/',
      odrl: 'http://www.w3.org/ns/odrl/2/'
    },
    '@type': 'NegotiationInitiateRequestDto',
    'connectorId': 'edc_pr',
    'connectorAddress': `${input.edcProducerBaseUrl}/api/v1/dsp`,
    'consumerId': 'edc_co',
    'providerId': 'edc_pr',
    'protocol': 'dataspace-protocol-http',
    'offer': {
      offerId: `${input.contractDefinitionId}:${input.assetNameFull}:${randomUUID()}`,
      assetId: `${input.assetNameFull}`,
      policy: {
        '@type': 'Set',
        'odrl:permission': [],
        'odrl:prohibition': [],
        'odrl:obligation': [],
        'odrl:target': `${input.assetNameFull}`
      }
    }
  }

  return axios
    .post(endpoint, payload, { headers })
    .then(response => response.data)
    .then(response => (
      {
        contractNegotiationUID:
          '@id' in response ? response['@id'] : null,
      } as NegotiatedContractInfo
    ))
}

// -----------------------------------------------------------------------------
// Retrieve agreement
// -----------------------------------------------------------------------------
let nrOfRetries = 0;
export const retrieveAgreement = async (input: RetrieveAgreementInput) => {
  // mock axios call
  const axios = {
    get: (endpoint: string, headers: object) => delay(100).then(() => {
      let retVal = {
        data: {
          'edc:contractAgreementId': '23479-hjk124-h3k1h4-1344114',
          'edc:state': 'INITIATED'
        }
      }
      if (nrOfRetries === 3) {
        retVal = {
          data: {
            'edc:contractAgreementId': '23479-hjk124-h3k1h4-1344114',
            'edc:state': 'FINALIZED'
          }
        }
        nrOfRetries = 0;
      } else {
        nrOfRetries += 1;
      }
      return retVal;
    })
  }

  const headers = {
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edcConsumerBaseUrl}/management/v2/contractnegotiations/${input.contractNegotiationUID}`

  return axios
    .get(endpoint, { headers })
    .then(response => response.data)
    .then(response => (
      {
        contractAgreementUID:
          'edc:contractAgreementId' in response ? response['edc:contractAgreementId'] : null,
        state:
          'edc:state' in response ? response['edc:state'] : null
      } as AgreementInfo
    ))
}

// -----------------------------------------------------------------------------
// Initiate data transfer
// -----------------------------------------------------------------------------
export const initiateDataTransfer = async (input: DataTransferInput) => {
  // mock axios call
  const axios = {
    post: (endpoint: string, payload: object, headers: object) => delay(1000).then(() => ({
      data: { '@id': '12983791-fda-2342-423423423' }
    }))
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edcConsumerBaseUrl}/management/v2/transferprocesses`
  const payload = {
    '@context': {
      edc: 'https://w3id.org/edc/v0.0.1/ns/'
    },
    'assetId': input.assetNameFull,
    'connectorId': 'edc_pr',
    'contractId': input.contractAgreementUID,
    'dataDestination': {
      type: 'AzureStorage',
      properties: {
        container: input.dataDestinationContainer,
        account: input.dataDestinationAccount,
        keyName: `${input.dataDestinationAccount}-sas`
      }
    },
    '@type': 'TransferRequestDto',
    'connectorAddress': `${input.edcProducerBaseUrl}/api/v1/dsp`,
    'managedResources': false,
    'protocol': 'dataspace-protocol-http'
  }

  return axios
    .post(endpoint, payload, { headers })
    .then(response => response.data)
    .then(response => (
      {
        transferProcessId: '@id' in response ? response['@id'] : null,
      } as DataTransferProcessInfo
    ))
}

// -----------------------------------------------------------------------------
// Check transfer status
// -----------------------------------------------------------------------------
let nrOfRetriesStatusCheck = 0;
export const checkTransferStatus = async (
  input: DataTransferStatusCheckInput,
) => {
  // mock axios call
  const axios = {
    get: (endpoint: string, headers: object) => delay(100).then(() => {
      let state = ''
      if (nrOfRetriesStatusCheck === 5) {
        state = 'COMPLETED'
        nrOfRetriesStatusCheck = 0
      } else {
        state = 'STARTED'
        nrOfRetriesStatusCheck += 1
      }
      return {
        data: {
          'edc:state': state
        }
      }
    })
  }

  const headers = {
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edcConsumerBaseUrl}/management/v2/transferprocesses/${input.transferProcessId}/state`

  console.debug('Check transfer status:', endpoint);
  return axios
    .get(endpoint, { headers })
    .then(response => response.data)
    .then(response => (
      {
        status:
          'edc:state' in response ? response['edc:state'] : null,
      } as TransferStatusInfo
    ))
}
