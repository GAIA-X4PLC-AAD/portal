import { render } from '@testing-library/react'
import React from 'react';

import NoContent from '../../../../src/common/components/NoContent/NoContent';

describe('NoContent', () => {
  it('If it is visible, then it renders a custom text', () => {
    const { getByText } = render(<NoContent message={'There is no content'} visible={true}/>);
    expect(getByText('There is no content')).not.toBeNull();
  })

  it('If it is not visible, then it does not render the custom text', () => {
    const { queryByText } = render(<NoContent message={'There is no content'} visible={false}/>);
    expect(queryByText('There is no content')).toBeNull();
  })
});
