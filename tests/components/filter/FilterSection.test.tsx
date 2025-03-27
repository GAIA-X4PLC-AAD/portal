import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { FilterSection } from '../../../src/components/filter/FilterSection';
import { Asset } from '../../../src/components/resources/helpers/resourceFilterHelper';

console.error = jest.fn();
console.debug = jest.fn();
console.warn = jest.fn();

describe('FilterSection', () => {
  const mockAssets: Asset[] = [
    {
      id: '1',
      type: 'formatAssets',
      label: 'Filter 1',
      value: true,
      disabled: false,
      specificFilterValueSelected: null,
      specificFilterPossibleValues: [],
      specificFilterSelected: false,
      specificFilterPath: '',
    },
    {
      id: '2',
      type: 'vendorAssets',
      label: 'Filter 2',
      value: false,
      disabled: false,
      specificFilterValueSelected: null,
      specificFilterPossibleValues: [],
      specificFilterSelected: false,
      specificFilterPath: '',
    },
  ];

  const mockUpdateAssetFilter = jest.fn();

  beforeEach(() => {
    mockUpdateAssetFilter.mockClear();
  });

  it('renders the filter section with subtitle and toggle arrow', () => {
    render(<FilterSection subtitle="Test Subtitle" assets={mockAssets} updateAssetFilter={mockUpdateAssetFilter}/>);

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByAltText('Toggle Arrow')).toBeInTheDocument();
  });

  it('toggles the collapsed state when the toggle arrow is clicked', () => {
    render(<FilterSection subtitle="Test Subtitle" assets={mockAssets} updateAssetFilter={mockUpdateAssetFilter}/>);

    fireEvent.click(screen.getByAltText('Toggle Arrow'));

    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });

  it('displays the filter counter when filters are selected', () => {
    render(<FilterSection subtitle="Test Subtitle" assets={mockAssets} updateAssetFilter={mockUpdateAssetFilter}/>);

    expect(screen.queryByText('1')).toBeInTheDocument();
  });

  it('updates the asset filter when a checkbox is clicked', () => {
    render(<FilterSection subtitle="Test Subtitle" assets={mockAssets} updateAssetFilter={mockUpdateAssetFilter}/>);

    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    expect(mockUpdateAssetFilter).toHaveBeenCalledTimes(1);
    expect(mockUpdateAssetFilter).toHaveBeenCalledWith({
      ...mockAssets[0],
      value: false,
    });
  });

  it('disables the checkbox when the asset is disabled', () => {
    const disabledAsset: Asset = {
      id: '3',
      type: 'typeAssets',
      label: 'Disabled Filter',
      value: true,
      disabled: true,
      specificFilterValueSelected: null,
      specificFilterPossibleValues: [],
      specificFilterSelected: false,
      specificFilterPath: '',
    };
    render(<FilterSection subtitle="Test Subtitle" assets={[disabledAsset]}
      updateAssetFilter={mockUpdateAssetFilter}/>);

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
