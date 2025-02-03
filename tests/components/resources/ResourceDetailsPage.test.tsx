import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import ResourceDetailsPage from '../../../src/components/resources/ResourceDetailsPage';

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

const loadResourceDetails = jest.fn();
jest.mock('../../../src/components/resources/helpers/resourceDataFlow', () => ({
  loadResourceDetails: () => loadResourceDetails(),
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ResourceDetailsPage', () => {
  beforeAll(() => {
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
  });

  it('should render a resource detail page', async () => {

    render(
      <MemoryRouter initialEntries={['/resources/123']}>
        <Routes>
          <Route path="/resources/:resourceId" element={<ResourceDetailsPage/>}/>
        </Routes>
      </MemoryRouter>
    );

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
