export type RetrieveContractInfoInput = {
  contractId: string;
  edcConsumerBaseUrl: string;
  dataDestinationContainer: string;
  dataDestinationAccount: string;
}

export type ContractNegotiationInput = {
  edcConsumerBaseUrl: string;
  edcProducerBaseUrl: string;
  contractDefinitionId: string;
  assetNameFull: string;
}

export type RetrieveAgreementInput = {
  edcConsumerBaseUrl: string;
  contractNegotiationUID: string;
}

export type DataTransferInitiationInput = {
  edcConsumerBaseUrl: string;
  edcProducerBaseUrl: string;
  dataDestinationContainer: string;
  dataDestinationAccount: string;
  contractAgreementUID: string;
  assetNameFull: string;
}

export type DataTransferStatusCheckInput = {
  edcConsumerBaseUrl: string;
  transferProcessId: string;
}

export type DataTransferStatuses =
  | 'STARTED'
  | 'COMPLETED'
  | 'TERMINATED'
  | 'DEPROVISIONED'
  | 'INITIATED'
  | 'PROVISIONED'
  | 'REQUESTED'

export type DataTransferInputProps = {
  contractId: string;
  edc: {
    consumerBaseUrl: string;
    producerBaseUrl: string;
  },
  dataDestination: {
    container: string;
    account: string;
  }
}

export interface ContractInformation {
  contractDefinitionId: string | null;
  assetNameFull: string | null;
}

export interface AgreementInformation {
  contractNegotiationUID: string;
}

export interface ContractAgreementInformation {
  contractAgreementUID: string | null;
  state: string | null;
}

export interface TransferProcessInformation {
  transferProcessId: string | null;
}

export interface TransferStateInformation {
  state: DataTransferStatuses;
}
