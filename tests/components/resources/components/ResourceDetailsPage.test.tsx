import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import ResourceDetailsPage from '../../../../src/components/resources/ResourceDetailsPage';

jest.mock('@vcmap/core', () => ({
  VcsApp: jest.fn().mockImplementation(() => ({
    maps: {
      setTarget: jest.fn(),
      activeMap: {
        gotoViewpoint: jest.fn(),
      },
    },
    addModule: jest.fn(),
    layers: {
      add: jest.fn(),
    },
  })),
  GeoJSONLayer: jest.fn().mockImplementation(() => ({
    activate: jest.fn(),
    getFeatures: jest.fn().mockReturnValue([]),
    getZoomToExtent: jest.fn(),
  })),
  VcsModule: jest.fn(),
  Viewpoint: {
    createViewpointFromExtent: jest.fn(),
  },
}));

jest.mock('../../../../src/components/resources/helpers/resourceDataFlow', () => ({
  __esModule: true,
  loadResourceDetails: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useParams: jest.fn(),
}));

const ComponentUnderTest = () => (
  <MemoryRouter>
    <ResourceDetailsPage />
  </MemoryRouter>
);

describe('ResourceDetailsPage', () => {
  it('should render a resource detail page', async () => {
    const { useParams } = require('react-router-dom');
    const { loadResourceDetails } = require(
      '../../../../src/components/resources/helpers/resourceDataFlow'
    );

    useParams.mockReturnValue({ resourceId: '123' });

    loadResourceDetails.mockReturnValue(
      Promise.resolve({
        name: 'Resource 1',
        description: 'Resource Description',
        uri: 'ResourceUri',
        labels: ['Label1', 'Label2'],
        claimsGraphUri: ['Uri1', 'Uri2'],
        isGaiaXCompliant: true,
      }),
    );

    render(<ComponentUnderTest />);
    act(() => {
      expect(screen.queryByText('Resource 1')).not.toBeNull();
    });

  });
});
