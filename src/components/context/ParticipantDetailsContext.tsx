import React, { createContext, ReactNode } from 'react';

import { ParticipantDetail } from '../../types/participants.model';
import { ParticipantContentType } from '../participants/hooks/useParticipantDetails';

/**
 * Defines the type of the data stored in the context
 */
type ParticipantDetailsStore = {
    participant: ParticipantDetail | undefined;
    viewContentType: ParticipantContentType;
}

/**
 * Initial values in the resource store context
 */
const initialState = {
  viewContentType: 'SHOW_NO_RESULT'
} as ParticipantDetailsStore;

/**
 * Definition of the {@link ParticipantDetailsStore} context
 *
 * Usage: const { var1, var2, ... } = useContext(ResourceContext)
 */
export const ParticipantDetailsContext = createContext<ParticipantDetailsStore>(initialState);

/**
 * Defines the type of the {@link ResourceContextProvider}'s input props
 */
interface ResourceContextProviderProps {
    children: ReactNode;
    value: ParticipantDetailsStore;
}

/**
 * Provider for the {@link ParticipantDetailsContext}
 *
 * Contains the global states of the resources and anything else that needs to be accessible via the context.
 *
 * @param children in order to use it like a React component and make available the states to all children
 * @param value of the resource context provider.
 * components, it has to be passed in as input prop.
 */
export const ResourceContextProvider: React.FC<ResourceContextProviderProps> = ({ children, value }) => {
  return (
    <ParticipantDetailsContext.Provider value={value}>
      {children}
    </ParticipantDetailsContext.Provider>
  );
};

