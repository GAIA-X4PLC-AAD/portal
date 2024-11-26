import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import Title from '../../common/components/fields/title/Title';
import Markdown from '../../common/components/markdown/Markdown';
import { Resource } from '../../types/resources.model';

import styles from './ItemCard.module.css';

interface IResourceCardContent {
    resource: Resource;
}

const ResourceCardContent: FC<IResourceCardContent> = ({ resource }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    const encodedUri = encodeURIComponent(resource.uri);
    navigate(`/resources/${encodedUri}`);
  };

  return (
    <section className={styles.cardContent}>
      <Title className={styles.cardName}>{resource.name}</Title>
      {
        resource.description && <Markdown>{resource.description}</Markdown>
      }
      <div className={styles.buttonContainer}>
        <GaiaXButton
          className={styles.detailsButton}
          label={t('details.more-details')}
          handleOnClick={handleNavigationToDetailsPage}
        />
      </div>
    </section>
  );
}

export default ResourceCardContent;
