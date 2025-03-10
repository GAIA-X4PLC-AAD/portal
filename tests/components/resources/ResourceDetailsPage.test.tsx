import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import ResourceDetailsPage from '../../../src/components/resources/ResourceDetailsPage';
import { withRouter } from '../../common/testHelper';

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

const loadCombinedResourceDetails = jest.fn();
jest.mock('../../../src/components/resources/helpers/resourceDataFlow', () => ({
  loadCombinedResourceDetails: () => loadCombinedResourceDetails(),
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ResourceDetailsPage', () => {
  beforeAll(() => {
    loadCombinedResourceDetails.mockReturnValue(
      Promise.resolve({
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
      }),
    );
  });

  it('should render a resource detail page', async () => {

    render(withRouter(<ResourceDetailsPage/>, '/resources/123', '/resources/:resourceId'));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Resource 1/i })).toBeInTheDocument();
    });

    await screen.findByRole('link', { name: /left-menu.resources/i });
    const link_shapes = screen.getByRole('link', { name: /left-menu.resources/i });
    expect(link_shapes).toBeInTheDocument();
    expect(link_shapes).toHaveAttribute('href', '/resources');
    const allLinks = screen.getAllByRole('link');
    const resourceLink = allLinks.find(link => link.getAttribute('href') === '/resources/123');
    expect(resourceLink).toBeInTheDocument();
  });
});
