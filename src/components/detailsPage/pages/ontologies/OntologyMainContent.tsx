import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { OntologyContext } from '../../../../context/OntologyContext';
import Text from '../../../Text/Text';
import Title from '../../../Title/Title';

import styles from './OntologyMainContent.module.css';

const OntologyMainContent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ontology = useContext(OntologyContext);

  const handleNavigationToShapeDetailsPage = (shapeId: string) => {
    navigate(`/shapes/details/${shapeId}`);
  }

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <Title>{t('ontologies.title')}</Title>
      <Text>{ontology.description}</Text>
    </div>
  );
};

export default OntologyMainContent;
