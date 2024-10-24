import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';

import ItemCard, { IItemCard } from '../../../src/components/ItemCard/ItemCard';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

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
  });

  it('should navigate to details page when button is clicked', () => {
    render(
      <MemoryRouter>
        <ComponentUnderTest />
      </MemoryRouter>
    );

    act(() => {
      fireEvent.click(screen.getByText('details.more-details'));
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/default');
  });
});
