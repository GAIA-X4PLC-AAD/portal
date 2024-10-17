import React from 'react';
import { useTranslation } from 'react-i18next';

import Horizontal from '../../common/components/./layouts/Horizontal';
import Main from '../../common/components/./layouts/Main';
import Vertical from '../../common/components/./layouts/Vertical';
import ItemCard from '../ItemCard/ItemCard';
import CardContainer from '../cards/CardContainer';
import Filter from '../filter/Filter';
import Header from '../header/Header';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import NoContent from '../nocontent/NoContent';
import SearchBar from '../searchBar/SearchBar';

import { useResources } from './hooks/useResources';

const ResourceSearchPage = () => {

  const { t } = useTranslation();
  const {
    resources,
    viewContentType,
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
            <Horizontal visible={['SHOW_RESOURCES', 'SHOW_NO_RESULTS'].includes(viewContentType)}>
              <SearchBar placeholder={t('resources.search-bar-text')} onSearch={updateSearchText}/>
            </Horizontal>
            <LoadingIndicator visible={viewContentType === 'LOADING'}/>
            <CardContainer visible={viewContentType === 'SHOW_RESOURCES'}>
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
              visible={viewContentType === 'SHOW_NO_RESULTS'}/>
          </Vertical>
        </Horizontal>
      </Main>
    </>
  );
};
export default ResourceSearchPage;
