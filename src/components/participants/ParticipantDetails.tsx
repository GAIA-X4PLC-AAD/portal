import { Link } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { ARROW_RIGHT } from '../../utils/symbols';
import Text from '../Text/Text';
import Header from '../header/Header';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import NoContent from '../nocontent/NoContent';

import { useParticipant } from './hooks/useParticipant';

import './ParticipantDetials.css';

const ParticipantDetails: FC = () => {
  const id = location.pathname.split('/participants/')[1] + location.hash;
  const decodeUri = decodeURIComponent(id);
  const { participant, state } = useParticipant(decodeUri);
  const { t } = useTranslation();

  return (
    <div className='container'>
      <LoadingIndicator visible={state === 'LOADING'}/>
      <NoContent message={'participants detail no content message'} visible={state === 'SHOW_NO_RESULT'}/>
      <Header title={`${t('participant.titles')} ${ARROW_RIGHT} ${participant && participant.legalName}`}
        visible={state === 'SHOW_PARTICIPANT'}/>
      <Text visible={state === 'SHOW_PARTICIPANT'}>
        {participant && (
          <div className='main-content-container'>
            <p><b>Uri:</b> {participant.uri}</p>
            <p><b>Hash:</b> {participant.gaiaxTermsAndConditions}</p>
            <b>List of service offerings:</b>
            <ul>
              {participant.claimsGraphUri.map((cgu) => (
                <li key={cgu}>
                  {cgu.includes('service-offering') ? (
                    <Link component={RouterLink} to={`/shapes/details/${cgu}`} variant="contained"
                      color="primary">{cgu}</Link>
                  ) : (<></>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Text>
    </div>
  )
}

export default ParticipantDetails;
