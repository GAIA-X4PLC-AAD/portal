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
    mediaUrl: string,

    contractId?: string,
    serviceAccessPoint?: {
        protocol: string,
        host: string,
    }
}
