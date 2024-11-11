import process from 'process';

import axios, { AxiosError } from 'axios';
import { t } from 'i18next';
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
        'edc:assetsSelector': [{
          'edc:operandRight': 'HadMap (testing transfer)'
        },
        {
          'edc:operandRight': 'HadMap (testing transfer)'
        }]
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
    .then(response => {
      if ('edc:assetsSelector' in response && Array.isArray(response['edc:assetsSelector'])) {
        throw new Error(t('buy-dialog.contract-with-multiple-assets-not-supported'))
      }
      return ({
        contractDefinitionId:
          '@id' in response ? response['@id'] : null,
        assetNameFull:
          'edc:assetsSelector' in response
            ? 'edc:operandRight' in response['edc:assetsSelector']
              ? response['edc:assetsSelector']['edc:operandRight']
              : null
            : null,
      } as ContractInfo)
    })
    .catch((error) => Promise.reject(new DataTransferError(error)))
}

// -----------------------------------------------------------------------------
// Contract negotiation
// -----------------------------------------------------------------------------
export const negotiateContract = async (input: ContractNegotiationInput) => {
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
    .catch((error) => Promise.reject(new DataTransferError(error)))
}

// -----------------------------------------------------------------------------
// Retrieve agreement
// -----------------------------------------------------------------------------
export const retrieveAgreement = async (input: RetrieveAgreementInput) => {
  const headers = {
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edcConsumerBaseUrl}/management/v2/contractnegotiations/${input.contractNegotiationUID}`

  console.debug('retrieve agreement', input)
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
    .catch((error) => Promise.reject(new DataTransferError(error)))
}

// -----------------------------------------------------------------------------
// Initiate data transfer
// -----------------------------------------------------------------------------
export const initiateDataTransfer = async (input: DataTransferInput) => {
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
    .catch((error) => Promise.reject(new DataTransferError(error)))
}

// -----------------------------------------------------------------------------
// Check transfer status
// -----------------------------------------------------------------------------
export const checkTransferStatus = async (
  input: DataTransferStatusCheckInput,
) => {
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
        status: 'edc:state' in response ? response['edc:state'] : null,
      } as TransferStatusInfo
    ))
    .catch((error) => Promise.reject(new DataTransferError(error)))
}

// -----------------------------------------------------------------------------
// DataTransferError
// -----------------------------------------------------------------------------
export class DataTransferError extends Error {
  constructor(error: any) {
    if (typeof error === 'string') {
      super(error)
    } else if (typeof error === 'object') {
      if (error instanceof AxiosError) {
        super(
          'response' in error
            ? error.response && 'data' in error.response
              ? Array.isArray(error.response.data) && error.response.data.length
                ? 'message' in error.response.data[0]
                  ? error.response.data[0].message
                  : error.message
                : error.message
              : error.message
            : error.message)
      } else {
        super(error.message)
      }
    } else {
      super(String(error));
    }
    this.name = 'DataTransferError';

    Object.setPrototypeOf(this, DataTransferError.prototype);
  }
}
