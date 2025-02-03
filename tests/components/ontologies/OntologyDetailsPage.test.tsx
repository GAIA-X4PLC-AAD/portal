import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { OntologyContext } from '../../../src/components/context/OntologyContext';
import OntologyDetailsPage from '../../../src/components/ontologies/OntologyDetailsPage';
import { Ontology } from '../../../src/types/ontologies.model';
import { withRouter } from '../../common/testHelper';

const fetchAllSchemas = jest.fn();
const shapes = jest.fn();
const ontology = jest.fn();

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

jest.mock('../../../src/services/schemaApiService', () => ({
  fetchAllSchemas: () => fetchAllSchemas(),
}));

jest.mock('../../../src/services/shapeService.utils', () => ({
  fetchAllShapesFromSchemas: () => shapes(),
}));

jest.mock('../../../src/services/ontologyService.utils', () => ({
  fetchOntologyById: () => ontology(),
}));

const mockOntology = {
  subject: 'Ontology 1',
  description: 'Ontology 1 description',
  version: '1.0',
  contributors: ['Contributor 1', 'Contributor 2'],
  nodes: [],
  links: [],
  relatedShapes: [],
} as Ontology;
describe('OntologyDetailsPage', () => {
  beforeAll(() => {
    ontology.mockResolvedValue(mockOntology);
  });

  it('renders an ontology correctly', async () => {
    render(
      withRouter(
        <OntologyContext.Provider value={ontology}>
          <OntologyDetailsPage/>
        </OntologyContext.Provider>
      )
    );

    const link_ontologies = await screen.findByRole('link', { name: /left-menu.shapesAndOntologies/i });
    expect(link_ontologies).toBeInTheDocument();
    expect(link_ontologies).toHaveAttribute('href', '/ontologies');
  });
});
