import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import ParticipantDetails from '../../../src/components/participants/ParticipantDetails';
import { withRouter } from '../../common/testHelper';

import { normal_render } from './__fixtures__/useParticipant_ParticipantDetails';

const useParticipantDetails = jest.fn();

jest.mock('../../../src/components/participants/hooks/useParticipantDetails', () => ({
  useParticipantDetails: () => useParticipantDetails(),
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ParticipantDetails', () => {
  beforeAll(() => {
    useParticipantDetails.mockReturnValue(normal_render); // Mock the useParticipants hook
  });

  it('renders al participant correctly', () => {
    const { getByRole } = render(withRouter(<ParticipantDetails/>));

    // Check the heading
    expect(getByRole('heading', { name: /participants.title → msg systems ag/i })).toBeInTheDocument();

  });
});
