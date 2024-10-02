import { Link } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Text from '../Text/Text';
import LoadingIndicator from '../loading_view/LoadingIndicator';
import NoContent from '../nocontent/NoContent';

import { useParticipant } from './hooks/useParticipant';

const ParticipantDetails: FC = () => {
  const id = location.pathname.split('/participants/')[1] + location.hash;
  const decodeUri = decodeURIComponent(id);
  const { participant, state } = useParticipant(decodeUri);

  return (
    <>
      <LoadingIndicator visible={state === 'LOADING'}/>
      <NoContent message={'participants detail no content message'} visible={state === 'SHOW_NO_RESULT'}/>
      <Text visible={state === 'SHOW_PARTICIPANT'}>
        {participant && (
          <>
            <p>Legal Name: {participant.legalName}</p>
            <p>Uri: {participant.uri}</p>
            <p>Hash: {participant.gaiaxTermsAndConditions}</p>
            <h4>List of claims graphs uri</h4>
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
          </>
        )}
      </Text>
    </>
  )
}

export default ParticipantDetails;
