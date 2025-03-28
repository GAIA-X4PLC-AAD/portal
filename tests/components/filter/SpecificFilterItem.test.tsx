import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SpecificFilterItem } from '../../../src/components/filter/SpecificFilterItem';
import { Asset } from '../../../src/components/resources/helpers/resourceFilterHelper';

console.error = jest.fn();
console.debug = jest.fn();
console.warn = jest.fn();

describe('SpecificFilterItem', () => {
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

  const mockHandleChange = jest.fn();

  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  it('should render property selector and value input when asset is selected', () => {
    render(<SpecificFilterItem currentAsset={mockAssets[0]} assets={mockAssets} handleChange={mockHandleChange}/>);

    expect(screen.getByLabelText('Property')).toBeInTheDocument();
    expect(screen.getByLabelText('Value')).toBeInTheDocument();
  });

  it('should handle property change', () => {
    render(<SpecificFilterItem currentAsset={mockAssets[0]} assets={mockAssets} handleChange={mockHandleChange}/>);

    fireEvent.mouseDown(screen.getByLabelText('Property'));
    fireEvent.click(screen.getByText('Filter 2'));

    expect(mockHandleChange).toHaveBeenCalledWith(
      'change-filter',
      mockAssets[0],
      mockAssets[1]
    );
  });

  it('should handle filter removal', () => {
    render(<SpecificFilterItem currentAsset={mockAssets[0]} assets={mockAssets} handleChange={mockHandleChange}/>);

    // Target only the property clear button using more specific query
    fireEvent.click(screen.getAllByTitle('Clear')[0]);
    expect(mockHandleChange).toHaveBeenCalledWith('remove-filter', mockAssets[0]);
  });

  it('should handle new filter addition', () => {
    render(<SpecificFilterItem assets={mockAssets} handleChange={mockHandleChange}/>);

    fireEvent.mouseDown(screen.getByLabelText('Property'));
    fireEvent.click(screen.getByText('Filter 1'));

    expect(mockHandleChange).toHaveBeenCalledWith('add-filter', mockAssets[0]);
  });

  it('should handle value change', () => {
    render(<SpecificFilterItem currentAsset={mockAssets[0]} assets={mockAssets} handleChange={mockHandleChange}/>);

    fireEvent.mouseDown(screen.getByLabelText('Value'));
    fireEvent.click(screen.getByText('Value 2'));

    expect(mockHandleChange).toHaveBeenCalledWith('filter-value-changed', {
      ...mockAssets[0],
      specificFilterValueSelected: 'Value 2'
    });
  });

});
