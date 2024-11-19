import { render } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import ResourceCardContent from '../../../src/components/ItemCard/ResourceCardContent';
import { Resource } from '../../../src/types/resources.model';
import { withRouter } from '../../common/testHelper';

describe('ResourceCardContent', () => {
  it('it renders correctly', () => {
    const resource = {
      uri: 'did:hdmap:resource-uri',
      name: 'resource name',
      description: 'resource description',
    } as Resource;

    const { getByText } = render(withRouter(
      <ResourceCardContent resource={resource}/>
    ))

    const name = getByText(resource.name)
    expect(name).toBeInTheDocument
    const description = getByText(resource.description)
    expect(description).toBeInTheDocument
  })
})
