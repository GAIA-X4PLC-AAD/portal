import React, { createContext, ReactNode } from 'react';

import { useSchemas } from '../hooks/useSchemas';
import { AllSchemasState } from '../reducers/schemasReducer';

/**
 * Defines the type of the data stored in the context
 */
type SchemasStore = AllSchemasState

/**
 * Initial values in the resource store context
 */
const initialState = {
  shapes: [],
  ontologies: [],
  isLoading: true,
  hasError: false
} as SchemasStore;

/**
 * Definition of the {@link SchemasStore} context
 *
 * Usage: const { var1, var2, ... } = useContext(SchemasContext)
 */
export const SchemasContext = createContext<SchemasStore>(initialState);

/**
 * Defines the type of the {@link SchemasContextProvider}'s input props
 */
interface ResourceContextProviderProps {
    children: ReactNode;
}

/**
 * Provider for the {@link SchemasContext}
 *
 * Contains the global states of the resources and anything else that needs to be accessible via the context.
 *
 * @param children in order to use it like a React component and make available the states to all children
 * components, it has to be passed in as input prop.
 */
export const SchemasContextProvider: React.FC<ResourceContextProviderProps> = ({ children }) => {
  const { isLoading, shapes, ontologies } = useSchemas();

  return (
    <SchemasContext.Provider value={{
      isLoading,
      shapes,
      ontologies
    } as SchemasStore}>
      {children}
    </SchemasContext.Provider>
  );
};

