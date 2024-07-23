export interface SelfDescription {
    items: Array<{
        'properties(n)': { [key: string]: string | number | string[] };
    }>;
}

export interface Resource {
    label: string,
    name: string,
    description: string,
    uri: string,
    claimsGraphUri: string,
}
