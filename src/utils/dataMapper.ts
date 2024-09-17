// This Interface is termporary, due to how we recieve data at the moment.

// Interfaces and Mappers for Service Offerings
import { Resource } from '../types/resources.model';
import { ServiceOffering } from '../types/serviceOfferings.model';

// TODO: Refactor. See ResourceInput.
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

// TODO: Refactor. See mapResources(...).
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

type ResourceInputProperties = Exclude<Resource, 'labels'>
export interface ResourceInput {
  items: {
    format: string,
    labels: string[],
    properties: ResourceInputProperties;
  }[];
}

export function mapResources(selfDescriptions: ResourceInput): Resource[] {
  const resources = selfDescriptions
    .items.map(({ format, properties, labels }) => ({
      ...properties,
      labels,
      format
    }));
  console.debug('resources', resources)
  return resources;
}

export interface ISelfDescription {
  name: string;
  description: string;
  items: Array<{
    'properties(n)': { [key: string]: string | number | string[] };
  }>;
}

