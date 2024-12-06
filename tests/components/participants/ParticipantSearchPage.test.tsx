import { render, within } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import ParticipantSearchPage from '../../../src/components/participants/ParticipantSearchPage';
import { withRouter } from '../../common/testHelper';

import { normal_render } from './__fixtures__/useParticipants_ParticipantSearchPage';

const useParticipants = jest.fn();

jest.mock('../../../src/components/participants/hooks/useParticipants', () => ({
  useParticipants: () => useParticipants(),
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ParticipantSearchPage', () => {
  beforeAll(() => {
    useParticipants.mockReturnValue(normal_render); // Mock the useParticipants hook
  });

  it('renders all participants correctly', () => {
    const { getByRole, getByTestId } = render(withRouter(<ParticipantSearchPage/>));
    // Check the heading
    expect(getByRole('heading', { name: /participants.titles \(5 common.results\)/i })).toBeInTheDocument();

    // Constants for each participant's card
    // Get the card element for "msg systems AG" by its test ID and verify it is in the document
    const participantCard_msg_systems_AG = getByTestId('Card:msg systems AG');
    expect(participantCard_msg_systems_AG).toBeInTheDocument();

    // Get the label/heading inside the "msg systems AG" card and verify its presence
    const participantCardLabel_msg_systems_AG = within(participantCard_msg_systems_AG)
      .getByRole('heading', { name: 'msg systems AG' });
    expect(participantCardLabel_msg_systems_AG).toBeInTheDocument();

    // Get the "More details" button inside the "msg systems AG" card and verify its presence
    const participantCardButton_msg_systems_AG = within(participantCard_msg_systems_AG)
      .getByRole('button', { name: /details.more-details/i });
    expect(participantCardButton_msg_systems_AG).toBeInTheDocument();

    // Get the "LegalParticipant" title within the "msg systems AG" card and verify the text content
    const participantCardTitle_msg_systems_AG = within(participantCard_msg_systems_AG)
      .getByRole('heading', { name: 'LegalParticipant' });
    expect(participantCardTitle_msg_systems_AG.textContent).toEqual('LegalParticipant');
  });
});
