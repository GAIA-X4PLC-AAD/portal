import { render } from '@testing-library/react';
import React from 'react'

import Shapes from '../../../src/components/shapes/Shapes';
import { Shape } from '../../../src/types/shapes.model';
import { withRouter } from '../../common/testHelper';

const useShapes = jest.fn()
jest.mock('../../../src/components/shapes/useShapes', () => ({
  useShapes: () => useShapes(),
}))
jest.mock('i18next', () => ({
  t: (translationId) => translationId,
}))

console.error = jest.fn()
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
    const { getByText } = render(withRouter(<Shapes/>));
    expect(getByText('Shape 1')).not.toBeNull();
    expect(getByText('Shape 2')).not.toBeNull();
  })

  it('it shows loading indicator if state is LOADING', () => {
    useShapes.mockReturnValue({
      state: 'LOADING',
      shapes: [] as Shape[],
    })
    const { queryByAltText } = render(withRouter(<Shapes/>));
    expect(queryByAltText('common.is-loading')).not.toBeNull();
  })

  it('shows text no content if there is no content', () => {
    useShapes.mockReturnValue({
      state: 'SHOW_NO_RESULTS',
      shapes: [] as Shape[],
    })
    const { queryByText } = render(withRouter(<Shapes/>));
    expect(queryByText('shapes.no-shapes-available')).not.toBeNull();
  })
});