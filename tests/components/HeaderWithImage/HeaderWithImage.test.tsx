import { render } from '@testing-library/react';
import React from 'react';

import HeaderImage from '../../../src/assets/images/header_image.svg';
import HeaderWithImage from '../../../src/components/home/components/HeaderWithImage/HeaderWithImage';

console.error = jest.fn()

describe('render header with image', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <HeaderWithImage
        title={'title text'}
        content={'content text'}
        Image={HeaderImage}
      />
    );

    expect(getByText('title text')).toBeInTheDocument
    expect(getByText('content text')).toBeInTheDocument
  })
});
