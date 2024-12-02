import React from 'react';
import { useTranslation } from 'react-i18next';

import NoContent from '../../common/components/./././noContent/NoContent';
import Horizontal from '../../common/components/./layouts/Horizontal';
import Main from '../../common/components/./layouts/Main';
import Vertical from '../../common/components/./layouts/Vertical';
import ShowMapToggleButton from '../../common/components/buttons/ShowMapToggleButton';
import Header from '../../common/components/header/Header';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import SearchBar from '../../common/components/searchBar/SearchBar';
import ItemCard from '../ItemCard/ItemCard';
import { ontologyToItemCardData } from '../ItemCard/itemCardHelper';
import CardContainer from '../cards/CardContainer';

import RDFVisualization from './components/RDFVisualization';
import useOntologies from './hooks/useOntologies';

const CLASS_OR_OBJECT_PROPERTY_NODE_TYPES = [
  'http://www.w3.org/2000/01/rdf-schema#Class',
  'http://www.w3.org/2002/07/owl#Class',
  'http://www.w3.org/2002/07/owl#ObjectProperty'
]

const OntologiesSearchPage = () => {
  const { t } = useTranslation();
  const {
    ontologies,
    nodes,
    links,
    state,
    toggleShowMap,
    search
  } = useOntologies({ nodeTypeFilters: CLASS_OR_OBJECT_PROPERTY_NODE_TYPES })

  return (
    <>
      <Header title={`${t('ontologies.titles')} (${ontologies.length} ${t('dashboard.results')})`}/>
      <Main>
        <Vertical>
          <Horizontal visible={['SHOW_ONTOLOGIES', 'SHOW_MAP', 'SHOW_NO_RESULTS'].includes(state)}>
            <SearchBar placeholder={t('ontologies.search-bar-text')} onSearch={search}/>
            <ShowMapToggleButton selected={state === 'SHOW_MAP'} onToggle={toggleShowMap}/>
          </Horizontal>
          <LoadingIndicator visible={state === 'LOADING'}/>
          <CardContainer visible={state === 'SHOW_ONTOLOGIES'}>
            {
              ontologies
                .map((ontology, index) => (
                  <ItemCard key={index} itemCardData={ontologyToItemCardData(ontology)}/>
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
        </Vertical>
      </Main>
    </>
  );
};

export default OntologiesSearchPage;
