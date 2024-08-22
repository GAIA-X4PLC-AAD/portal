import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CardContainer from '../cardContainer/CardContainer';
import Header from '../header/Header';
import ItemCard from '../itemCard/ItemCard';
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
        <SearchBar placeholder={t('service-offerings.search-bar-text')} onSearch={search}/>
        <CardContainer isLoaded={state === 'SHOW_OFFERINGS'}>
          {
            serviceOfferings
              .filter(selfDescription => Object
                .values(selfDescription)
                .some(propertyValue => propertyValue && propertyValue.includes(searchText))
              )
              .map(
                (serviceOffering) => (
                  <ItemCard
                    key={serviceOffering.name}
                    label={serviceOffering.label}
                    service={serviceOffering}
                  />
                ))
          }
        </CardContainer>
      </Main>
    </>
  );
};
export default ServiceOfferings;
