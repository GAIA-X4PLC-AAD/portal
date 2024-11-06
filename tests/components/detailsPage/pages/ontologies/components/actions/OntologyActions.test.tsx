import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import OntologyActions
  from '../../../../../../../src/components/detailsPage/pages/ontologies/components/actions/OntologyActions';
import { OntologyContext } from '../../../../../../../src/context/OntologyContext';
import { Ontology } from '../../../../../../../src/types/ontologies.model';
import { withRouter } from '../../../../../../common/testHelper';

const navigate = jest.fn();
const useNavigate = jest.fn(() => navigate)
jest.mock('react-router-dom', () => ({
  useNavigate: () => useNavigate()
}))

const downloadTurtleFile = jest.fn()
jest.mock('../../../../../../../src/services/schemaService.utils', () => ({
  downloadTurtleFile: (subject) => downloadTurtleFile(subject)
}))

describe('OntologyActions', () => {
  it('renders not found text if ontology is not present', () => {
    const { findByText } = render(withRouter(
      <OntologyContext.Provider value={undefined}>
        <OntologyActions/>
      </OntologyContext.Provider>
    ));
    expect(findByText('ontologies.not-found')).not.toBeNull();
  })

  it('renders ontology if it is present', () => {
    const ontology = {
      subject: 'ontology subject',
    } as Ontology

    const { findByText } = render(withRouter(
      <OntologyContext.Provider value={ontology}>
        <OntologyActions/>
      </OntologyContext.Provider>
    ));
    expect(findByText('dashboard.actions')).not.toBeNull();
  })

  it('navigates if navigate to graph pag view button is pressed', () => {
    const ontology = {
      subject: 'ontology subject',
    } as Ontology

    const { getByRole } = render(withRouter(
      <OntologyContext.Provider value={ontology}>
        <OntologyActions/>
      </OntologyContext.Provider>
    ));
    const graphPageButton = getByRole('button', { name: 'details.view-graph' })
    fireEvent.click(graphPageButton);
    expect(navigate).toHaveBeenCalledWith('/shapesAndOntologies/graph/ontology%20subject')
  })

  it('downloads turtle file if download button is pressed', () => {
    const ontology = {
      subject: 'ontology subject',
    } as Ontology

    const { getByRole } = render(withRouter(
      <OntologyContext.Provider value={ontology}>
        <OntologyActions/>
      </OntologyContext.Provider>
    ));
    const graphPageButton = getByRole('button', { name: 'details.download-file' })
    fireEvent.click(graphPageButton);
    expect(downloadTurtleFile).toHaveBeenCalledWith('ontology subject')

  })
});
