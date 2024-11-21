import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom';
import React from 'react'

import NotificationDialog from '../../../../../src/common/components/dialogs/NotificationDialog/NotificationDialog';

describe('NotificationDialog', () => {
  const close = jest.fn()

  it('if isOpen is true then dialog is visible', () => {
    const { queryByText } = render(
      <NotificationDialog
        isOpen={true}
        close={close}
        title={'dialog title'}
        message={'dialog message'}
      />
    )
    expect(queryByText('dialog title')).toBeInTheDocument();
    expect(queryByText('dialog message')).toBeInTheDocument();
  })

  it('if isOpen is false then dialog is not visible', () => {
    const { queryByText } = render(
      <NotificationDialog
        isOpen={false}
        close={close}
        title={'dialog title'}
        message={'dialog message'}
      />
    )
    expect(queryByText('dialog title')).not.toBeInTheDocument();
    expect(queryByText('dialog message')).not.toBeInTheDocument();
  })

  it('close button is clicked the close event handler is called', () => {
    const { getByRole } = render(
      <NotificationDialog
        isOpen={true}
        close={close}
        title={'dialog title'}
        message={'dialog message'}
      />
    )

    const closeButton = getByRole('button', { name: 'common.close' });
    fireEvent.click(closeButton);
    expect(close).toHaveBeenCalled();
  });
})
