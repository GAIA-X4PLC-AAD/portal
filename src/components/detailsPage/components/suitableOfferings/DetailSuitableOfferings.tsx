import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { OntologyContext } from '../../../../context/OntologyContext';
import Title from '../../../Title/Title';

import styles from './DetailSuitableOfferings.module.css';

const DetailSuitableOfferings: FC = () => {
  const { t } = useTranslation();
  const ontology = useContext(OntologyContext);

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.suitable-offerings')}</Title>
      </div>
      <div className={styles['links']}>
      </div>
    </div>
  );
};

export default DetailSuitableOfferings;
