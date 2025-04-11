import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SpecificFilters } from '../../../src/components/filter/SpecificFilters'
import { Asset } from '../../../src/components/resources/helpers/resourceFilterHelper';

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('SpecificFilters', () => {
  const mockAssets: Asset[] = [
    {
      id: '1',
      type: 'specificAssets',
      label: 'Filter 1',
      value: true,
      disabled: false,
      specificFilterValueSelected: 'Value 1',
      specificFilterPossibleValues: ['Value 1', 'Value 2', 'Value 3'],
      specificFilterSelected: true,
      specificFilterPath: 'path/1',
    },
    {
      id: '2',
      type: 'specificAssets',
      label: 'Filter 2',
      value: false,
      disabled: false,
      specificFilterValueSelected: 'Value 2',
      specificFilterPossibleValues: ['Value 2', 'Value 3', 'Value 4'],
      specificFilterSelected: false,
      specificFilterPath: 'path/2',
    },
    {
      id: '3',
      type: 'specificAssets',
      label: 'Filter 3',
      value: false,
      disabled: false,
      specificFilterValueSelected: null,
      specificFilterPossibleValues: ['Value 5', 'Value 6'],
      specificFilterSelected: false,
      specificFilterPath: 'path/3',
    },
  ];

  const mockUpdateAssetFilter = jest.fn();

  beforeEach(() => {
    mockUpdateAssetFilter.mockClear();
  });

  it('adds a new filter item when the add button is clicked', () => {
    render(<SpecificFilters assets={mockAssets} updateAssetFilter={mockUpdateAssetFilter}/>);

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getAllByLabelText('Property')).toHaveLength(2);
  });

  it('removes a filter when the clear button is clicked', () => {
    render(<SpecificFilters assets={mockAssets} updateAssetFilter={mockUpdateAssetFilter}/>);

    fireEvent.click(screen.getAllByTitle('Clear')[0]);

    expect(mockUpdateAssetFilter).toHaveBeenCalledTimes(1);
    expect(mockUpdateAssetFilter).toHaveBeenCalledWith(mockAssets[0]);
  });
});
