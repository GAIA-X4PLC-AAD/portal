import React from 'react';
import { useTranslation } from 'react-i18next';

import ItemCard from '../ItemCard/ItemCard';
import CardContainer from '../cards/CardContainer';
import Filter from '../filter/Filter';
import Header from '../header/Header';
import Horizontal from '../layout/Horizontal';
import Main from '../layout/Main';
import Vertical from '../layout/Vertical';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import NoContent from '../nocontent/NoContent';
import SearchBar from '../searchBar/SearchBar';

import { useResources } from './hooks/useResources';

const Resources = () => {

  const { t } = useTranslation();
  const {
    resources,
    state,
    typeAssets,
    formatAssets,
    vendorAssets,
    updateSearchText,
    updateFilterAsset,
  } = useResources();

  return (
    <>
      <Header title={`${t('left-menu.resources')} (${resources.length} ${t('dashboard.results')})`}/>
      <Main>
        <Horizontal>
          <Filter
            typeAssets={typeAssets}
            formatAssets={formatAssets}
            vendorAssets={vendorAssets}
            updateAssetFilter={updateFilterAsset}
          />
          <Vertical>
            <Horizontal visible={['SHOW_RESOURCES', 'SHOW_NO_RESULTS'].includes(state)}>
              <SearchBar placeholder={t('resources.search-bar-text')} onSearch={updateSearchText}/>
            </Horizontal>
            <LoadingIndicator visible={state === 'LOADING'}/>
            <CardContainer visible={state === 'SHOW_RESOURCES'}>
              {
                resources.map((resource) => (
                  <ItemCard
                    key={resource.uri + resource.name}
                    label={resource.labels.join(', ')}
                    isGaiaXCompliant={true}
                    resource={resource}
                  />
                ))
              }
            </CardContainer>
            <NoContent
              message={t('resources.no-resources-available')}
              visible={state === 'SHOW_NO_RESULTS'}/>
          </Vertical>
        </Horizontal>
      </Main>
    </>
  );
};
export default Resources;
