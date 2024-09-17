export type ServiceOfferings = {
  survey_close_time?: string,
  survey_creation_time?: string,
  survey_description?: string,
  survey_end_time?: string,
  survey_id?: string,
  survey_start_time?: string,
  survey_state?: string,
  survey_title?: string,
  survey_url?: string,
}

export interface ServiceOffering {
  label: string,
  name: string,
  policy: string,
  uri: string,
  description: string,
  claimsGraphUri: string,
}
