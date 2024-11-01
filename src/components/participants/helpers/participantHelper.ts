import { Participant } from '../../../types/participants.model';

export const applyFilters = (participants: Participant[], searchText: string): Participant[] => (
  participants
    .filter(participant => Object
      .entries(participant)
      .some(property => !searchText ||
                String(property[1]).toLowerCase()
                  .includes(searchText.toLowerCase())
      )
    )
)
