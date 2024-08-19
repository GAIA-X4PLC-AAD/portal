import SelfDescriptionCard from 'components/cards/SelfDescriptionCard';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../context/AuthContextProvider';
import { ApiService } from '../../services/ApiService';
import { mapServiceOfferings, ServiceOffering } from '../../utils/dataMapper';
import CardContainer from '../cardContainer/CardContainer';
import Header from '../header/Header';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import Main from '../main/Main';

const ServiceOfferings = () => {
  const [serviceOfferings, setServiceOfferings] = useState<
    ServiceOffering[]
  >([]);
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      ApiService.getAllSelfDescriptions(authContext)
        .then((selfDescriptions) => {
          setServiceOfferings(mapServiceOfferings(selfDescriptions));
        })
        .catch(error => console.error('Error fetching self descriptions:', error))
        .finally(() => setIsLoading(false))
    }
  }, [authContext.isAuthenticated]);

  return (
    <>
      <Header title={`${t('service-offerings.titles')} (${serviceOfferings.length} ${t('common.results')})`}/>
      <Main>
        <LoadingIndicator isLoading={isLoading}/>
        <CardContainer isLoaded={!isLoading}>
          {
            serviceOfferings.map(
              (serviceOffering) => (
                <SelfDescriptionCard
                  key={serviceOffering.name}
                  label={serviceOffering.label}
                  isGaiaXComlpiant={true}
                  name={serviceOffering.name}
                  description={serviceOffering.description}
                  selfDescription={serviceOffering}
                />
              ))
          }
        </CardContainer>
      </Main>
    </>
  );
};
export default ServiceOfferings;
