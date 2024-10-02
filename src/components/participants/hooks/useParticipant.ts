import { useEffect, useMemo, useState } from 'react';

import { Participant } from '../../../types/participants.model';
import { loadParticipants } from '../helpers/participantDataFlow';

export type ParticipantViewState = 'LOADING' | 'SHOW_PARTICIPANT' | 'SHOW_NO_RESULT';

export const useParticipant = (legalName: string) => {
  const [participant, setParticipant] = useState<Participant>();
  const [isLoading, setIsLoading] = useState(true);

  const state = useMemo<ParticipantViewState>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (participant) {
      return 'SHOW_PARTICIPANT'
    } else {
      return 'SHOW_NO_RESULT'
    }
  }, [isLoading])

  // useEffect(() => {
  //   getParticipantByLegalName(legalName).then((fetchedParticipant) => {
  //     setParticipant(fetchedParticipant);
  //     console.log(fetchedParticipant);
  //     console.log(participant);
  //   }).finally(() => setIsLoading(false));
  // }, []);

  useEffect(() => {
    loadParticipants().then((fetchedParticipants) => {
      const filteredParticipants = fetchedParticipants
        .filter((p: any) => Object
          .entries(p)
          .some(property => !legalName ||
                        String(property[1])
                          .includes(legalName)
          )
        )
      if (filteredParticipants.length !== 0) {
        setParticipant(filteredParticipants[0])
        console.log('participant: ', participant);
        console.log('filtered participants', filteredParticipants);
      }
      console.log('fetched participants', fetchedParticipants);
      console.log('legalName:', legalName);
    }).finally(() => setIsLoading(false));
  }, []);

  return {
    participant,
    state
  }
}
