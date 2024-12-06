import React, { createContext, ReactNode } from 'react';

import { ServiceOfferingDetails } from '../../types/serviceOfferings.model';
import { ServiceOfferingContentType } from '../serviceOfferings/hooks/useServiceOfferingDetails';

type ServiceOfferingDetailsStore = {
    serviceOfferingDetails: ServiceOfferingDetails | undefined;
    viewContentType: ServiceOfferingContentType;
}

const initialState: ServiceOfferingDetailsStore = {
  viewContentType: 'SHOW_NO_RESULT',
} as ServiceOfferingDetailsStore;

export const ServiceOfferingDetailsContext = createContext<ServiceOfferingDetailsStore>(initialState);

interface ServiceOfferingDetailsContextProviderProps {
    children: ReactNode;
    value: ServiceOfferingDetailsStore
}

export const ServiceOfferingDetailsContextProvider: React.FC<ServiceOfferingDetailsContextProviderProps> = ({
  children,
  value
}) => {
  return (
    <ServiceOfferingDetailsContext.Provider value={value}>
      {children}
    </ServiceOfferingDetailsContext.Provider>
  )
}
