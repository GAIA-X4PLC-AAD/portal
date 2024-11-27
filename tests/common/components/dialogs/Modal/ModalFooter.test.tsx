import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import ModalFooter from '../../../../../src/common/components/dialogs/Modal/ModalFooter';
import Text from '../../../../../src/common/components/fields/././text/Text';

describe('ModalFooter', () => {
  it('it renders its children', () => {
    const childComponentText = 'Child component'
    const { getByText } = render(
      <ModalFooter isOpen={true}>
        <Text>{childComponentText}</Text>
      </ModalFooter>
    )

    const child = getByText(childComponentText)
    expect(child).toBeInTheDocument
  })
})
