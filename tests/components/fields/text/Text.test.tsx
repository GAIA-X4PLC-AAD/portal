import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import Text from '../../../../src/common/components/fields/text/Text';

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('Text', () => {
  it('renders children as a paragraph when visible and children is a string', () => {
    render(<Text visible={true}>Hello, World!</Text>);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    expect(screen.getByText('Hello, World!').tagName).toBe('P');
  });

  it('does not render anything when visible is false', () => {
    render(<Text visible={false}>Hello, World!</Text>);
    expect(screen.queryByText('Hello, World!')).not.toBeInTheDocument();
  });

  it('renders children as spans when children is an array of strings', () => {
    render(<Text visible={true}>{['Hello,', 'World!']}</Text>);
    const spans = screen.getAllByText(/Hello,|World!/);
    expect(spans).toHaveLength(2);
    spans.forEach(span => {
      expect(span.tagName).toBe('SPAN');
    });
  });

  it('renders children as a mix of elements and spans when children is an array of mixed types', () => {
    render(
      <Text visible={true}>
        <span>Hello,</span> {'World!'}
      </Text>
    );
    expect(screen.getByText('Hello,')).toBeInTheDocument();
    expect(screen.getByText('World!')).toBeInTheDocument();
    expect(screen.getByText('World!').tagName).toBe('SPAN');
  });

  it('applies additional class names correctly', () => {
    render(<Text visible={true} className="custom-class">Hello, World!</Text>);
    expect(screen.getByText('Hello, World!')).toHaveClass('custom-class');
  });
});
