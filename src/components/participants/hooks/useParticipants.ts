import { useEffect, useMemo, useState } from 'react';

import { Participant } from '../../../types/participants.model';
import { loadParticipants } from '../helpers/participantDataFlow';
import { applyFilters } from '../helpers/participantHelper';

export type ParticipantsContentType = 'LOADING' | 'SHOW_PARTICIPANTS' | 'SHOW_NO_RESULTS';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('')

  const viewContentType = useMemo<ParticipantsContentType>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (participants.length) {
      return 'SHOW_PARTICIPANTS'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [isLoading])

  useEffect(() => {
    loadParticipants().then((fetchedParticipants) => {
      setParticipants(fetchedParticipants)
    }).finally(() => setIsLoading(false));
  }, []);

  const filteredParticipants = useMemo(() => applyFilters(participants, searchText).flat(), [participants, searchText]);
  const search = (filter: string) => {
    setSearchText(filter)
  }

  return {
    participants: filteredParticipants,
    viewContentType,
    search
  }
}
