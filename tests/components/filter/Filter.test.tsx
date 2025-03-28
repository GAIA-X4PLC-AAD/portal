import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Filter from '../../../src/components/filter/Filter'
import { Asset } from '../../../src/components/resources/helpers/resourceFilterHelper';

console.error = jest.fn();
console.debug = jest.fn();
console.warn = jest.fn();

describe('Filter', () => {
  const mockAssets: Asset[] = [
    {
      id: '1',
      type: 'typeAssets',
      label: 'Type 1',
      value: true,
      disabled: false,
      specificFilterValueSelected: null,
      specificFilterPossibleValues: [],
      specificFilterSelected: false,
      specificFilterPath: '',
    },
    {
      id: '2',
      type: 'formatAssets',
      label: 'Format 1',
      value: false,
      disabled: false,
      specificFilterValueSelected: null,
      specificFilterPossibleValues: [],
      specificFilterSelected: false,
      specificFilterPath: '',
    },
    {
      id: '3',
      type: 'vendorAssets',
      label: 'Vendor 1',
      value: false,
      disabled: false,
      specificFilterValueSelected: null,
      specificFilterPossibleValues: [],
      specificFilterSelected: false,
      specificFilterPath: '',
    },
    {
      id: '4',
      type: 'specificAssets',
      label: 'Specific 1',
      value: true,
      disabled: false,
      specificFilterValueSelected: 'Value 1',
      specificFilterPossibleValues: ['Value 1', 'Value 2'],
      specificFilterSelected: true,
      specificFilterPath: 'path/1',
    },
  ];

  const mockUpdateAssetFilter = jest.fn();

  beforeEach(() => {
    mockUpdateAssetFilter.mockClear();
  });

  it('renders the filters with subtitles', () => {
    render(<Filter
      typeAssets={[mockAssets[0]]}
      formatAssets={[mockAssets[1]]}
      vendorAssets={[mockAssets[2]]}
      specificAssets={[mockAssets[3]]}
      updateAssetFilter={mockUpdateAssetFilter}
      visible={true}
    />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Format')).toBeInTheDocument();
    expect(screen.getByText('Vendor')).toBeInTheDocument();
    expect(screen.getByText('Specific filters')).toBeInTheDocument();
  });

  it('hides the filters when visibility is false', () => {
    render(<Filter
      typeAssets={[mockAssets[0]]}
      formatAssets={[mockAssets[1]]}
      vendorAssets={[mockAssets[2]]}
      specificAssets={[mockAssets[3]]}
      updateAssetFilter={mockUpdateAssetFilter}
      visible={false}
    />);

    expect(screen.queryByText('Filter')).not.toBeInTheDocument();
  });

  it('updates the asset filter when a checkbox is clicked', () => {
    render(<Filter
      typeAssets={[mockAssets[0]]}
      formatAssets={[mockAssets[1]]}
      vendorAssets={[mockAssets[2]]}
      specificAssets={[mockAssets[3]]}
      updateAssetFilter={mockUpdateAssetFilter}
      visible={true}
    />);

    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    expect(mockUpdateAssetFilter).toHaveBeenCalledTimes(1);
    expect(mockUpdateAssetFilter).toHaveBeenCalledWith({
      ...mockAssets[0],
      value: false,
    });
  });

  it('adds a new specific filter when the add button is clicked', () => {
    render(<Filter
      typeAssets={[mockAssets[0]]}
      formatAssets={[mockAssets[1]]}
      vendorAssets={[mockAssets[2]]}
      specificAssets={[mockAssets[3]]}
      updateAssetFilter={mockUpdateAssetFilter}
      visible={true}
    />);

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getAllByLabelText('Property')).toHaveLength(2);
  });
});
