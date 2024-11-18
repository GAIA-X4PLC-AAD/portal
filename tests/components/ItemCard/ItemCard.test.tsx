import { render } from '@testing-library/react'
import React from 'react'

import ItemCard from '../../../src/components/ItemCard/ItemCard';
import { Ontology } from '../../../src/types/ontologies.model';
import { Participant } from '../../../src/types/participants.model';
import { Resource } from '../../../src/types/resources.model';
import { ServiceOfferings } from '../../../src/types/serviceOfferings.model';
import { Shape } from '../../../src/types/shapes.model';
import { withRouter } from '../../common/testHelper';

describe('ItemCard', () => {

  it('renders the label', () => {
    const { getByText } = render(<ItemCard label="Item Card Label"/>)
    expect(getByText('Item Card Label')).toBeInTheDocument
  })

  it('renders the gaia-x-compliant if isGaiaXCompliant is true', () => {
    const { getByText } = render(<ItemCard label="" isGaiaXCompliant={true}/>)
    expect(getByText('common.is-gaia-x-compliant')).toBeInTheDocument
  })

  it('renders the gaia-x-compliant if isGaiaXCompliant is false', () => {
    const { getByText } = render(<ItemCard label="" isGaiaXCompliant={false}/>)
    expect(getByText('common.not-gaia-x-compliant')).toBeInTheDocument
  })

  it('renders ontology', () => {
    const { getByText } = render(withRouter(<ItemCard label="" ontology={
      {
        subject: 'ontology subject',
        description: 'ontology description',
      } as Ontology
    }/>))
    expect(getByText('ontology subject')).toBeInTheDocument
    expect(getByText('ontology description')).toBeInTheDocument
  })

  it('renders shape', () => {
    const { getByText } = render(withRouter(<ItemCard label="" shape={
      {
        shaclShapeName: 'shacl shape name',
      } as Shape
    }/>))
    expect(getByText('shacl shape name')).toBeInTheDocument
  })

  it('renders service', () => {
    const { getByText } = render(withRouter(<ItemCard label="" service={
      {
        name: 'service name',
        description: 'service description',
      } as ServiceOfferings
    }/>))
    expect(getByText('service name')).toBeInTheDocument
    expect(getByText('service description')).toBeInTheDocument
  })

  it('renders resource', () => {
    const { getByText } = render(withRouter(<ItemCard label="" resource={
      {
        name: 'resource name',
        description: 'resource description',
      } as Resource
    }/>))
    expect(getByText('resource name')).toBeInTheDocument
    expect(getByText('resource description')).toBeInTheDocument
  })

  it('participant content', () => {
    const { getByText } = render(withRouter(<ItemCard label="" participant={
      {
        legalName: 'participant legal name',
      } as Participant
    }/>))
    expect(getByText('participant legal name')).toBeInTheDocument
  })

});
