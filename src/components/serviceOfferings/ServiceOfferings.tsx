import SelfDescriptionCard from 'components/cards/SelfDescriptionCard';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CardContainer from '../cardContainer/CardContainer';
import Header from '../header/Header';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import Main from '../main/Main';
import SearchBar from '../searchBar/SearchBar';

import { useServiceOfferings } from './useServiceOfferings';

const ServiceOfferings = () => {
  const { t } = useTranslation()
  const { state, serviceOfferings } = useServiceOfferings();
  const [searchText, setSearchText] = useState('')

  const search = (filter: string) => {
    setSearchText(filter)
  }

  return (
    <>
      <Header title={`${t('service-offerings.titles')} (${serviceOfferings.length} ${t('common.results')})`}/>
      <Main>
        <LoadingIndicator isLoading={state === 'LOADING'}/>
        <SearchBar placeholder={t('resources.search-bar-text')} onSearch={search}/>
        <CardContainer isLoaded={state === 'LOADED'}>
          {
            serviceOfferings
              .filter(selfDescription => JSON.stringify(selfDescription).includes(searchText))
              .map(
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
