/* test coverage not required */
export interface Resource {
    vendor: string,
    format: string,
    labels: string[],
    name: string,
    description: string,
    uri: string,
    recordingTime: string,
    claimsGraphUri: string[],
}

export interface ResourceDetails {
    name: string,
    uri: string,
    legalName: string,
    mediaUrl: string,

    contractId?: string,
    serviceAccessPoint?: {
        protocol: string,
        host: string,
    }
}

export interface ResourceItem {
    r: string;
    other: Record<string, any>;
    dataResource: Record<string, any>;
}
export interface RDetails {
    details: ResourceDetails;
    items: ResourceItem[];
}
