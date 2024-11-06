import React from 'react';
import { useTranslation } from 'react-i18next';

import NoContent from '../../common/components/././NoContent/NoContent';
import Horizontal from '../../common/components/./layouts/Horizontal';
import Main from '../../common/components/./layouts/Main';
import Vertical from '../../common/components/./layouts/Vertical';
import ItemCard from '../ItemCard/ItemCard';
import CardContainer from '../cards/CardContainer';
import Header from '../header/Header';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import SearchBar from '../searchBar/SearchBar';

import { useServiceOfferings } from './useServiceOfferings';

const ServiceOfferings = () => {
  const { t } = useTranslation()
  const {
    state,
    serviceOfferings,
    search
  } = useServiceOfferings();

  return (
    <>
      <Header title={`${t('service-offerings.titles')} (${serviceOfferings.length} ${t('common.results')})`}/>
      <Main>
        <Vertical>
          <Horizontal visible={['SHOW_OFFERINGS', 'SHOW_NO_RESULTS'].includes(state)}>
            <SearchBar placeholder={t('service-offerings.search-bar-text')} onSearch={search}/>
          </Horizontal>
          <LoadingIndicator visible={state === 'LOADING'}/>
          <CardContainer visible={state === 'SHOW_OFFERINGS'}>
            {
              serviceOfferings.map((serviceOffering) => (
                <ItemCard
                  key={serviceOffering.name}
                  label={serviceOffering.label}
                  isGaiaXCompliant={true}
                  service={serviceOffering}
                />
              ))
            }
          </CardContainer>
          <NoContent
            message={t('service-offerings.no-offerings-available')}
            visible={state === 'SHOW_NO_RESULTS'}/>
        </Vertical>
      </Main>
    </>
  );
};
export default ServiceOfferings;
