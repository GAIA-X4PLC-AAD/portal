import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SpecificFilterItemProperty } from '../../../src/components/filter/SpecificFilterItemProperty'
import { Asset } from '../../../src/components/resources/helpers/resourceFilterHelper';

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('SpecificFilterItemProperty', () => {
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
  ];

  const mockUpdateAssetFilter = jest.fn();

  beforeEach(() => {
    render(
      <SpecificFilterItemProperty
        currentAsset={mockAssets[0]}
        assets={mockAssets}
        updateAssetFilter={mockUpdateAssetFilter}
      />
    );
  });

  it('renders the autocomplete with the correct value', () => {
    expect(screen.getByLabelText('Property')).toHaveValue('Filter 1');
  });

  it('clears the selected value when the clear button is clicked', () => {
    fireEvent.click(screen.getByTitle('Clear'));

    expect(mockUpdateAssetFilter).toHaveBeenCalledWith('remove-filter', mockAssets[0]);
  });
});
