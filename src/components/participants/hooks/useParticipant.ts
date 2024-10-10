import { useEffect, useMemo, useState } from 'react';

import { Participant } from '../../../types/participants.model';
import { getParticipantByLegalName } from '../helpers/participantDataFlow';

export type ParticipantContentType = 'LOADING' | 'SHOW_PARTICIPANT' | 'SHOW_NO_RESULT';

export const useParticipant = (legalName: string) => {
  const [participant, setParticipant] = useState<Participant>();
  const [isLoading, setIsLoading] = useState(true);

  const viewContentType = useMemo<ParticipantContentType>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (participant) {
      return 'SHOW_PARTICIPANT'
    } else {
      return 'SHOW_NO_RESULT'
    }
  }, [isLoading])

  console.log('participant', participant);
  console.log('isLoading', isLoading);

  useEffect(() => {
    getParticipantByLegalName(legalName).then((fetchedParticipant) => {
      setParticipant(fetchedParticipant);
    }).finally(() => setIsLoading(false));
  }, []);

  return {
    participant,
    viewContentType
  }
}
