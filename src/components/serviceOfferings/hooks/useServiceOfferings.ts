import { useEffect, useMemo, useState } from 'react';

import { ServiceOffering } from '../../../types/serviceOfferings.model';
import { loadServiceOfferings } from '../helpers/serviceOfferingDataFlow';

export type ServiceOfferingsViewState = 'LOADING' | 'SHOW_OFFERINGS' | 'SHOW_NO_RESULTS'

export const useServiceOfferings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [serviceOfferings, setServiceOfferings] = useState<ServiceOffering[]>([]);
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    loadServiceOfferings().then((fetchedServiceOfferings) => {
      setServiceOfferings(fetchedServiceOfferings)
    })
      .finally(() => setIsLoading(false));
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
