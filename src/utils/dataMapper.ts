// This Interface is termporary, due to how we recieve data at the moment.

// Interfaces and Mappers for Service Offerings
import { ServiceOffering } from '../types/serviceOfferings.model';

export type CypherQueryResult<T = any> = { items: T[] }

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

export interface ISelfDescription extends CypherQueryResult {
  name: string;
  description: string;
  items: Array<{
    'properties(n)': { [key: string]: string | number | string[] };
  }>;
}

