import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import Modal from '../../../../../src/common/components/dialogs/Modal/Modal';
import Text from '../../../../../src/common/components/fields/Text/Text';

describe('Modal', () => {
  it('renders content if it is open', () => {
    const childComponentText = 'Child component'

    const { getByText } = render(
      <Modal isOpen={true}>
        <Text>{childComponentText}</Text>
      </Modal>
    )

    const child = getByText(childComponentText)
    expect(child).toBeInTheDocument();
  })

  it('does not render content if it is not open', () => {
    const childComponentText = 'Child component'

    const { findByText } = render(
      <Modal isOpen={false}>
        <Text>{childComponentText}</Text>
      </Modal>
    )

    const child = findByText(childComponentText)
    expect(child).not.toBeInTheDocument();
  })

  it('stops click propagation', () => {
    const isOpen = true;
    const onClick = jest.fn();

    const component = (
      <div onClick={onClick}
      >
        <Text>outside-element</Text>
        <Modal isOpen={isOpen}>
          <Text>inside-element</Text>
        </Modal>
      </div>
    )

    const { getByText } = render(component)

    const insideElement = getByText('inside-element')
    fireEvent.click(insideElement)
    expect(onClick).not.toBeCalled()

    const outsideElement = getByText('outside-element')
    fireEvent.click(outsideElement)
    expect(onClick).toHaveBeenCalledTimes(1)

  })
})
