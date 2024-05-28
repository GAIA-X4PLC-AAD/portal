import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Ontology } from '../../../../../utils/ontologyMapper';
import Title from '../../../../Title/Title';

import styles from './MainContentOntology.module.css';

interface IMainContentOntology {
    ontology: Ontology;
}

const MainContentOntology: FC<IMainContentOntology> = ({ ontology }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <Title>{t('ontologies.title')}</Title>
    </div>
  );
};

export default MainContentOntology;
