import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

import ModalXButton from '../../../../../src/common/components/dialogs/Modal/ModalXButton';

describe('ModalXButton', () => {
  it('calls the onClick handler when its clicked', () => {
    const handleClick = jest.fn();

    const { getByText } = render(<ModalXButton onClose={handleClick}/>)
    const button = getByText('×')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
