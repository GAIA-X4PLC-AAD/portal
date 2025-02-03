import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '@testing-library/jest-dom';
import { ShapeContext } from '../../../../src/components/context/ShapeContext';
import ShapesDetailMainContent from '../../../../src/components/shapes/components/ShapesDetailMainContent';
import { mockShapeDetails } from '../__fixtures__/mockShapeDetails';

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ShapesDetailMainContent', () => {
  it('renders a shape correctly', async () => {
    render(
      <Router>
        <ShapeContext.Provider value={mockShapeDetails}>
          <ShapesDetailMainContent/>
        </ShapeContext.Provider>
      </Router>
    );
    const shapeNameHeading = screen.getByRole('heading', { name: /Shape 1/i });
    expect(shapeNameHeading).toBeInTheDocument();
    const shapeTable = screen.getByRole('table');
    expect(shapeTable).toBeInTheDocument();
  });
});
