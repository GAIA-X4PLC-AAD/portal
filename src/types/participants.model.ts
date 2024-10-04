export type Participant = {
  legalName: string,
  labels: string[]
}

export type ParticipantDetail = Participant & {
  claimsGraphUri: string[],
  uri: string,
  gaiaxTermsAndConditions: string
} | null | undefined;

export interface ParticipantResponse {
  totalCount: number;
  items: Participant[];
}

export interface ParticipantDetailsResponse {
  totalCount: number;
  items: ParticipantDetail[];
}
