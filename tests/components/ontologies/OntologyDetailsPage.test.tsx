import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import OntologyDetailsPage from '../../../src/components/ontologies/OntologyDetailsPage';
import { withRouter } from '../../common/testHelper';

import { mockOntologyDetails } from './__fxitures__/mockOntologyDetails';

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

describe('OntologyDetailsPage', () => {
  beforeAll(() => {
    ontology.mockReturnValue(Promise.resolve(mockOntologyDetails));
  });

  it('renders an ontology correctly', async () => {
    render(withRouter(<OntologyDetailsPage/>, '/ontologies/ontologyId1', '/ontologies/:ontologyId'));

    const link_ontologies = await screen.findByRole('link', { name: /left-menu.shapesAndOntologies/i });
    expect(link_ontologies).toBeInTheDocument();
    expect(link_ontologies).toHaveAttribute('href', '/ontologies');
  });
});
