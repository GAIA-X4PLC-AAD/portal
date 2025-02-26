import { render, screen } from '@testing-library/react';
import React from 'react';

import { ResourceDetailsContext } from '../../../../src/components/context/ResourceDetailsContext';
import '@testing-library/jest-dom';
import ResourceDetailMainContent from '../../../../src/components/resources/components/ResourceDetailMainContent';
import { CombinedDetails } from '../../../../src/types/resources.model';

const mockResourceDetails = {
  details: {
    name: 'Resource 1',
    uri: 'http://example.com',
    legalName: 'Vendor 1',
    mediaUrl: 'mediaUrl 1',
    contractId: '123',
  },
  items: [{
    r: 'r 1',
    other: {
      key1: 'value1',
      key2: 'value2',
    },
    dataResource: {
      key1: 'value1',
      key2: 'value2',
    }
  }]
};

const ComponentUnderTest = (resourceDetails: CombinedDetails) => {
  return render (
    <ResourceDetailsContext.Provider value={resourceDetails}>
      <ResourceDetailMainContent />
    </ResourceDetailsContext.Provider>

  )
}

describe('ResourceDetailMainContent', () => {

  it('renders correctly with resource details', () => {
    ComponentUnderTest(mockResourceDetails);
    expect(screen.queryAllByText('general')).not.toBeNull();

  });

  it('renders empty component when no resource details are provided', () => {
    const { container } = ComponentUnderTest(null);
    expect(container).toBeEmptyDOMElement();
  });
});
