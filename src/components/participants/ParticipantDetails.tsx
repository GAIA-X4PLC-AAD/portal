import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';

import NoContent from '../../common/components/./././noContent/NoContent';
import Header from '../../common/components/header/Header';
import Main from '../../common/components/layouts/Main';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import {ResourceContextProvider} from '../context/ParticipantDetailsContext';

import ParticipantDetailMainContent from './components/ParticipantDetailMainContent';
import {useParticipantDetails} from './hooks/useParticipantDetails';

import './ParticipantDetials.css';

const ParticipantDetails: FC = () => {
  const location = useLocation();
  const id = location.pathname.split('/participants/')[1];
  const decodeUri = decodeURIComponent(id);
  const { participant, viewContentType } = useParticipantDetails(decodeUri);
  const { t } = useTranslation();

  return (
    <ResourceContextProvider value={{ participant, viewContentType }}>
      <Header
        breadcrumbs={[
          {
            label: t('participants.title'),
            to: '/participants'
          },
          {
            label: viewContentType === 'SHOW_PARTICIPANT' ? participant?.legalName || '' : '',
            to: `/participants/${id}`
          }]}
      />

      <Main>
        <LoadingIndicator visible={viewContentType === 'LOADING'}/>
        <NoContent message={`${t('participants.no-participant-available')}`}
          visible={viewContentType === 'SHOW_NO_RESULT'}/>

        <ParticipantDetailMainContent/>
      </Main>
    </ResourceContextProvider>
  )
}

export default ParticipantDetails;
