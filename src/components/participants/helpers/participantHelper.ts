import i18next from 'i18next';

import { MenuItemObject, SortOrder } from '../../../common/components/buttons/SortListButton';
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

export const getParticipantsMenuItems = (): MenuItemObject[] => {
  return [
    { label: i18next.t('participants.sort-menu.a-z'), sortOrder: SortOrder.ASC_NAME },
    { label: i18next.t('participants.sort-menu.z-a'), sortOrder: SortOrder.DESC_NAME },
  ];
}

export const getSortedParticipants = (participants: Participant[], sortOrder: SortOrder) => {
  switch (sortOrder) {
  case SortOrder.ASC_NAME:
    return participants.sort((a, b) => (a.legalName ?? '').localeCompare(b.legalName ?? ''));
  case SortOrder.DESC_NAME:
    return participants.sort((a, b) => (b.legalName ?? '').localeCompare(a.legalName ?? ''));
  default: return participants;
  }
}
