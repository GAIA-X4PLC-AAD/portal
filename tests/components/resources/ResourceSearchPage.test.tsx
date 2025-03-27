import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import ResourceSearchPage from '../../../src/components/resources/ResourceSearchPage';
import { withRouter } from '../../common/testHelper';

import { normal_render } from './__fixtures__/useResources_ResourceSearchPage';

// Mock: useResources
const useResources = jest.fn();
jest.mock('../../../src/components/resources/hooks/useResources', () => ({
  useResources: () => useResources()
}))

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('ResourcesSearchPage', () => {
  it('renders all resources and filter assets correctly', () => {
    useResources.mockReturnValue(normal_render);

    // Text in the top header bar
    const { getByRole, getByTestId, } = render(withRouter(<ResourceSearchPage/>));
    expect(getByRole('heading', { name: /left-menu.resources \(2 dashboard.results\)/i })).toBeInTheDocument;

    // HdMap Card
    const hdMapCard = getByTestId(/Card:.*:HdMap/);

    const hdMapCardLabel = within(hdMapCard).getByRole('heading', { name: /^HdMap$/i });
    expect(hdMapCardLabel).toBeInTheDocument
    expect(hdMapCardLabel.textContent).toEqual('HdMap');

    const hdMapCardDetailButton = within(hdMapCard).getByRole('button', { name: /details.more-details/i });
    expect(hdMapCardDetailButton).toBeInTheDocument;

    // EnvironmentModel Card
    const environmentModelCard = getByTestId(/Card:.*:EnvironmentModel/);

    const environmentModelCardLabel = within(environmentModelCard).getByRole('heading', { name: /^EnvironmentModel$/i });
    expect(environmentModelCardLabel).toBeInTheDocument
    expect(environmentModelCardLabel.textContent).toEqual('EnvironmentModel');

    const environmentModelCardDetailButton = within(environmentModelCard).getByRole('button', { name: /details.more-details/i });
    expect(environmentModelCardDetailButton).toBeInTheDocument;

    /* TODO Fix later / removed temporally
    // Type filter section
    const typeFilterSection = getByRole('heading', { name: /Type/i });
    expect(typeFilterSection).toBeInTheDocument;

    const hdMapTypeFilterCheckbox = within(typeFilterSection.parentElement).getByRole('checkbox', { name: /HdMap/i });
    expect(hdMapTypeFilterCheckbox).toBeInTheDocument
    expect(hdMapTypeFilterCheckbox).toHaveAttribute('checked')
    expect(hdMapTypeFilterCheckbox).not.toHaveAttribute('disabled')

    const environmentModelTypeFilterCheckbox = within(typeFilterSection.parentElement).getByRole('checkbox', { name: /EnvironmentModel/i });
    expect(environmentModelTypeFilterCheckbox).toBeInTheDocument
    expect(environmentModelTypeFilterCheckbox).not.toHaveAttribute('checked')
    expect(environmentModelTypeFilterCheckbox).toHaveAttribute('disabled')

    // Format filter section
    const formatFilterSection = getByRole('heading', { name: /Format/i });
    expect(formatFilterSection).toBeInTheDocument;

    const asamOpenDriveFormatFilterCheckbox = within(formatFilterSection.parentElement).getByRole('checkbox', { name: /ASAM OpenDRIVE/i });
    expect(asamOpenDriveFormatFilterCheckbox).toBeInTheDocument
    expect(asamOpenDriveFormatFilterCheckbox).toHaveAttribute('checked')
    expect(asamOpenDriveFormatFilterCheckbox).not.toHaveAttribute('disabled')

    // Vendor filter section
    const vendorFilterSection = getByRole('heading', { name: /Vendor/i });
    expect(vendorFilterSection).toBeInTheDocument;

    const msgSystemsAgVendorFilterCheckbox = within(vendorFilterSection.parentElement).getByRole('checkbox', { name: /msg systems ag/i });
    expect(msgSystemsAgVendorFilterCheckbox).toBeInTheDocument
    expect(msgSystemsAgVendorFilterCheckbox).not.toHaveAttribute('checked')
    expect(msgSystemsAgVendorFilterCheckbox).not.toHaveAttribute('disabled')

     */
  })
})
