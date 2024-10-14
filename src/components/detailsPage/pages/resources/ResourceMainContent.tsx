import Title from 'components/Title/Title';
import Divider from 'components/divider/Divider';
import Subtitle from 'components/subtitle/Subtitle';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Markdown from '../../../../common/markdown/Markdown';
import { ResourceDetailsContext } from '../../../../context/ResourceDetailsContext';

import styles from './ResourceMainContent.module.css';

const ResourceMainContent = () => {
  const { t } = useTranslation();
  const resourceDetails = useContext(ResourceDetailsContext);

  if (!resourceDetails) {
    return <>{t('resources.not-found')}</>;
  }

  return (
    <div className={styles['details-card-container']}>
      <Title>{name as string}</Title>
      <Markdown>{resourceDetails.description}</Markdown>
      <Divider/>
      <Subtitle>General Information:</Subtitle>
      <Divider/>
      <Subtitle>Details:</Subtitle>
    </div>
  );
}

export default ResourceMainContent;
