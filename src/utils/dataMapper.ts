// This Interface is termporary, due to how we recieve data at the moment.
export interface SelfDescriptionInput {
  items: Array<{
    'labels(n)': {
      0: string,
      1: string
    },
    'properties(n)': {
      name: string,
      policy: string,
      uri: string
    };
  }>;
}

export interface SelfDescription {
  label: string,
  name: string,
  policy: string,
  uri: string
}

export function mapSelfDescriptions(selfDescriptions: SelfDescriptionInput): SelfDescription[] {
  console.log('From mapper: ', selfDescriptions);
  return selfDescriptions.items.map(({ 'properties(n)': p, 'labels(n)': l }) => ({
    label: l[1],
    name: p.name,
    policy: p.policy,
    uri : p.uri
  }));
}
