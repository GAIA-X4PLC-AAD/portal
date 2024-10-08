import { useEffect, useMemo, useState } from 'react';

import { CypherQueryApiService as cypherQuery } from '../../services/cypherQueryApiService';
import { ServiceOffering } from '../../types/serviceOfferings.model';
import { mapServiceOfferings } from '../../utils/dataMapper';

export type ServiceOfferingsViewState = 'LOADING' | 'SHOW_OFFERINGS' | 'SHOW_NO_RESULTS'

export const useServiceOfferings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [serviceOfferings, setServiceOfferings] = useState<ServiceOffering[]>([]);
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    cypherQuery.getAllSelfDescriptions()
      .then((selfDescriptions) => {
        setServiceOfferings(mapServiceOfferings(selfDescriptions));
      })
      .catch(error => console.error('Error fetching self descriptions:', error))
      .finally(() => setIsLoading(false))
  }, []);

  const filteredServiceOfferings = useMemo(() => serviceOfferings
    .filter(services => Object
      .values(services)
      .some(propertyValue => propertyValue &&
              String(propertyValue).toLowerCase()
                .includes(searchText.toLowerCase()))
    ), [serviceOfferings, searchText])

  const state = useMemo<ServiceOfferingsViewState>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (filteredServiceOfferings.length) {
      return 'SHOW_OFFERINGS'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [filteredServiceOfferings, isLoading])

  const search = (filter: string) => {
    setSearchText(filter)
  };

  return {
    state,
    serviceOfferings: filteredServiceOfferings,
    search
  }
}
