import { render } from '@testing-library/react';
import React from 'react';

import ServiceOfferingSuitableOfferings
  from '../../../../src/components/serviceOfferings/components/ServiceOfferingSuitableOfferings';

// Mock the translation function
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => key, // Return the translation key as the value
  })),
}));

describe('ServiceOfferingSuitableOfferings', () => {
  it('renders the container', () => {
    const { container } = render(<ServiceOfferingSuitableOfferings/>);
    expect(container.getElementsByClassName('container').length).toBe(1);
  });

  it('renders the title with correct translation key', () => {
    const { getByText } = render(<ServiceOfferingSuitableOfferings/>);
    expect(getByText('service-offerings.suitable-offerings')).not.toBeNull();
  });

  it('renders the links container', () => {
    const { container } = render(<ServiceOfferingSuitableOfferings/>);
    expect(container.getElementsByClassName('links').length).toBe(1);
  });
});
