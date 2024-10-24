import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import Ontologies from '../../../src/components/ontologies/Ontologies';

jest.mock('../../../src/components/ontologies/useOntologies', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    ontologies: [
      { subject: 'Ontology 1' },
      { subject: 'Ontology 2' }
    ],
    nodes: [],
    links: [],
    state: 'SHOW_ONTOLOGIES',
    toggleShowMap: jest.fn(),
    search: jest.fn(),
  })),
}));

const ComponentUnderTest = () => (
  <MemoryRouter>
    <Ontologies />
  </MemoryRouter>
)

describe('Ontologies', () => {
  it('should render ontologies', () => {
    render(<ComponentUnderTest />);

    expect(screen.queryByText('Ontology 1')).not.toBeNull();
    expect(screen.queryByText('Ontology 2')).not.toBeNull();
  });

});
