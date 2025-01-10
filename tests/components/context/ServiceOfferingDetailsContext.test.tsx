import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';

import {
  ServiceOfferingDetailsContext,
  ServiceOfferingDetailsContextProvider
} from '../../../src/components/context/ServiceOfferingDetailsContext';

describe('ServiceOfferingDetailsContext', () => {
  it('should provide the correct initial context values', () => {
    const TestComponent = () => {
      const context = useContext(ServiceOfferingDetailsContext);

      return (
        <div>
          <div data-testid="view-content-type">{context.viewContentType}</div>
        </div>
      );
    };

    render(
      <ServiceOfferingDetailsContextProvider
        value={{
          viewContentType: 'SHOW_NO_RESULT',
          serviceOfferingDetails: undefined, // Added this to match the context structure
        }}
      >
        <TestComponent/>
      </ServiceOfferingDetailsContextProvider>
    );

    expect(screen.getByTestId('view-content-type').textContent).toBe('SHOW_NO_RESULT');
  });

  it('should provide custom context values when specified', () => {
    const TestComponent = () => {
      const context = useContext(ServiceOfferingDetailsContext);

      return (
        <div>
          <div data-testid="view-content-type">{context.viewContentType}</div>
          <div data-testid="serviceOfferingDetails-name">
            {context.serviceOfferingDetails ? context.serviceOfferingDetails.name : 'No service offering'}
          </div>
        </div>
      );
    };

    const mockServiceOfferingDetails = { name: 'Test Service Offering' }; // Mocking service offering details

    render(
      <ServiceOfferingDetailsContextProvider
        value={{
          viewContentType: 'DETAIL_VIEW',
          serviceOfferingDetails: mockServiceOfferingDetails, // Providing service offering details
        }}
      >
        <TestComponent/>
      </ServiceOfferingDetailsContextProvider>
    );

    expect(screen.getByTestId('view-content-type').textContent).toBe('DETAIL_VIEW');
    expect(screen.getByTestId('serviceOfferingDetails-name').textContent).toBe('Test Service Offering'); // Corrected to match expected output
  });
});
