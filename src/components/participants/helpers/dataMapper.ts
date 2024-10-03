import { Participant } from '../../../types/participants.model';

export interface ParticipantInput {
    items: {
        labels: string[],
        properties: Participant;
    }[]
}

export function mapParticipants(participantInput: ParticipantInput): Participant[] {
  return participantInput
    .items.map(({ properties, labels }) => ({
      ...properties,
      labels,
    }));
}
