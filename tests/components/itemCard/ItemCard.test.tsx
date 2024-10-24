import { render, screen } from '@testing-library/react';
import React, { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';

import ItemCard, { IItemCard } from '../../../src/components/ItemCard/ItemCard';

const ComponentUnderTest: FC<Partial<IItemCard>> = () => (
  <ItemCard itemCardData={{
    label: 'defaultLabel',
    isGaiaXCompliant: true,
    title: 'defaultTitle',
    description: 'defaultDescription',
    navigationUrl: '/default',
    testId: 'defaultTestId'
  }} />
)

describe('ItemCard', () => {
  it('should render ItemCard with provided data', () => {
    render(
      <MemoryRouter>
        <ComponentUnderTest />
      </MemoryRouter>
    );

    expect(screen.queryByText('defaultLabel')).not.toBeNull();
    expect(screen.queryByText('defaultTitle')).not.toBeNull();
    expect(screen.queryByText('defaultDescription')).not.toBeNull();
    expect(screen.queryByText('common.is-gaia-x-compliant')).not.toBeNull();
  })
})
