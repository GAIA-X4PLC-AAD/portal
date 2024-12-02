import React from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../../common/components/header/Header';
import Horizontal from '../../common/components/layouts/Horizontal';
import Main from '../../common/components/layouts/Main';
import Vertical from '../../common/components/layouts/Vertical';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import SearchBar from '../../common/components/searchBar/SearchBar';
import ItemCard from '../ItemCard/ItemCard';
import { shapeToItemCardData } from '../ItemCard/itemCardHelper';
import CardContainer from '../cards/CardContainer';

import { useShapes } from './hooks/useShapes';

const ShapesSearchPage = () => {
  const { t } = useTranslation();
  const {
    state,
    shapes,
    search
  } = useShapes();

  return (
    <>
      <Header title={`${t('shapes.titles')} (${shapes.length} ${t('dashboard.results')})`}/>
      <Main>
        <Vertical>
          <Horizontal visible={['SHOW_SHAPES', 'SHOW_NO_RESULTS'].includes(state)}>
            <SearchBar placeholder={t('resources.search-bar-text')} onSearch={search}/>
          </Horizontal>
          <LoadingIndicator visible={state === 'LOADING'}/>
          <CardContainer visible={state === 'SHOW_SHAPES'}>
            {
              shapes.map((shape, index) => (
                <ItemCard key={index} itemCardData={shapeToItemCardData(shape)}/>
              ))
            }
          </CardContainer>
          <NoContent
            message={t('shapes.no-shapes-available')}
            visible={state === 'SHOW_NO_RESULTS'}/>
        </Vertical>
      </Main>
    </>
  );
};

export default ShapesSearchPage;
