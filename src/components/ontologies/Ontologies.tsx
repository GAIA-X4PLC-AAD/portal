import React from 'react';
import { useTranslation } from 'react-i18next';

import RDFVisualization from '../../utils/RDFVisualization';
import ItemCard from '../ItemCard/ItemCard';
import ShowMapButton from '../buttons/ShowMapButton';
import CardContainer from '../cards/CardContainer';
import Header from '../header/Header';
import Horizontal from '../layout/Horizontal';
import Main from '../layout/Main';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import NoContent from '../nocontent/NoContent';
import SearchBar from '../searchBar/SearchBar';

import useOntologies from './useOntologies';

const nodeTypeFilters = [
  'http://www.w3.org/2000/01/rdf-schema#Class',
  'http://www.w3.org/2002/07/owl#Class',
  'http://www.w3.org/2002/07/owl#ObjectProperty'
]

const Ontologies = () => {
  const { t } = useTranslation();
  const {
    ontologies,
    nodes,
    links,
    state,
    toggleShowMap,
    search
  } = useOntologies({ nodeTypeFilters })

  return (
    <>
      <Header title={`${t('ontologies.titles')} (${ontologies.length} ${t('dashboard.results')})`}/>
      <Main>
        <LoadingIndicator visible={state === 'LOADING'}/>
        <Horizontal visible={['SHOW_ONTOLOGIES', 'SHOW_MAP'].includes(state)}>
          <SearchBar placeholder={t('ontologies.search-bar-text')} onSearch={search}/>
          <ShowMapButton selected={state === 'SHOW_MAP'} onToggle={toggleShowMap}/>
        </Horizontal>
        <CardContainer visible={state === 'SHOW_ONTOLOGIES'}>
          {
            ontologies
              .map((ontology, index) => (
                <ItemCard
                  key={index}
                  label={t('ontologies.title')}
                  ontology={ontology}
                />
              ))
          }
        </CardContainer>
        <RDFVisualization
          nodes={nodes}
          links={links}
          visible={state === 'SHOW_MAP'}/>
        <NoContent
          message={t('ontologies.no-ontologies-available')}
          visible={state === 'SHOW_NO_RESULTS'}/>
      </Main>
    </>
  );
};

export default Ontologies;
