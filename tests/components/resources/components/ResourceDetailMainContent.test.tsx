import { render, screen } from '@testing-library/react';
import React from 'react';

import { ResourceDetailsContext } from '../../../../src/components/context/ResourceDetailsContext';
import '@testing-library/jest-dom';
import ResourceDetailMainContent from '../../../../src/components/resources/components/ResourceDetailMainContent';
import { ResourceDetails } from '../../../../src/types/resources.model';

const mockResourceDetails = {
  name: 'name',
  uri: 'uri',
  description: 'description',
  claimsGraphUri: ['claimsGraphUri'],
  license: 'license',
  copyrightOwnedBy: 'copyrightOwnedBy',
  expirationDateTime: 'expirationDateTime',
  roadTypes: 'roadTypes',
  containsPII: true,
  levelOfDetail: 'levelOfDetail',
  trafficDirection: 'trafficDirection',
  obsoleteDateTime: 'obsoleteDateTime',
  laneTypes: ['laneTypes'],
  legalName: 'legalName',
  mediaUrl: 'mediaUrl',
};

const ComponentUnderTest = (resourceDetails: ResourceDetails) => {
  return render (
    <ResourceDetailsContext.Provider value={resourceDetails}>
      <ResourceDetailMainContent />
    </ResourceDetailsContext.Provider>

  )
}

describe('ResourceDetailMainContent', () => {

  it('renders correctly with resource details', () => {
    ComponentUnderTest(mockResourceDetails);
    expect(screen.queryByText('name')).not.toBeNull();
    expect(screen.queryAllByText('legalName')).not.toBeNull();
    expect(screen.queryByText('expirationDateTime')).not.toBeNull();
    expect(screen.queryByText('obsoleteDateTime')).not.toBeNull();
    expect(screen.queryByText('common.yes')).not.toBeNull();
    expect(screen.queryByText('roadTypes')).not.toBeNull();
    expect(screen.queryByText('levelOfDetail')).not.toBeNull();
    expect(screen.queryByText('laneTypes')).not.toBeNull();
    expect(screen.queryByText('trafficDirection')).not.toBeNull();
    expect(screen.queryByText('claimsGraphUri')).not.toBeNull();

  });

  it('renders empty component when no resource details are provided', () => {
    const { container } = ComponentUnderTest(null);
    expect(container).toBeEmptyDOMElement();
  });
});
