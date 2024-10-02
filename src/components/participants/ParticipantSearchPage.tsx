import React from 'react';
import { useTranslation } from 'react-i18next';

import ItemCard from '../ItemCard/ItemCard';
import CardContainer from '../cards/CardContainer';
import Header from '../header/Header';
import Horizontal from '../layout/Horizontal';
import Main from '../layout/Main';
import Vertical from '../layout/Vertical';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import NoContent from '../nocontent/NoContent';
import SearchBar from '../searchBar/SearchBar';

import { useParticipants } from './hooks/useParticipants';

const ParticipantSearchPage = () => {
  const { t } = useTranslation();
  const {
    participants,
    state,
    search,
  } = useParticipants()

  return (
    <>
      <Header title='ParticipantSearchPage'/>
      <Main>
        <Vertical>
          <Horizontal>
            <Vertical>
              <SearchBar placeholder={t('resources.search-bar-text')} onSearch={search}/>
            </Vertical>
          </Horizontal>
          <LoadingIndicator visible={state === 'LOADING'}/>
          <CardContainer visible={state === 'SHOW_PARTICIPANTS'}>
            {() => console.log('test')}
            {
              participants.map((participant) => (
                <ItemCard key={participant.uri + participant.legalName} label="LegalParticipant"
                  isGaiaXCompliant={true}
                  participant={participant}/>)
              )}
          </CardContainer>
          <NoContent message={'test no content message'} visible={state === 'SHOW_NO_RESULTS'}/>
        </Vertical>
      </Main>
    </>
  );
};
export default ParticipantSearchPage;
