import { useEffect, useMemo, useState } from 'react';

import { ServiceOfferingDetails } from '../../../types/serviceOfferings.model';
import { loadServiceOfferingDetails } from '../helpers/serviceOfferingDataFlow';

export type ServiceOfferingContentType = 'LOADING' | 'SHOW_SERVICE_OFFERING' | 'SHOW_NO_RESULT';

export const useServiceOfferingDetails = (uri: string) => {
  const [serviceOfferingDetails, setServiceOfferingDetails] = useState<ServiceOfferingDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const viewContentType = useMemo<ServiceOfferingContentType>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (serviceOfferingDetails) {
      return 'SHOW_SERVICE_OFFERING'
    } else {
      return 'SHOW_NO_RESULT';
    }
  }, [isLoading, serviceOfferingDetails])

  useEffect(() => {
    loadServiceOfferingDetails(uri).then((fetchedServiceOfferingDetails) => {
      setServiceOfferingDetails(fetchedServiceOfferingDetails);
    }).finally(() => setIsLoading(false));
  }, [uri]);

  return {
    serviceOfferingDetails,
    viewContentType,
  }
}
