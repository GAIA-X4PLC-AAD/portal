import { useEffect, useMemo, useState } from 'react';

import { ServiceOffering } from '../../../types/serviceOfferings.model';
import { loadServiceOfferings } from '../helpers/serviceOfferingDataFlow';
import { ServiceOfferingSortOrder } from '../helpers/serviceOfferingHelper';

export type ServiceOfferingsViewState = 'LOADING' | 'SHOW_OFFERINGS' | 'SHOW_NO_RESULTS'

export const useServiceOfferings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [serviceOfferings, setServiceOfferings] = useState<ServiceOffering[]>([]);
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState<ServiceOfferingSortOrder>('ASC_NAME');

  useEffect(() => {
    loadServiceOfferings().then((fetchedServiceOfferings) => {
      setServiceOfferings(fetchedServiceOfferings)
    })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredServiceOfferings = useMemo(() => {
    const filtered = serviceOfferings
      .filter(services => Object
        .values(services)
        .some(propertyValue => propertyValue &&
                String(propertyValue).toLowerCase()
                  .includes(searchText.toLowerCase())));
    switch (sortOrder) {
    case 'ASC_NAME':
      return filtered.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    case 'DESC_NAME':
      return filtered.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? ''));
    case 'ASC_DATE':
      return filtered.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
    case 'DESC_DATE':
      return filtered.sort((a, b) => (b.name ?? '').localeCompare(a.name ?? ''));
    }
  }, [serviceOfferings, searchText, sortOrder]);

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

  const updateSortOrder = (sortOrder: ServiceOfferingSortOrder) => {
    setSortOrder(sortOrder);
  };

  return {
    state,
    serviceOfferings: filteredServiceOfferings,
    search,
    updateSortOrder
  }
}
