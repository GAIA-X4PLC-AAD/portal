import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import ShapeDetailsPage from '../../../src/components/shapes/ShapeDetailsPage';
import { withRouter } from '../../common/testHelper';

import { mockShapeDetails } from './__fixtures__/mockShapeDetails';

const getShapeByName = jest.fn();
jest.mock('../../../src/services/shapeService.utils', () => ({
  getShapeByName: () => getShapeByName(),
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ShapeDetailsPage', () => {
  beforeAll(() => {
    getShapeByName.mockReturnValue(Promise.resolve( mockShapeDetails ));
  });

  it('renders a shape correctly', async () => {

    render(withRouter(<ShapeDetailsPage/>, '/shapes/ShapeId1', '/shapes/:shapeId'));
    await waitFor(() => screen.findByRole('link', { name: /shapes.titles/i }));
    const link_shapes = screen.getByRole('link', { name: /shapes.titles/i });
    expect(link_shapes).toBeInTheDocument();
    expect(link_shapes).toHaveAttribute('href', '/shapes');
    expect(screen.getByRole('link', { name: /Shape1/i })).toBeInTheDocument();

  });
});
