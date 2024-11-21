import { render, within } from '@testing-library/react'
import React, { FC } from 'react';

import Message from '../../../../../src/common/components/fields/message/Message';

describe('Message', () => {
  it('renders its children', () => {
    const ChildComponent: FC = () => (<p data-testid={'child'}>some text</p>)

    const { getByTestId } = render(
      <Message>
        <ChildComponent/>
      </Message>
    )
    const childComponent = getByTestId('child');
    expect(childComponent).toBeInTheDocument

    const text = within(childComponent).findByText('child');
    expect(text).toBeInTheDocument
  })
});
