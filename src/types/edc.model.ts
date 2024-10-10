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
