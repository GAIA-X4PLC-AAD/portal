import { useEffect, useMemo, useState } from 'react';

import { ParticipantDetail } from '../../../types/participants.model';
import { loadParticipantDetails } from '../helpers/participantDataFlow';

export type ParticipantContentType = 'LOADING' | 'SHOW_PARTICIPANT' | 'SHOW_NO_RESULT';

export const useParticipantDetails = (legalName: string) => {
  const [participant, setParticipant] = useState<ParticipantDetail>();
  const [isLoading, setIsLoading] = useState(true);

  const viewContentType = useMemo<ParticipantContentType>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (participant) {
      return 'SHOW_PARTICIPANT'
    } else {
      return 'SHOW_NO_RESULT'
    }
  }, [isLoading, participant])

  useEffect(() => {
    loadParticipantDetails(legalName).then((fetchedParticipant) => {
      setParticipant(fetchedParticipant);
    }).finally(() => setIsLoading(false));
  }, []);

  return {
    participant,
    viewContentType
  }
}
