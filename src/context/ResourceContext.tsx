import React, { createContext, ReactNode } from 'react';

// TODO: It is an example how to create a context. It is not used yet and does not contain any useful state either.

/**
 * Defines the type of the data stored in the context
 */
interface ResourceStore {
    // TODO: define store data type here
}

/**
 * Initial values in the resource store context
 */
const initialState = {
  // TODO: Define initial state of the store
} as ResourceStore;

/**
 * Definition of the {@link ResourceStore} context
 *
 * Usage: const { var1, var2, ... } = useContext(ResourceContext)
 */
const ResourceContext = createContext<ResourceStore>(initialState);

/**
 * Defines the type of the {@link ResourceContextProvider}'s input props
 */
interface ResourceContextProviderProps {
    children: ReactNode;
}

/**
 * Provider for the {@link ResourceContext}
 *
 * Contains the global states of the resources and anything else that needs to be accessible via the context.
 *
 * @param children in order to use it like a React component and make available the states to all children
 * components, it has to be passed in as input prop.
 */
export const ResourceContextProvider: React.FC<ResourceContextProviderProps> = ({ children }) => {
  // TODO: define global state variables and functions here

  return (
    <ResourceContext.Provider value={{
      // TODO: pass in here the global state variables and anything else that needs to be accessible in the child
      //  components and was declared in the ResourceStore
    } as ResourceStore}>
      {children}
    </ResourceContext.Provider>
  );
};

