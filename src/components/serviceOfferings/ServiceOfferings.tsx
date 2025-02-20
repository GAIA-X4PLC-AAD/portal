import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import NoContent from '../../common/components/./././noContent/NoContent';
import Horizontal from '../../common/components/./layouts/Horizontal';
import Main from '../../common/components/./layouts/Main';
import Vertical from '../../common/components/./layouts/Vertical';
import SortListButton, { SortOrder } from '../../common/components/buttons/SortListButton';
import Header from '../../common/components/header/Header';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import SearchBar from '../../common/components/searchBar/SearchBar';
import ItemCard from '../ItemCard/ItemCard';
import { serviceToItemCardData } from '../ItemCard/itemCardHelper';
import CardContainer from '../cards/CardContainer';

import {
  getServiceOfferingSortMenuItems,
  getSortedServiceOfferings,
} from './helpers/serviceOfferingHelper';
import { useServiceOfferings } from './hooks/useServiceOfferings';

const ServiceOfferings = () => {
  const { t } = useTranslation()
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC_NAME);

  const {
    state,
    serviceOfferings,
    search,
  } = useServiceOfferings();

  return (
    <>
      <Header title={`${t('service-offerings.titles')} (${serviceOfferings.length} ${t('common.results')})`}/>
      <Main>
        <Vertical>
          <Horizontal visible={['SHOW_OFFERINGS', 'SHOW_NO_RESULTS'].includes(state)}>
            <SearchBar placeholder={t('service-offerings.search-bar-text')} onSearch={search}/>
            <SortListButton
              menuItemsObjects={getServiceOfferingSortMenuItems()}
              updateSortOrder={setSortOrder}
            />
          </Horizontal>
          <LoadingIndicator visible={state === 'LOADING'}/>
          <CardContainer visible={state === 'SHOW_OFFERINGS'}>
            {
              getSortedServiceOfferings(serviceOfferings, sortOrder).map((serviceOffering, index) => (
                <ItemCard key={serviceOffering.name + serviceOffering.uri + index} itemCardData={serviceToItemCardData(serviceOffering)} />
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
