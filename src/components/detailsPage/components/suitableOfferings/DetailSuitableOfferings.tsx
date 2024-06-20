import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Ontology } from '../../../../types/shapesAndOntologies.model';
import Title from '../../../Title/Title';

import styles from './DetailSuitableOfferings.module.css';

interface IDetailSuitableOfferings {
    ontology: Ontology;
}

const DetailSuitableOfferings: FC<IDetailSuitableOfferings> = ({ ontology }) => {
  const { t } = useTranslation();

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
