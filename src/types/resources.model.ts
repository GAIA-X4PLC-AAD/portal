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
    license: string,
    copyrightOwnedBy: string,
    expirationDateTime: string,
    roadType: string,
    containsPII: boolean,
    name: string,
    description: string,
    levelOfDetail: string,
    trafficDirection: string,
    obsoleteDateTime: string,
    laneTypes: string[]
}
