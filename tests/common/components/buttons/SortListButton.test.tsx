import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import '@testing-library/jest-dom';
import SortListButton from '../../../../src/common/components/buttons/SortListButton';

const menuItems = [
  { label: 'ASC_NAME', alias: 'ASC_NAME' },
  { label: 'DESC_NAME', alias: 'DESC_NAME' },
  { label: 'ASC_DATE', alias: 'ASC_DATE' },
  { label: 'DESC_DATE', alias: 'DESC_DATE' }
];

const updateSortOrder = jest.fn();

const ComponentUnderTest = () => {
  return render(
    <MemoryRouter>
      <SortListButton
        menuItems={menuItems}
        updateSortOrder={updateSortOrder}
      />
    </MemoryRouter>
  );
};

describe('SortListButton', () => {
  it('should render menu items after clicking the button', () => {
    ComponentUnderTest();

    fireEvent.click(screen.getByTestId('SortIcon'));

    menuItems.forEach(item => {
      expect(screen.queryByText(item.label)).not.toBeNull();
    });
  });

  it('should call updateSortOrder with correct alias when a menu item is clicked', () => {
    ComponentUnderTest();

    fireEvent.click(screen.getByTestId('SortIcon'));
    fireEvent.click(screen.getByText('ASC_NAME'));

    expect(updateSortOrder).toHaveBeenCalledWith('ASC_NAME');
  });

  it('should close the menu when a menu item is clicked', async () => {
    ComponentUnderTest();

    fireEvent.click(screen.getByTestId('SortIcon'));
    fireEvent.click(screen.getByText('ASC_NAME'));

    await waitFor(() => {
      expect(screen.queryByText('ASC_NAME')).toBeNull();
    });
  });

  it('should highlight the selected menu item', () => {
    ComponentUnderTest();

    fireEvent.click(screen.getByTestId('SortIcon'));
    fireEvent.click(screen.getByText('DESC_NAME'));

    fireEvent.click(screen.getByTestId('SortIcon'));
    expect(screen.getByText('DESC_NAME').closest('li')).toHaveClass('Mui-selected');
  });

  it('should update selectedIndex on mouse enter and leave', () => {
    ComponentUnderTest();

    fireEvent.click(screen.getByTestId('SortIcon'));

    const menuItem = screen.getByText('ASC_NAME');

    fireEvent.mouseEnter(menuItem);
    expect(menuItem.closest('li')).toHaveClass('Mui-selected');

    fireEvent.mouseLeave(menuItem);
    expect(menuItem.closest('li')).not.toHaveClass('Mui-selected');
  });
});
