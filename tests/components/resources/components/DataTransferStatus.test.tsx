import { render } from '@testing-library/react';
import React from 'react';

import DataTransferStatus from '../../../../src/components/resources/components/DataTransferStatus';

describe('DataTransferStatus', () => {
  it('displays status if state is CHECKING_DATA_TRANSFER_STATUS', () => {
    const { getByText } = render(<DataTransferStatus
      state={{ name: 'CHECKING_DATA_TRANSFER_STATUS', status: 'INITIATED' }}/>);
    expect(getByText('INITIATED')).not.toBeNull();
  })

  it('displays status if state is FINISHED', () => {
    const { getByText } = render(<DataTransferStatus
      state={{ name: 'FINISHED', status: 'COMPLETED' }}/>);
    expect(getByText('COMPLETED')).not.toBeNull();
  })

  it('displays nothing if status is different then the above', () => {
    const { queryByText } = render(
      <DataTransferStatus
        state={{ name: 'INIT', status: 'INITIATED' }}
      />);
    expect(queryByText('INITIATED')).toBeNull();
  })
});
