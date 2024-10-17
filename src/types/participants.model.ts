export type Participant = {
  legalName: string,
  labels: string[]
}

export type ParticipantDetail = Participant & {
  claimsGraphUri: string[],
  uri: string,
  gaiaxTermsAndConditions: string
}
