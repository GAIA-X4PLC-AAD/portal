import React from 'react';
import { useTranslation } from 'react-i18next';

import NoContent from '../../common/components/././NoContent/NoContent';
import Horizontal from '../../common/components/layouts/Horizontal';
import Main from '../../common/components/layouts/Main';
import Vertical from '../../common/components/layouts/Vertical';
import ItemCard from '../ItemCard/ItemCard';
import { participantToItemCardData } from '../ItemCard/itemCardHelper';
import CardContainer from '../cards/CardContainer';
import Header from '../header/Header';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import SearchBar from '../searchBar/SearchBar';

import { useParticipants } from './hooks/useParticipants';

const ParticipantSearchPage = () => {
  const { t } = useTranslation();
  const {
    participants,
    viewContentType,
    search,
  } = useParticipants()

  return (
    <>
      <Header title={`${t('participants.titles')} (${participants.length} ${t('common.results')})`}/>
      <Main>
        <Vertical>
          <Horizontal>
            <Vertical>
              <SearchBar placeholder={t('participants.search-bar-text')} onSearch={search}/>
            </Vertical>
          </Horizontal>
          <LoadingIndicator visible={viewContentType === 'LOADING'}/>
          <CardContainer visible={viewContentType === 'SHOW_PARTICIPANTS'}>
            {
              participants.map((participant) => (
                <ItemCard key={participant.legalName} itemCardData={participantToItemCardData(participant)} />
              ))}
          </CardContainer>
          <NoContent message={`${t('participants.no-participants-available')}`} visible={viewContentType === 'SHOW_NO_RESULTS'}/>
        </Vertical>
      </Main>
    </>
  );
};
export default ParticipantSearchPage;
