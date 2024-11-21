import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import Text from '../../../../../src/common/components/fields/././text/Text';

describe('Text', () => {
  it('it renders its children', () => {
    const childComponentText = 'Child component'
    const { getByText } = render(<Text>{childComponentText}</Text>)

    const child = getByText(childComponentText)
    expect(child).toBeInTheDocument
  })
})
