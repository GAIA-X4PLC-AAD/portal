import { render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

import ParticipantDetails from '../../../src/components/participants/ParticipantDetails';

import { normal_render } from './__fixtures__/useParticipant_ParticipantDetails';

const useParticipant = jest.fn();

jest.mock('../../../src/components/participants/hooks/useParticipant', () => ({
  useParticipant: () => useParticipant(),
}));

const withRouter = (component: ReactNode) => (
  <>
    <MemoryRouter>{component}</MemoryRouter>
  </>
);

describe('ParticipantDetails', () => {
  beforeEach(() => {
    useParticipant.mockReturnValue(normal_render); // Mock the useParticipants hook
  });

  it('renders al participant correctly', () => {
    const { getByRole, getByTestId } = render(withRouter(<ParticipantDetails/>));

    // Check the heading
    expect(getByRole('heading', { name: /participants.title → msg systems ag/i })).toBeInTheDocument();

  });
});
