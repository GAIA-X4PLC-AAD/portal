import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SpecificFilterItemValue } from '../../../src/components/filter/SpecificFilterItemValue'
import { Asset } from '../../../src/components/resources/helpers/resourceFilterHelper';

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('SpecificFilterItemValue', () => {
  const mockAsset: Asset = {
    id: '1',
    type: 'specificAssets',
    label: 'Filter 1',
    value: true,
    disabled: false,
    specificFilterValueSelected: 'Value 1',
    specificFilterPossibleValues: ['Value 1', 'Value 2', 'Value 3'],
    specificFilterSelected: true,
    specificFilterPath: 'path/1',
  };

  const mockUpdateAssetFilter = jest.fn();

  beforeEach(() => {
    render(<SpecificFilterItemValue currentAsset={mockAsset} updateAssetFilter={mockUpdateAssetFilter}/>);
  });

  it('renders the autocomplete with the correct value', () => {
    expect(screen.getByLabelText('Value')).toHaveValue('Value 1');
  });

  it('clears the selected value when the clear button is clicked', () => {
    fireEvent.click(screen.getByTitle('Clear'));

    // Check if updateAssetFilter was called with the correct arguments
    expect(mockUpdateAssetFilter).toHaveBeenCalledWith({
      ...mockAsset,
      specificFilterValueSelected: null,
    });
  });
});
