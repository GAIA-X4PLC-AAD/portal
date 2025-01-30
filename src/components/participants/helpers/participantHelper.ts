import { t } from 'i18next';

import { menuItem } from '../../../common/components/buttons/SortListButton';
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

export const getParticipantsMenuItems = (): menuItem[] => {
  return [
    { label: t('participants.sort-menu.a-z'), alias: 'ASC_NAME' },
    { label: t('participants.sort-menu.z-a'), alias: 'DESC_NAME' },
  ];
}

export type ParticipantsSortOrder = 'ASC_NAME' | 'DESC_NAME';
