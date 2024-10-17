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
