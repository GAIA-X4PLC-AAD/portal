export type SelfDescription = {
  id: string,
  subjectClaims: subjectClaims,
  subjectTypes: string,
  subjectProvider?: string,
  relatedSubjectsUris: []
}

type subjectClaims = {
  uri: string
  claimsGraphUri: [],
  legalName?: string,
  legalForm?: string,
  registrationNumber?: string,
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
