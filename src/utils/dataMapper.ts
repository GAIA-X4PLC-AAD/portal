export interface SelfDescriptionInput {
  items: Array<{
    'properties(n)': {
      survey_id: string;
      claimsGraphUri: string;
      survey_url: string;
      survey_title: string;
      survey_description: string;
      survey_creation_time: string;
      survey_end_time: string;
      uri: string;
    };
  }>;
}

export interface SelfDescription {
  survey_id: string;
  claimsGraphUri: string;
  survey_url: string;
  survey_title: string;
  survey_description: string;
  survey_creation_time: string;
  survey_end_time: string;
  uri: string;
}

export function mapSelfDescriptions(selfDescriptions: SelfDescriptionInput): SelfDescription[] {
  console.log('From mapper: ', selfDescriptions);
  return selfDescriptions.items.map(({ 'properties(n)': p }) => ({
    survey_id: p.survey_id,
    claimsGraphUri: p.claimsGraphUri,
    survey_url: p.survey_url,
    survey_title: p.survey_title,
    survey_description: p.survey_description,
    survey_creation_time: p.survey_creation_time,
    survey_end_time: p.survey_end_time,
    uri: p.uri,
  }));
}
