import FilterIcon from '@mui/icons-material/FilterAlt';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import NoContent from '../../common/components/./././noContent/NoContent';
import Horizontal from '../../common/components/./layouts/Horizontal';
import Main from '../../common/components/./layouts/Main';
import Vertical from '../../common/components/./layouts/Vertical';
import SortListButton, { SortOrder } from '../../common/components/buttons/SortListButton';
import Header from '../../common/components/header/Header';
import Svg from '../../common/components/icon/Svg';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import SearchBar from '../../common/components/searchBar/SearchBar';
import ItemCard from '../ItemCard/ItemCard';
import { resourceToItemCardData } from '../ItemCard/itemCardHelper';
import CardContainer from '../cards/CardContainer';
import Filter from '../filter/Filter';

import styles from './ResourceSearchPage.module.css'
import { getResourceSortMenuItems, getSortedResources } from './helpers/resourcesHelper';
import { useResources } from './hooks/useResources';

const ResourceSearchPage = () => {

  const { t } = useTranslation();
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC_NAME);

  const {
    resources,
    viewContentType,
    typeAssets,
    formatAssets,
    vendorAssets,
    specificAssets,
    assetFilterVisible,
    toggleAssetFilterVisibility,
    updateSearchText,
    updateFilterAsset,
  } = useResources();

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
            <SortListButton
              menuItemsObjects={getResourceSortMenuItems()}
              updateSortOrder={setSortOrder}
            />
          </Horizontal>
          <Horizontal className={styles.contentContainer}>
            <Filter
              visible={assetFilterVisible}
              typeAssets={typeAssets}
              formatAssets={formatAssets}
              vendorAssets={vendorAssets}
              specificAssets={specificAssets}
              updateAssetFilter={updateFilterAsset}
            />
            <LoadingIndicator visible={viewContentType === 'LOADING'}/>
            <CardContainer visible={viewContentType === 'SHOW_RESOURCES'}>
              {
                getSortedResources(resources, sortOrder).map((resource) => (
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
