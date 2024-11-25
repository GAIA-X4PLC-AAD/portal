/* test coverage not required */
export interface Resource {
    vendor: string,
    format: string,
    labels: string[],
    name: string,
    description: string,
    uri: string,
    claimsGraphUri: string[],
}

export interface ResourceDetails {
    name: string,
    uri: string,
    contractId?: string,
    serviceAccessPoint?: {
        protocol: string,
        host: string,
    }
}

export interface ResourceDetails2 {
    uri: string,
    name: string,
    description: string,
    claimsGraphUri: string[],
    license: string,
    copyrightOwnedBy: string,
    expirationDateTime: string,
    roadTypes: string,
    containsPII: boolean,
    levelOfDetail: string,
    trafficDirection: string,
    obsoleteDateTime: string,
    laneTypes: string[],
    legalName: string,
}
