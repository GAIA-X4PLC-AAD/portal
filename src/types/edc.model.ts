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

export type TransferStates =
  'STARTED'
  | 'COMPLETED'
  | 'TERMINATED'
  | 'DEPROVISIONED'
  | 'INITIATED'
  | 'PROVISIONED'
  | 'REQUESTED'

export interface TransferStateInformation {
  state: TransferStates;
}
