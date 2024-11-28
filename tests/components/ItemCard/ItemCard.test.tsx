import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { FC } from 'react';
import { MemoryRouter } from 'react-router';

import ItemCard, { IItemCard } from '../../../src/components/ItemCard/ItemCard';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const ComponentUnderTest: FC<Partial<IItemCard>> = () => (
  <MemoryRouter>
    <ItemCard itemCardData={{
      label: 'defaultLabel',
      isGaiaXCompliant: true,
      title: 'defaultTitle',
      description: 'defaultDescription',
      navigationUrl: '/default',
      testId: 'defaultTestId'
    }} />
  </MemoryRouter>
)

describe('ItemCard', () => {
  it('should render ItemCard with provided data', () => {
    render(
      <ComponentUnderTest />
    );

    expect(screen.queryByText('defaultLabel')).not.toBeNull();
    expect(screen.queryByText('defaultTitle')).not.toBeNull();
    expect(screen.queryByText('defaultDescription')).not.toBeNull();
    expect(screen.queryByText('common.is-gaia-x-compliant')).not.toBeNull();
  });

  it('should navigate to details page when button is clicked', () => {
    render(
      <ComponentUnderTest />
    );

    act(() => {
      fireEvent.click(screen.getByText('details.more-details'));
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/default');
  });

  it('should display compliance message when isGaiaXCompliant is true', () => {
    render(
      <ComponentUnderTest />
    );

    expect(screen.getByText('common.is-gaia-x-compliant')).not.toBeNull();
  });

  it('should display non-compliance message when isGaiaXCompliant is false', () => {
    render(
      <MemoryRouter>
        <ItemCard itemCardData={{
          label: 'testLabel',
          isGaiaXCompliant: false,
          title: 'testTitle',
          description: 'testDescription',
          navigationUrl: '/test',
          testId: 'testId'
        }} />
      </MemoryRouter>
    );

    expect(screen.getByText('common.not-gaia-x-compliant')).not.toBeNull();
  });
});
