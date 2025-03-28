import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import DetailsPropertyContainer from '../../../../src/common/components/layouts/DetailsPropertyContainer'

console.error = jest.fn();
console.debug = jest.fn();
console.warn = jest.fn();

describe('DetailsPropertyContainer', () => {
  it('renders children when visible is true', () => {
    render(<DetailsPropertyContainer visible={true}>Test Content</DetailsPropertyContainer>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render anything when visible is false', () => {
    render(<DetailsPropertyContainer visible={false}>Test Content</DetailsPropertyContainer>);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('renders children as expected when visible is true by default', () => {
    render(<DetailsPropertyContainer>Test Content</DetailsPropertyContainer>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders no content when children is undefined', () => {
    render(<DetailsPropertyContainer/>);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
});
