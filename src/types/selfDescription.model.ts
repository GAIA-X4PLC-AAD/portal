import {Participants} from "./participants.model";
import { ServiceOfferings } from "./serviceOfferings.model";

export type SelfDescription = {
  subjectTypes: string,
  subjectClaims: SubjectClaims,
  subjectProvider?: string,
  relatedSubjectsUris?: []
}

type SubjectClaims = {
  id: string,
  claimsGraphUri: [],
} & Participants | ServiceOfferings
