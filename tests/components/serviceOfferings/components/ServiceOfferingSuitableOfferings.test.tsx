import { render } from '@testing-library/react';
import React from 'react';

import ServiceOfferingSuitableOfferings
  from '../../../../src/components/serviceOfferings/components/ServiceOfferingSuitableOfferings';

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
