import React from 'react';
import { useTranslation } from 'react-i18next';

import NoContent from '../../common/components/././NoContent/NoContent';
import Horizontal from '../../common/components/./layouts/Horizontal';
import Main from '../../common/components/./layouts/Main';
import Vertical from '../../common/components/./layouts/Vertical';
import ItemCard from '../ItemCard/ItemCard';
import CardContainer from '../cards/CardContainer';
import Header from '../header/Header';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import SearchBar from '../searchBar/SearchBar';

import { useShapes } from './useShapes';

const Shapes = () => {
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
                <ItemCard
                  key={index}
                  label={t('shapes.title')}
                  isGaiaXCompliant={true}
                  shape={shape}
                />
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

export default Shapes;
