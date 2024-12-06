import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import OntologiesSearchPage from '../../../src/components/ontologies/OntologiesSearchPage';

jest.mock('../../../src/components/ontologies/hooks/useOntologies', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const ComponentUnderTest = () => (
  <MemoryRouter>
    <OntologiesSearchPage/>
  </MemoryRouter>
)

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('Ontologies', () => {
  it('should render ontologies', () => {
    require('../../../src/components/ontologies/hooks/useOntologies').default.mockReturnValue({
      ontologies: [
        { subject: 'Ontology 1' },
        { subject: 'Ontology 2' }
      ],
      state: 'SHOW_ONTOLOGIES',
    });

    render(<ComponentUnderTest />);

    expect(screen.queryByText('Ontology 1')).not.toBeNull();
    expect(screen.queryByText('Ontology 2')).not.toBeNull();
  });

  it('should render the header with the correct title', () => {
    require('../../../src/components/ontologies/hooks/useOntologies').default.mockReturnValue({
      ontologies: [
        { subject: 'Ontology 1' },
        { subject: 'Ontology 2' }
      ],
    });

    render(<ComponentUnderTest />);

    expect(screen.queryByText(/ontologies.titles/)).not.toBeNull();
    expect(screen.queryByText(/(2 dashboard.results)/)).not.toBeNull();
  });

  it('should render the search bar', () => {
    require('../../../src/components/ontologies/hooks/useOntologies').default.mockReturnValue({
      ontologies: [
        { subject: 'Ontology 1' },
        { subject: 'Ontology 2' }
      ],
      state: 'SHOW_ONTOLOGIES',
    });

    render(<ComponentUnderTest />);

    expect(screen.queryByPlaceholderText(/ontologies.search-bar-text/)).not.toBeNull();
  });

  it('should render the loading indicator when state is LOADING', () => {
    require('../../../src/components/ontologies/hooks/useOntologies').default.mockReturnValue({
      ontologies: [],
      state: 'LOADING',
    });

    render(<ComponentUnderTest />);

    expect(screen.getByAltText('common.is-loading')).not.toBeNull();
  });

  it('should render the no content message when state is SHOW_NO_RESULTS', () => {
    require('../../../src/components/ontologies/hooks/useOntologies').default.mockReturnValue({
      ontologies: [],
      state: 'SHOW_NO_RESULTS',
    });

    render(<ComponentUnderTest />);

    expect(screen.queryByText(/ontologies.no-ontologies-available/)).not.toBeNull();
  });
});
