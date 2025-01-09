/* test coverage not required */
export interface ServiceOffering {
  labels: string[],
  name: string,
  uri: string,
  description: string,
}

export interface ServiceOfferingRequiredFile {
  description: string,
  specification: string,
}

export interface ServiceOfferingDetails {
  name: string;
  description: string;
  requiredFilesList: ServiceOfferingRequiredFile[];
  resultingFileDescription: string,
  resultingFileSpecification: string,
  contractId: string,
  recordingTime: string,
  serviceAccessPointHost: string,
  serviceAccessPointName: string,
  serviceAccessPointOpenAPI: string,
  serviceAccessPointProtocol: string,
  serviceAccessPointPort: string,
  hostedOnLocation: string,
  hostedOnDescription: string,
  hostedOnName: string,
  providedBy: string,
  claimsGraphUri: string[]
}
