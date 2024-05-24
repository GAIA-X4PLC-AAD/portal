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
  console.log('From mapper: ', selfDescriptions);
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
    'labels(n)': {
      0: string,
      1: string
    },
    'properties(n)': {
      name: string,
      description: string,
      uri: string,
      claimsGraphUri: string,
    };
  }>;
}

export interface Resource {
  label: string,
  name: string,
  description: string,
  uri: string,
  claimsGraphUri: string,
}

export function mapResources(selfDescriptions: ResourceInput): Resource[] {
  console.log('From mapper: ', selfDescriptions);
  return selfDescriptions.items.map(({ 'properties(n)': p, 'labels(n)': l }) => ({
    label: l[1],
    name: p.name,
    description: p.description,
    uri : p.uri,
    claimsGraphUri : p.claimsGraphUri
  }));
}
