import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { SvgIcon } from '@mui/material';

import Svg from '../../../../src/common/components/icon/Svg'

import { styled } from '@mui/material/styles';

console.error = jest.fn();
console.debug = jest.fn();
console.warn = jest.fn();

const MockIcon = styled(SvgIcon)({
  fontSize: '2rem',
});

describe('Svg', () => {
  it('does not render anything when visible is false', () => {
    const onClick = jest.fn();
    render(<Svg visible={false} onClick={onClick} Icon={MockIcon}>Test Content</Svg>);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });
  it('renders the component with children', () => {
    const onClick = jest.fn();
    render(
      <Svg visible={true} onClick={onClick} Icon={MockIcon}>
                Test Content
      </Svg>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
