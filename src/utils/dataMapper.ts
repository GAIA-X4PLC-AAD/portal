// This Interface is termporary, due to how we recieve data at the moment.

// Interfaces and Mappers for Service Offerings
export interface ServiceOfferingInput {
  items: Array<{
    'labels(n)': {
      0: string,
      1: string
    },
    'properties(n)': {
      name: string,
      policy: string,
      uri: string,
      description: string,
      claimsGraphUri: string,
    };
  }>;
}

export interface ServiceOffering {
  label: string,
  name: string,
  policy: string,
  uri: string,
  description: string,
  claimsGraphUri: string,
}

export function mapServiceOfferings(selfDescriptions: ServiceOfferingInput): ServiceOffering[] {
  console.debug('From mapper: ', selfDescriptions);
  return selfDescriptions.items.map(({ 'properties(n)': p, 'labels(n)': l }) => ({
    label: l[1],
    name: p.name,
    policy: p.policy,
    uri : p.uri,
    description: p.description,
    claimsGraphUri: p.claimsGraphUri
  }));
}

// Interfaces and Mappers for Resources
export interface ResourceInput {
  items: Array<{
    'labels(n)': string[],
    'properties(n)': {
      name: string,
      description: string,
      uri: string,
      claimsGraphUri: string,
    };
  }>;
}

export interface Resource {
  labels: string[],
  name: string,
  description: string,
  uri: string,
  claimsGraphUri: string,
}

export function mapResources(selfDescriptions: ResourceInput): Resource[] {
  console.debug('mapResource: ', selfDescriptions);
  return selfDescriptions
    .items.map(({ 'properties(n)': p, 'labels(n)': l }) => ({
      labels: l.filter(label => label !== 'Resource' && label !== 'DataResource'),
      name: p.name,
      description: p.description,
      uri: p.uri,
      claimsGraphUri: p.claimsGraphUri
    }));
}

export interface ISelfDescription {
  name: string;
  description: string;
  items: Array<{
    'properties(n)': { [key: string]: string | number | string[] };
  }>;
}

