import {FC, useContext} from 'react'
import {useTranslation} from 'react-i18next';

import TextEntry from '../../../common/components/fields/entry/TextEntry';
import Link from '../../../common/components/fields/link/Link';
import Subtitle from '../../../common/components/fields/subtitle/Subtitle';
import Title from '../../../common/components/fields/title/Title';
import DetailsMainContent from '../../../common/components/layouts/DetailsMainContent';
import DetailsPropertyContainer from '../../../common/components/layouts/DetailsPropertyContainer';
import Vertical from '../../../common/components/layouts/Vertical';
import Markdown from '../../../common/components/markdown/Markdown';
import {ServiceOfferingDetailsContext} from '../../context/ServiceOfferingDetailsContext';
import styles from '../../resources/components/ResourceDetailMainContent.module.css';

const ServiceOfferingDetailMainContent: FC = () => {
  const { t } = useTranslation();
  const { serviceOfferingDetails, viewContentType } = useContext(ServiceOfferingDetailsContext);

  if (viewContentType === 'SHOW_SERVICE_OFFERING' && serviceOfferingDetails) {
    return (
      <DetailsMainContent>
        <Title className={styles.title}>{serviceOfferingDetails.name}</Title>
        <Markdown>{serviceOfferingDetails.description}</Markdown>

        <Subtitle>{t('common.general-details')}</Subtitle>
        <DetailsPropertyContainer>
          <TextEntry name={t('service-offerings.resulting-file-description') + ':'}
            value={serviceOfferingDetails.resultingFileDescription}/>
          <TextEntry name={t('service-offerings.resulting-file-specification') + ':'}
            value={serviceOfferingDetails.resultingFileSpecification}/>
          <TextEntry name={t('service-offerings.contract-id') + ':'}
            value={serviceOfferingDetails.contractId}/>
          <TextEntry name={t('service-offerings.recording-time') + ':'}
            value={serviceOfferingDetails.recordingTime}/>
          {/*<TextEntry name={t('service-offerings.provided-by') + ':'}*/}
          {/*  value={serviceOfferingDetails.providedBy}/>*/}
          <Link label={serviceOfferingDetails.providedBy}
            url={`/participants/${encodeURIComponent(serviceOfferingDetails.providedBy)}`}/>
        </DetailsPropertyContainer>

        <Subtitle>{t('service-offerings.required-files-list')}</Subtitle>
        <DetailsPropertyContainer>
          {serviceOfferingDetails.requiredFilesList &&
                        serviceOfferingDetails.requiredFilesList.map((item, key) => (
                          <Vertical key={key}>
                            <TextEntry name={t('service-offerings.required-files-specification') + ':'}
                              value={item.specification}/>
                            <TextEntry name={t('service-offerings.required-files-description') + ':'}
                              value={item.description}/>
                          </Vertical>
                        ))}
        </DetailsPropertyContainer>

        <Subtitle>{t('service-offerings.hosted-on')}</Subtitle>
        <DetailsPropertyContainer>
          <TextEntry name={t('service-offerings.host') + ':'}
            value={serviceOfferingDetails.serviceAccessPointHost}/>
          <TextEntry name={t('service-offerings.name') + ':'}
            value={serviceOfferingDetails.serviceAccessPointName}/>
          <TextEntry name={t('service-offerings.open-api') + ':'}
            value={serviceOfferingDetails.serviceAccessPointOpenAPI}/>
          <TextEntry name={t('service-offerings.protocol') + ':'}
            value={serviceOfferingDetails.serviceAccessPointProtocol}/>
          <TextEntry name={t('service-offerings.port') + ':'}
            value={serviceOfferingDetails.serviceAccessPointPort}/>
        </DetailsPropertyContainer>

        <Subtitle>{t('service-offerings.services-access-point')}</Subtitle>
        <DetailsPropertyContainer>
          <TextEntry name={t('service-offerings.location') + ':'}
            value={serviceOfferingDetails.hostedOnLocation}/>
          <TextEntry name={t('service-offerings.description') + ':'}
            value={serviceOfferingDetails.hostedOnDescription}/>
          <TextEntry name={t('service-offerings.name') + ':'} value={serviceOfferingDetails.hostedOnName}/>
        </DetailsPropertyContainer>

        <Subtitle>{t('service-offerings.related-offerings')}</Subtitle>
        {
          serviceOfferingDetails.claimsGraphUri.map((uri, index) => (
            <Link key={index} url={uri}/>
          ))
        }

      </DetailsMainContent>
    )
  }

  return (
    <>
    </>
  )
}

export default ServiceOfferingDetailMainContent;
