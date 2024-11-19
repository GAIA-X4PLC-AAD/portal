import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import ModalHeader from '../../../../../src/common/components/dialogs/Modal/ModalHeader';
import Text from '../../../../../src/common/components/fields/Text/Text';

describe('ModalHeader', () => {
  it('it renders its children', () => {
    const childComponentText = 'Child component'
    const { getByText } = render(
      <ModalHeader isOpen={true}>
        <Text>{childComponentText}</Text>
      </ModalHeader>
    )

    const child = getByText(childComponentText)
    expect(child).toBeInTheDocument
  })
})
