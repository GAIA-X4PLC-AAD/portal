import { useContext, useEffect, useMemo, useState } from 'react';

import { AuthContext } from '../../context/AuthContextProvider';
import { CypherQueryApiService as cypherQuery } from '../../services/cypherQueryApiService';
import { mapResources, Resource } from '../../utils/dataMapper';

import { useResourceFilter } from './useResourceFilter';

export type ResourcesViewState = 'LOADING' | 'SHOW_RESOURCES' | 'SHOW_NO_RESULTS';

interface IUseResources {

}

export const useResources = () => {
  const authContext = useContext(AuthContext);
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('')
  const {
    typeAssets,
    formatAssets,
    vendorAssets
  } = useResourceFilter();

  useEffect(() => {
    (async () => {
      try {
        const resourceInput = await cypherQuery.getAllResources(authContext);
        const fetchedResources = mapResources(resourceInput);

        setResources(fetchedResources)
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const filteredResources = useMemo(() => resources
    .filter(resource => Object
      .values(resource)
      .some(propertyValue => !propertyValue ||
                String(propertyValue).toLowerCase()
                  .includes(searchText.toLowerCase()))
    ), [resources, searchText])

  const state = useMemo<ResourcesViewState>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (filteredResources.length) {
      return 'SHOW_RESOURCES'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [filteredResources, isLoading])

  const search = (filter: string) => {
    setSearchText(filter)
  };

  return {
    resources: filteredResources,
    state,
    typeAssets,
    formatAssets,
    vendorAssets,
    search
  }
}
