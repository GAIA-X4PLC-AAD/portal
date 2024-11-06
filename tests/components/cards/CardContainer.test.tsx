import { render } from '@testing-library/react';
import React, { FC } from 'react';

import CardContainer from '../../../src/components/cards/CardContainer';

describe('CardContainer', () => {
  it('renders child components if it is visible', () => {
    const ChildComponent: FC = () => (<p data-testid={'child-component'}>child component</p>)

    const { getByText, getByTestId } = render(
      <CardContainer visible={true}>
        <ChildComponent/>
      </CardContainer>
    )
    expect(getByTestId('child-component')).toBeInTheDocument
    expect(getByText('child component')).toBeInTheDocument
  })

  it('does not render child components if it is not visible', () => {
    const ChildComponent: FC = () => (<p data-testid={'child-component'}>child component</p>)

    const { queryByText, queryByTestId } = render(
      <CardContainer visible={false}>
        <ChildComponent/>
      </CardContainer>
    )
    expect(queryByTestId('child-component')).not.toBeInTheDocument
    expect(queryByText('child component')).not.toBeInTheDocument
  })
});
