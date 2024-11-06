import { fireEvent, render } from '@testing-library/react'
import React from 'react';

import OntologyCardContent from '../../../src/components/ItemCard/OntologyCardContent';
import { Ontology } from '../../../src/types/ontologies.model';
import { withRouter } from '../../common/testHelper';

const navigate = jest.fn();
const useNavigate = jest.fn(() => navigate)
jest.mock('react-router-dom', () => ({
  useNavigate: () => useNavigate()
}))

describe('OntologyCardContent', () => {
  it('renders ontology', () => {
    const { getByText } = render(withRouter(
      <OntologyCardContent
        ontology={
          {
            subject: 'ontology subject',
            description: 'ontology description'
          } as Ontology
        }
      />))

    expect(getByText('ontology subject')).toBeInTheDocument
    expect(getByText('ontology description')).toBeInTheDocument
  })

  it('Handles detail button click', () => {
    const { getByRole } = render(withRouter(
      <OntologyCardContent
        ontology={
          {
            subject: 'ontology subject',
            description: 'ontology description'
          } as Ontology
        }
      />))

    const detailButton = getByRole('button', { name: 'details.more-details' });
    fireEvent.click(detailButton);
    expect(navigate).toHaveBeenCalledWith('/ontologies/details/ontology%20subject');
  })
});
