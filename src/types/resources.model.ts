export interface Resource {
    labels: string[],
    name: string,
    description: string,
    uri: string,
    claimsGraphUri: string[],
    format: string
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
