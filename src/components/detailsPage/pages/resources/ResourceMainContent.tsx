import Title from 'components/Title/Title';
import Subtitle from 'components/subtitle/Subtitle';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Markdown from '../../../../common/markdown/Markdown';
import { ResourceDetailsContext } from '../../../../context/ResourceDetailsContext';
import Text from '../../../Text/Text';

import styles from './ResourceMainContent.module.css';

const ResourceMainContent = () => {
  const { t } = useTranslation();
  const resourceDetails = useContext(ResourceDetailsContext);

  if (!resourceDetails) {
    return <>{t('resources.not-found')}</>;
  }

  return (
    <div className={styles['container']}>
      <Title>{resourceDetails.name}</Title>
      <Markdown>{resourceDetails.description}</Markdown>
      <Text>{`${t('resources.provided-by')}: ${resourceDetails.legalName}`}</Text>

      <Subtitle>{t('common.general-details')}</Subtitle>
      <Text>{`${t('resources.copyright-owned-by')}: ${resourceDetails.legalName}`}</Text>
      <Text>{`${t('resources.license')}: ${resourceDetails.license}`}</Text>
      <Text>{`${t('resources.containsPII')}: ${resourceDetails.containsPII}`}</Text>
      <Text>{`${t('resources.expiration-date-time')}: ${resourceDetails.expirationDateTime}`}</Text>
      <Text>{`${t('resources.obsolete-date-time')}: ${resourceDetails.obsoleteDateTime}`}</Text>

      <Subtitle>{t('common.content-details')}</Subtitle>
      <Text>{`${t('resources.road-types')}: ${resourceDetails.roadTypes}`}</Text>
      <Text>{`${t('resources.lane-types')}: ${resourceDetails.laneTypes}`}</Text>
      <Text>{`${t('resources.level-of-detail')}: ${resourceDetails.levelOfDetail}`}</Text>
      <Text>{`${t('resources.traffic-direction')}: ${resourceDetails.trafficDirection}`}</Text>

      <Subtitle>{t('common.compatible-offerings')}</Subtitle>

      <Subtitle>{t('common.directly-related-offerings')}</Subtitle>
      {resourceDetails.claimsGraphUri.map((uri, index) => (
        <Text key={index}>{uri}</Text>
      ))}
    </div>
  );
}

export default ResourceMainContent;
