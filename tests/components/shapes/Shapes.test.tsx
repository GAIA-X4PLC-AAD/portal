import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import Shapes from '../../../src/components/shapes/Shapes';

jest.mock('../../../src/components/shapes/useShapes', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const ComponentUnderTest = () => (
  <MemoryRouter>
    <Shapes />
  </MemoryRouter>
)

describe('Shapes', () => {
  it('should render shapes', () => {
    require('../../../src/components/shapes/useShapes').default.mockReturnValue({
      shapes: [
        { shaclShapeName: 'Shape 1' },
        { shaclShapeName: 'Shape 2' }
      ],
      state: 'SHOW_SHAPES',
    });

    render(<ComponentUnderTest />);

    expect(screen.queryByText('Shape 1')).not.toBeNull();
    expect(screen.queryByText('Shape 2')).not.toBeNull();
  })

  it('should render the header with the correct title', () => {
    require('../../../src/components/shapes/useShapes').default.mockReturnValue({
      shapes: [
        { shaclShapeName: 'Shape 1' },
        { shaclShapeName: 'Shape 2' }
      ],
    });

    render(<ComponentUnderTest />);

    expect(screen.queryByText(/shapes.titles/)).not.toBeNull();
    expect(screen.queryByText(/(2 dashboard.results)/)).not.toBeNull();
  });

  it('should render the search bar', () => {
    require('../../../src/components/shapes/useShapes').default.mockReturnValue({
      shapes: [
        { shaclShapeName: 'Shape 1' },
        { shaclShapeName: 'Shape 2' }
      ],
      state: 'SHOW_SHAPES',
    });

    render(<ComponentUnderTest />);

    expect(screen.queryByPlaceholderText(/shapes.search-bar-text/)).not.toBeNull();
  });

  it('should render the loading indicator when state is LOADING', () => {
    require('../../../src/components/shapes/useShapes').default.mockReturnValue({
      shapes: [],
      state: 'LOADING',
    });

    render(<ComponentUnderTest />);

    expect(screen.getByAltText('common.is-loading')).not.toBeNull();
  });

  it('should render the no content message when state is SHOW_NO_RESULTS', () => {
    require('../../../src/components/shapes/useShapes').default.mockReturnValue({
      shapes: [],
      state: 'SHOW_NO_RESULTS',
    });

    render(<ComponentUnderTest />);

    expect(screen.queryByText(/shapes.no-shapes-available/)).not.toBeNull();
  });
});
