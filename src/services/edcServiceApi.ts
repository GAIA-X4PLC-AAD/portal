// istanbul ignore file
import process from 'process';

import axios from 'axios';
import { v4 as randomUUID } from 'uuid';

import {
  AgreementInformation,
  ContractAgreementInformation,
  ContractInformation,
  DataTransferInputProps,
  TransferProcessInformation,
  TransferStateInformation
} from '../types/edc.model';

// -----------------------------------------------------------------------------
// Retrieve contract information
// -----------------------------------------------------------------------------
export const loadContractInformation = async (input: DataTransferInputProps): Promise<ContractInformation> => {
  const headers = {
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const baseUrl = `${input.edc.producerBaseUrl}/management`;
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
      } as ContractInformation
    ))
}

// -----------------------------------------------------------------------------
// Contract negotiation
// -----------------------------------------------------------------------------
export const negotiateContract = async (
  input: DataTransferInputProps,
  contract: ContractInformation
) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edc.consumerBaseUrl}/management/v2/contractnegotiations`
  const payload = {
    '@context': {
      edc: 'https://w3id.org/edc/v0.0.1/ns/',
      odrl: 'http://www.w3.org/ns/odrl/2/'
    },
    '@type': 'NegotiationInitiateRequestDto',
    'connectorId': 'edc_pr',
    'connectorAddress': `${input.edc.producerBaseUrl}/api/v1/dsp`,
    'consumerId': 'edc_co',
    'providerId': 'edc_pr',
    'protocol': 'dataspace-protocol-http',
    'offer': {
      offerId: `${contract.contractDefinitionId}:${contract.assetNameFull}:${randomUUID()}`,
      assetId: `${contract.assetNameFull}`,
      policy: {
        '@type': 'Set',
        'odrl:permission': [],
        'odrl:prohibition': [],
        'odrl:obligation': [],
        'odrl:target': `${contract.assetNameFull}`
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
      } as AgreementInformation
    ))
}

// -----------------------------------------------------------------------------
// Retrieve agreement
// -----------------------------------------------------------------------------
export const loadAgreement = async (
  input: DataTransferInputProps,
  agreement: AgreementInformation
) => {
  const headers = {
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edc.consumerBaseUrl}/management/v2/contractnegotiations/${agreement.contractNegotiationUID}`

  return axios
    .get(endpoint, { headers })
    .then(response => response.data)
    .then(response => (
      {
        contractAgreementUID:
          'edc:contractAgreementId' in response ? response['edc:contractAgreementId'] : null,
        state:
          'edc:state' in response ? response['edc:state'] : null
      } as ContractAgreementInformation
    ))
}

// -----------------------------------------------------------------------------
// Initiate data transfer
// -----------------------------------------------------------------------------
export const initiateDataTransfer = async (
  input: DataTransferInputProps,
  contractAgreement: ContractAgreementInformation,
  contract: ContractInformation
) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edc.consumerBaseUrl}/management/v2/transferprocesses`
  const payload = {
    '@context': {
      edc: 'https://w3id.org/edc/v0.0.1/ns/'
    },
    'assetId': contract.assetNameFull,
    'connectorId': 'edc_pr',
    'contractId': contractAgreement.contractAgreementUID,
    'dataDestination': {
      type: 'AzureStorage',
      properties: {
        container: input.dataDestination.container,
        account: input.dataDestination.account,
        keyName: `${input.dataDestination.account}-sas`
      }
    },
    '@type': 'TransferRequestDto',
    'connectorAddress': `${input.edc.producerBaseUrl}/api/v1/dsp`,
    'managedResources': false,
    'protocol': 'dataspace-protocol-http'
  }

  return axios
    .post(endpoint, payload, { headers })
    .then(response => response.data)
    .then(response => (
      {
        transferProcessId:
          '@id' in response ? response['@id'] : null,
      } as TransferProcessInformation
    ))
}

// -----------------------------------------------------------------------------
// Check transfer status
// -----------------------------------------------------------------------------
export const checkTransferStatus = async (
  input: DataTransferInputProps,
  transferProcessInformation: TransferProcessInformation
) => {
  const headers = {
    'Accept': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY,
  }
  const endpoint = `${input.edc.consumerBaseUrl}/management/v2/transferprocesses/${transferProcessInformation.transferProcessId}/state`

  console.debug('Check transfer status:', endpoint);
  return axios
    .get(endpoint, { headers })
    .then(response => response.data)
    .then(response => (
      {
        state:
          'edc:state' in response ? response['edc:state'] : null,
      } as TransferStateInformation
    ))
}
