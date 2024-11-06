import process from 'process';

import axios from 'axios';
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

// -----------------------------------------------------------------------------
// Retrieve contract information
// -----------------------------------------------------------------------------
export const retrieveContractInformation = async (input: RetrieveContractInfoInput): Promise<ContractInfo> => {
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
const nrOfRetries = 0;
export const retrieveAgreement = async (input: RetrieveAgreementInput) => {
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
const nrOfRetriesStatusCheck = 0;
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
        status:
          'edc:state' in response ? response['edc:state'] : null,
      } as TransferStatusInfo
    ))
}
