import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ResourceFilterState {
  hdMap: boolean;
  scenario: boolean;
  environmentModel: boolean;
  openDrive: boolean;
  fbx: boolean;
  openScenario: boolean;
  threeDMapping: boolean;
  trainGraphics: boolean;
  dlr: boolean;
}

interface ResourceFilterContextType {
  filters: ResourceFilterState;
  toggleResourceFilter: (filterName: keyof ResourceFilterState) => void;
}

// Define the default state
const defaultFilterState: ResourceFilterContextType = {
  filters: {
    hdMap: false,
    scenario: false,
    environmentModel: false,
    openDrive: false,
    fbx: false,
    openScenario: false,
    threeDMapping: false,
    trainGraphics: false,
    dlr: false,
  },
  toggleResourceFilter: () => {},
};

// Creating the context with the default state
const ResourceFilterContext =
  createContext<ResourceFilterContextType>(defaultFilterState);

// Provider component
interface ResourceFilterProviderProps {
  children: ReactNode;
}

export const ResourceFilterProvider: React.FC<ResourceFilterProviderProps> = ({
  children,
}) => {
  const [filters, setFilters] = useState<ResourceFilterState>(
    defaultFilterState.filters
  );

  const toggleResourceFilter = (filterName: keyof ResourceFilterState) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  return (
    <ResourceFilterContext.Provider value={{ filters, toggleResourceFilter }}>
      {children}
    </ResourceFilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilters = () => useContext(ResourceFilterContext);
