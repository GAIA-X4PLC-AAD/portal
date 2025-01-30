import { useEffect, useMemo, useState } from 'react';

import { Participant } from '../../../types/participants.model';
import { loadParticipants } from '../helpers/participantDataFlow';
import { applyFilters, ParticipantsSortOrder } from '../helpers/participantHelper';

export type ParticipantsContentType = 'LOADING' | 'SHOW_PARTICIPANTS' | 'SHOW_NO_RESULTS';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState<ParticipantsSortOrder>('ASC_NAME');

  const viewContentType = useMemo<ParticipantsContentType>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (participants.length) {
      return 'SHOW_PARTICIPANTS'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [isLoading, participants])

  useEffect(() => {
    loadParticipants().then((fetchedParticipants) => {
      setParticipants(fetchedParticipants)
    }).finally(() => setIsLoading(false));
  }, []);

  const filteredParticipants = useMemo(() => {
    const filtered = applyFilters(participants, searchText).flat();
    switch (sortOrder) {
    case 'ASC_NAME':
      return filtered.sort((a, b) => (a.legalName ?? '').localeCompare(b.legalName ?? ''));
    case 'DESC_NAME':
      return filtered.sort((a, b) => (b.legalName ?? '').localeCompare(a.legalName ?? ''));
    }
  }, [participants, searchText, sortOrder]);

  const search = (filter: string) => {
    setSearchText(filter)
  }

  const updateSortOrder = (sortOrder: ParticipantsSortOrder) => {
    setSortOrder(sortOrder);
  };

  return {
    participants: filteredParticipants,
    viewContentType,
    search,
    updateSortOrder
  }
}
