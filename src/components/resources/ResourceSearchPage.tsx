import FilterIcon from '@mui/icons-material/FilterAlt';
import React, { useEffect } from 'react';
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
import { resourceToItemCardData } from '../ItemCard/itemCardHelper';
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
    specialAssets,
    resourceSpecialDetailsQuery,
    assetFilterVisible,
    toggleAssetFilterVisibility,
    updateSearchText,
    updateFilterAsset,
  } = useResources();

  useEffect(() => {
    console.log(specialAssets)
    console.log(resourceSpecialDetailsQuery)
  }, [resourceSpecialDetailsQuery, specialAssets]); //TODO
  return (
    <>
      <Header title={`${t('left-menu.resources')} (${resources.length} ${t('dashboard.results')})`}/>
      <Main>
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
              placeholder={t('resources.search-bar-text')}
              onSearch={updateSearchText}
            />
          </Horizontal>
          <Horizontal className={styles.contentContainer}>
            <Filter
              visible={assetFilterVisible}
              typeAssets={typeAssets}
              formatAssets={formatAssets}
              vendorAssets={vendorAssets}
              specialAssets={specialAssets}
              updateAssetFilter={updateFilterAsset}
            />
            <LoadingIndicator visible={viewContentType === 'LOADING'}/>
            <CardContainer visible={viewContentType === 'SHOW_RESOURCES'}>
              {
                resources.map((resource) => (
                  <ItemCard key={resource.uri + resource.name} itemCardData={resourceToItemCardData(resource)}/>
                ))
              }
            </CardContainer>
            <NoContent
              message={t('resources.no-resources-available')}
              visible={viewContentType === 'SHOW_NO_RESULTS'}/>
          </Horizontal>
        </Vertical>
      </Main>
    </>
  );
};
export default ResourceSearchPage;
