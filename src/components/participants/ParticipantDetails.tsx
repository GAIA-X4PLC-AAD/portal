import { Link } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { ARROW_RIGHT } from '../../utils/symbols';
import Header from '../header/Header';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import NoContent from '../nocontent/NoContent';

import { useParticipant } from './hooks/useParticipant';

import './ParticipantDetials.css';

const ParticipantDetails: FC = () => {
  const id = location.pathname.split('/participants/')[1];
  const decodeUri = decodeURIComponent(id);
  const { participant, viewContentType } = useParticipant(decodeUri);
  const { t } = useTranslation();

  return (
    <div className='container'>
      <LoadingIndicator visible={viewContentType === 'LOADING'}/>
      <Header title={`${t('participants.title')} ${ARROW_RIGHT} ${participant && participant.legalName}`}
        visible={viewContentType === 'SHOW_PARTICIPANT'}/>
      <NoContent message={`${t('participants.no-participant-available')}`}
        visible={viewContentType === 'SHOW_NO_RESULT'}/>
      {viewContentType === 'SHOW_PARTICIPANT' && (
        <div className='main-content-container'>
          <p><b>Uri:</b> {participant.uri}</p>
          <p><b>Hash:</b> {participant.gaiaxTermsAndConditions}</p>
          <b>List of service offerings:</b>
          <ul>
            {participant.claimsGraphUri.map((cgu) => (
              <li key={cgu}>
                {cgu.includes('service-offering') ? (
                  <Link component={RouterLink} to={`/shapes/details/${encodeURIComponent(cgu)}`}
                    variant="contained"
                    color="primary">{cgu}</Link>
                ) : (<></>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ParticipantDetails;
