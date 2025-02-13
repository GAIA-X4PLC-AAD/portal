import {FC, useContext, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import TextEntry from '../../../common/components/fields/entry/TextEntry';
import Link from '../../../common/components/fields/link/Link';
import Subtitle from '../../../common/components/fields/subtitle/Subtitle';
import DetailsMainContent from '../../../common/components/layouts/DetailsMainContent';
import {ParticipantDetailsContext} from '../../context/ParticipantDetailsContext';

const ParticipantDetailMainContent: FC = () => {
  const { t } = useTranslation();
  const { participant, viewContentType } = useContext(ParticipantDetailsContext);
  const serviceOfferingsUri = useMemo(() =>
    (participant?.claimsGraphUri || [])
      .filter(claimsGraphUri => claimsGraphUri.includes('service-offering'))
  , [participant?.claimsGraphUri])

  if (viewContentType === 'SHOW_PARTICIPANT' && participant) {
    return (
      <DetailsMainContent>

        <TextEntry name={t('participants.uri') + ':'} value={participant.uri}/>
        <TextEntry name={t('participants.terms-and-conditions') + ':'}
          value={participant.gaiaxTermsAndConditions}/>
        {
          (serviceOfferingsUri.length)
            ? (
              <>
                <Subtitle>List of service offerings</Subtitle>
                {
                  serviceOfferingsUri.map((serviceOfferingUri) => (
                    <Link
                      key={serviceOfferingUri}
                      url={`/shapes/details/${encodeURIComponent(serviceOfferingUri)}`}/>
                  ))
                }
              </>
            )
            : (<></>)
        }
      </DetailsMainContent>
    )
  }

  return <></>
}

export default ParticipantDetailMainContent;
