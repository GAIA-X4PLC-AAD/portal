import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthContextProvider';
import { CypherQueryApiService as cypherQuery } from '../../services/cypherQueryApiService';
import { mapServiceOfferings, ServiceOffering } from '../../utils/dataMapper';

export type ServiceOfferingsViewState = 'LOADING' | 'SHOW_OFFERINGS'

export const useServiceOfferings = () => {
  const [serviceOfferings, setServiceOfferings] = useState<ServiceOffering[]>([]);
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<ServiceOfferingsViewState>('LOADING');

  useEffect(() => {
    if (authContext.isAuthenticated) {
      cypherQuery.getAllSelfDescriptions(authContext)
        .then((selfDescriptions) => {
          setServiceOfferings(mapServiceOfferings(selfDescriptions));
        })
        .catch(error => console.error('Error fetching self descriptions:', error))
        .finally(() => setState('SHOW_OFFERINGS'))
    }
  }, [authContext.isAuthenticated]);

  return {
    state,
    serviceOfferings
  }
}
