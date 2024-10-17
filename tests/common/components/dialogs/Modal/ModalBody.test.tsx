import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import React from 'react';

import ModalBody from '../../../../../src/common/components/dialogs/Modal/ModalBody';
import Text from '../../../../../src/common/components/fields/Text/Text';

describe('ModalBody', () => {
  it('it renders its children', () => {
    const childComponentText = 'Child component'
    const { getByText } = render(
      <ModalBody isOpen={true}>
        <Text>{childComponentText}</Text>
      </ModalBody>
    )

    const child = getByText(childComponentText)
    expect(child).toBeInTheDocument
  })
})
