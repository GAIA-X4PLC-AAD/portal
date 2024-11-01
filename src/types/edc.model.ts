export type DataTransferDialogUserInput = {
  edcConsumerBaseUrl: string;
  dataDestinationAccount: string;
  dataDestinationContainer: string;
}

export type RetrieveContractInfoInput = {
  contractId: string;
  edcProducerBaseUrl: string;
}

export interface ContractInfo {
  contractDefinitionId: string | null;
  assetNameFull: string | null;
}

export type ContractNegotiationInput = {
  edcConsumerBaseUrl: string;
  edcProducerBaseUrl: string;
  contractDefinitionId: string;
  assetNameFull: string;
}

export type NegotiatedContractInfo = {
  contractNegotiationUID: string;
}

export type RetrieveAgreementInput = {
  edcConsumerBaseUrl: string;
  contractNegotiationUID: string;
}

export interface AgreementInfo {
  contractAgreementUID: string | null;
  state: string | null;
}

export type DataTransferInput = {
  edcConsumerBaseUrl: string;
  edcProducerBaseUrl: string;
  dataDestinationAccount: string;
  dataDestinationContainer: string;
  contractAgreementUID: string;
  assetNameFull: string;
}

export interface DataTransferProcessInfo {
  transferProcessId: string | null;
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

export interface TransferStatusInfo {
  status: DataTransferStatuses;
}

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

