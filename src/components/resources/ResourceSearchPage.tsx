import FilterIcon from '@mui/icons-material/FilterAlt';
import React from 'react';
import { useTranslation } from 'react-i18next';

import NoContent from '../../common/components/./././noContent/NoContent';
import Horizontal from '../../common/components/./layouts/Horizontal';
import Main from '../../common/components/./layouts/Main';
import Vertical from '../../common/components/./layouts/Vertical';
import Header from '../../common/components/header/Header';
import Svg from '../../common/components/icon/Svg';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import SearchBar from '../../common/components/searchBar/SearchBar';
import ItemCard from '../ItemCard/ItemCard';
import CardContainer from '../cards/CardContainer';
import Filter from '../filter/Filter';

import styles from './ResourceSearchPage.module.css'
import { useResources } from './hooks/useResources';

const ResourceSearchPage = () => {

  const { t } = useTranslation();
  const {
    resources,
    viewContentType,
    typeAssets,
    formatAssets,
    vendorAssets,
    assetFilterVisible,
    toggleAssetFilterVisibility,
    updateSearchText,
    updateFilterAsset,
  } = useResources();

  return (
    <>
      <Header title={`${t('left-menu.resources')} (${resources.length} ${t('dashboard.results')})`}/>
      <Main>
        <Horizontal>
          <Filter
            visible={assetFilterVisible}
            typeAssets={typeAssets}
            formatAssets={formatAssets}
            vendorAssets={vendorAssets}
            updateAssetFilter={updateFilterAsset}
          />
          <Vertical className={styles.mainConainer}>
            <Horizontal
              className={styles.searchBarContainer}
              visible={['SHOW_RESOURCES', 'SHOW_NO_RESULTS'].includes(viewContentType)}
            >
              <Svg
                className={styles.icon}
                Icon={FilterIcon}
                onClick={toggleAssetFilterVisibility}/>
              <SearchBar
                visible={!assetFilterVisible}
                placeholder={t('resources.search-bar-text')}
                onSearch={updateSearchText}
              />
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
