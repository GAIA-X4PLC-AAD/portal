import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Resource } from '../../types/resources.model';
import Title from '../Title/Title';
import GaiaXButton from '../buttons/GaiaXButton';

import styles from './ItemCard.module.css';

interface IResourceCardContent {
    resource: Resource;
}

const ResourceCardContent: FC<IResourceCardContent> = ({ resource }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    const encodedUri = encodeURIComponent(resource.claimsGraphUri);
    navigate(`/details/${encodedUri}`);
  };

  return (
    <section className={styles.content}>
      <Title>{resource.claimsGraphUri}</Title>
      <p>{resource.description}</p>
      <div className={styles.button}>
        <GaiaXButton
          label={t('details.more-details')}
          handleOnClick={handleNavigationToDetailsPage}
        />
      </div>
    </section>
  );
}

export default ResourceCardContent;
