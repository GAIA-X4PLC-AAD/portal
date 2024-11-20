import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import Header from '../../../src/components/header/Header';

describe('Header', () => {
  test('renders the header with the given title', () => {
    const titleText = 'Test Title';
    render(<Header title={titleText}/>);

    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();
  });

  test('does not render the header when visible is false', () => {
    const titleText = 'Invisible Title';
    render(<Header title={titleText} visible={false}/>);

    const titleElement = screen.queryByText(titleText);
    expect(titleElement).not.toBeInTheDocument();
  });

  test('renders the header by default when visible is not provided', () => {
    const titleText = 'Default Visible Title';
    render(<Header title={titleText}/>);

    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();
  });
});
