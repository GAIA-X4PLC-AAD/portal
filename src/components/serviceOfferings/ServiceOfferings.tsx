import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CardContainer from '../cards/CardContainer';
import Header from '../header/Header';
import ItemCard from '../itemCard/ItemCard';
import Main from '../layout/Main';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import SearchBar from '../searchBar/SearchBar';

import { useServiceOfferings } from './useServiceOfferings';

const ServiceOfferings = () => {
  const { t } = useTranslation()
  const { state, serviceOfferings } = useServiceOfferings();
  const [searchText, setSearchText] = useState('')
  const filteredServiceOfferings = useMemo(() => serviceOfferings
    .filter(services => Object
      .values(services)
      .some(propertyValue => propertyValue &&
              String(propertyValue).toLowerCase()
                .includes(searchText.toLowerCase()))
    ), [serviceOfferings, searchText])

  const search = (filter: string) => {
    setSearchText(filter)
  }

  return (
    <>
      <Header title={`${t('service-offerings.titles')} (${serviceOfferings.length} ${t('common.results')})`}/>
      <Main>
        <LoadingIndicator visible={state === 'LOADING'}/>
        <SearchBar placeholder={t('service-offerings.search-bar-text')} onSearch={search}/>
        <CardContainer visible={state === 'SHOW_OFFERINGS'}>
          {
            filteredServiceOfferings
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
