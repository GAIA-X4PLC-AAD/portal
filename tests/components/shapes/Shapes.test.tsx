import { render } from '@testing-library/react';
import React from 'react'

import ShapesSearchPage from '../../../src/components/shapes/ShapesSearchPage';
import { Shape } from '../../../src/types/shapes.model';
import { withRouter } from '../../common/testHelper';

const useShapes = jest.fn()
jest.mock('../../../src/components/shapes/hooks/useShapes', () => ({
  useShapes: () => useShapes(),
}))
jest.mock('i18next', () => ({
  t: (translationId) => translationId,
}))

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('Shapes', () => {
  it('renders content if state is SHOW_SHAPES', () => {
    useShapes.mockReturnValue({
      state: 'SHOW_SHAPES',
      shapes: [
        {
          shaclShapeId: 'Shape id 1',
          shaclShapeName: 'Shape 1',

        },
        {
          shaclShapeId: 'Shape id 2',
          shaclShapeName: 'Shape 2',
        }
      ] as Shape[],
    })
    const { getByText } = render(withRouter(<ShapesSearchPage/>));
    expect(getByText('Shape 1')).not.toBeNull();
    expect(getByText('Shape 2')).not.toBeNull();
  })

  it('it shows loading indicator if state is LOADING', () => {
    useShapes.mockReturnValue({
      state: 'LOADING',
      shapes: [] as Shape[],
    })
    const { queryByAltText } = render(withRouter(<ShapesSearchPage/>));
    expect(queryByAltText('common.is-loading')).not.toBeNull();
  })

  it('shows text no content if there is no content', () => {
    useShapes.mockReturnValue({
      state: 'SHOW_NO_RESULTS',
      shapes: [] as Shape[],
    })
    const { queryByText } = render(withRouter(<ShapesSearchPage/>));
    expect(queryByText('shapes.no-shapes-available')).not.toBeNull();
  })
});
