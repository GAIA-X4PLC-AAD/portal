import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';

import {
  ParticipantDetailsContext,
  ResourceContextProvider
} from '../../../src/components/context/ParticipantDetailsContext';

describe('ParticipantDetailsContext', () => {
  it('should provide the correct initial context values', () => {
    const TestComponent = () => {
      const context = useContext(ParticipantDetailsContext);

      return (
        <div>
          <div data-testid="view-content-type">{context.viewContentType}</div>
        </div>
      );
    };

    render(
      <ResourceContextProvider
        value={{
          participant: undefined,
          viewContentType: 'SHOW_NO_RESULT',
        }}
      >
        <TestComponent/>
      </ResourceContextProvider>
    );

    expect(screen.getByTestId('view-content-type').textContent).toBe('SHOW_NO_RESULT');
  });

  it('should provide custom context values when specified', () => {
    const TestComponent = () => {
      const context = useContext(ParticipantDetailsContext);

      return (
        <div>
          <div data-testid="view-content-type">{context.viewContentType}</div>
          <div data-testid="participant-id">
            {context.participant ? context.participant.id : 'No Participant'}
          </div>
        </div>
      );
    };

    const mockParticipant = { id: '123', name: 'Test Participant' };

    render(
      <ResourceContextProvider
        value={{
          participant: mockParticipant,
          viewContentType: 'DETAIL_VIEW',
        }}
      >
        <TestComponent/>
      </ResourceContextProvider>
    );

    expect(screen.getByTestId('view-content-type').textContent).toBe('DETAIL_VIEW');
    expect(screen.getByTestId('participant-id').textContent).toBe('123');
  });
});
