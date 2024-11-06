import { fireEvent, render } from '@testing-library/react'
import React from 'react';

import ShapeCardContent from '../../../src/components/ItemCard/ShapeCardContent';
import { Shape } from '../../../src/types/shapes.model';
import { withRouter } from '../../common/testHelper';

const navigate = jest.fn();
const useNavigate = jest.fn(() => navigate)
jest.mock('react-router-dom', () => ({
  useNavigate: () => useNavigate()
}))

describe('ShapeCardContent', () => {
  it('renders shape', () => {
    const { getByText } = render(withRouter(
      <ShapeCardContent
        shape={
          {
            shaclShapeName: 'shacl shape name'
          } as Shape
        }
      />))

    expect(getByText('shacl shape name')).toBeInTheDocument
  })

  it('handles detail button click', () => {
    const { getByRole } = render(withRouter(
      <ShapeCardContent
        shape={
          {
            shaclShapeName: 'shacl shape name'
          } as Shape
        }
      />))

    const detailButton = getByRole('button', { name: 'details.more-details' });
    fireEvent.click(detailButton);
    expect(navigate).toHaveBeenCalledWith('/shapes/details/shacl%20shape%20name');
  })
});
