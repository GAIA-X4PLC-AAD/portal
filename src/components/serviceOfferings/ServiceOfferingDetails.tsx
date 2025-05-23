import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Header from '../../common/components/header/Header';
import DetailsContent from '../../common/components/layouts/DetailsContent';
import DetailsSidebar from '../../common/components/layouts/DetailsSidebar';
import Main from '../../common/components/layouts/Main';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { ServiceOfferingDetailsContextProvider } from '../context/ServiceOfferingDetailsContext';

import ServiceOfferingActions from './components/ServiceOfferingActions';
import ServiceOfferingDetailMainContent from './components/ServiceOfferingDetailMainContent';
import ServiceOfferingSuitableOfferings from './components/ServiceOfferingSuitableOfferings';
import { useServiceOfferingDetails } from './hooks/useServiceOfferingDetails';

const ServiceOfferingDetails: FC = () => {
  const location = useLocation();
  const uri = location.pathname.split('/service-offerings/')[1];
  const decodeUri = decodeURIComponent(uri);
  const { serviceOfferingDetails, viewContentType } = useServiceOfferingDetails(decodeUri);
  const { t } = useTranslation();

  return (
    <ServiceOfferingDetailsContextProvider value={{ serviceOfferingDetails, viewContentType }}>
      <Header
        breadcrumbs={[
          {
            label: t('service-offerings.detail-title'),
            to: '/service-offerings'
          },
          {
            label: viewContentType === 'SHOW_SERVICE_OFFERING' ? serviceOfferingDetails?.name || '' : '',
            to: `/service-offerings/${uri}`
          }]}
      ></Header>

      <Main>
        <LoadingIndicator visible={viewContentType === 'LOADING'}/>
        <NoContent message={`${t('serviceOffering.no-offerings-available')}`}
          visible={viewContentType === 'SHOW_NO_RESULT'}/>
        <DetailsContent>
          <ServiceOfferingDetailMainContent/>
          <DetailsSidebar>
            <ServiceOfferingSuitableOfferings/>
            <ServiceOfferingActions/>
          </DetailsSidebar>
        </DetailsContent>
      </Main>
    </ServiceOfferingDetailsContextProvider>
  )
}

export default ServiceOfferingDetails;
