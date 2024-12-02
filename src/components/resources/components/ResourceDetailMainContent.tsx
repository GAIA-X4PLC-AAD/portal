import TextEntry from 'common/components/fields/entry/TextEntry';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Link from '../../../common/components/fields/link/Link';
import Subtitle from '../../../common/components/fields/subtitle/Subtitle';
import Text from '../../../common/components/fields/text/Text';
import Title from '../../../common/components/fields/title/Title';
import DetailsMainContent from '../../../common/components/layouts/DetailsMainContent';
import DetailsPropertyContainer from '../../../common/components/layouts/DetailsPropertyContainer';
import Markdown from '../../../common/components/markdown/Markdown';
import { ResourceDetailsContext } from '../../context/ResourceDetailsContext';

import styles from './ResourceDetailMainContent.module.css';

const ResourceDetailMainContent = () => {
  const { t } = useTranslation();
  const resourceDetails = useContext(ResourceDetailsContext);

  if (!resourceDetails) {
    return <></>;
  }

  return (
    <DetailsMainContent>
      <Title className={styles.title}>{resourceDetails.name}</Title>
      <Markdown>{resourceDetails.description}</Markdown>
      <TextEntry name={t('resources.provided-by') + ':'} value={resourceDetails.legalName}/>

      <Subtitle>{t('common.general-details')}</Subtitle>
      <DetailsPropertyContainer>
        <TextEntry name={t('resources.copyright-owned-by') + ':'} value={resourceDetails.legalName}/>
        <TextEntry name={t('resources.expiration-date-time') + ':'} value={resourceDetails.expirationDateTime}/>
        <TextEntry name={t('resources.license') + ':'} value={resourceDetails.license}/>
        <TextEntry name={t('resources.obsolete-date-time') + ':'} value={resourceDetails.obsoleteDateTime}/>
        <TextEntry name={t('resources.containsPII') + ':'}
          value={resourceDetails.containsPII ? t('common.yes') : t('common.no')}/>
      </DetailsPropertyContainer>

      <Subtitle>{t('common.content-details')}</Subtitle>
      <DetailsPropertyContainer>
        <TextEntry name={t('resources.road-types') + ':'} value={resourceDetails.roadTypes}/>
        <TextEntry name={t('resources.level-of-detail') + ':'} value={resourceDetails.levelOfDetail}/>
        <TextEntry name={t('resources.lane-types') + ':'} value={String(resourceDetails.laneTypes || [])}/>
        <TextEntry name={t('resources.traffic-direction') + ':'} value={resourceDetails.trafficDirection}/>
      </DetailsPropertyContainer>

      <Subtitle>{t('common.compatible-offerings')}</Subtitle>
      <Text>{t('common.not-specified')}</Text>

      <Subtitle>{t('common.directly-related-offerings')}</Subtitle>
      {
        resourceDetails.claimsGraphUri.map((uri, index) => (
          <Link key={index} url={uri}/>
        ))
      }
    </DetailsMainContent>
  );
}

export default ResourceDetailMainContent;
