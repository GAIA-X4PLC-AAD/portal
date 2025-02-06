import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import Header from '../../../../src/common/components/header/Header';
import { withRouter } from '../../testHelper';

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('Header', () => {
  it('renders a header with title correctly', () => {
    const { getByRole } = render(<Header title={'Title'}/>);
    const title = getByRole('heading', { name: /Title/i });
    expect(title).toBeInTheDocument();
  });

  it('renders a header with breadcrumbs correctly', () => {
    const { getByRole } = render(withRouter(<Header
      breadcrumbs={[
        {
          label: 'Breadcrumb 1',
          to: '/breadcrumb1'
        },
        {
          label: 'Breadcrumb 2',
          to: '/breadcrumb2'
        }
      ]}
    />));
    const breadcrumb1 = getByRole('link', { name: /Breadcrumb 1/i });
    expect(breadcrumb1).toBeInTheDocument();
    expect(breadcrumb1).toHaveAttribute('href', '/breadcrumb1');
    const breadcrumb2 = getByRole('link', { name: /Breadcrumb 2/i });
    expect(breadcrumb2).toBeInTheDocument();
    expect(breadcrumb2).toHaveAttribute('href', '/breadcrumb2');
  });
});
