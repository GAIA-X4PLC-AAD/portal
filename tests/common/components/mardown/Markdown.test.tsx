import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import React from 'react';

import Markdown from '../../../../src/common/components/markdown/Markdown';

describe('Markdown', () => {
  it('renders H1', () => {
    const { getByText } = render(<Markdown># H1</Markdown>);
    expect(getByText('H1')).toBeInTheDocument();
    expect(getByText('H1').tagName).toEqual('H1');
  })

  it('renders H2', () => {
    const { getByText } = render(<Markdown>## H2</Markdown>);
    expect(getByText('H2')).toBeInTheDocument();
    expect(getByText('H2').tagName).toEqual('H2');
  })

  it('renders list item', () => {
    const { getByText } = render(
      <Markdown>
        {`1. item1
          2. item2`}
      </Markdown>
    );
    expect(getByText('item1')).toBeInTheDocument();
    expect(getByText('item1').tagName).toEqual('LI');
    expect(getByText('item2')).toBeInTheDocument();
    expect(getByText('item2').tagName).toEqual('LI');
  })

  it('shows ellipse when rendering too long text', () => {
    const { getByText } = render(
      <Markdown>
        Test Content that is very long and should be truncated
      </Markdown>
    );

    const markDown = getByText('Test Content that is very long and should be truncated')

    Object.defineProperty(markDown, 'clientHeight', {
      value: 50,
      configurable: true,
    });

    Object.defineProperty(markDown, 'scrollHeight', {
      value: 100,
      configurable: true,
    });

    markDown.dispatchEvent(new Event('resize'));
    waitFor(() => expect(getByText('...')).toBeInTheDocument());
  })

  it('shows ellipse when rendering too long text', () => {
    const { getByText } = render(
      <Markdown>
        Test Content that is not very long and should not be truncated
      </Markdown>
    );

    const markDown = getByText('Test Content that is not very long and should not be truncated')

    Object.defineProperty(markDown, 'clientHeight', {
      value: 100,
      configurable: true,
    });

    Object.defineProperty(markDown, 'scrollHeight', {
      value: 50,
      configurable: true,
    });

    markDown.dispatchEvent(new Event('resize'));
    waitFor(() => expect(getByText('...')).not.toBeInTheDocument());
  })
});
