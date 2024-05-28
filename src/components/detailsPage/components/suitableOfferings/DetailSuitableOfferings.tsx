import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../Title/Title';
import Link from '../../../link/Link';

import styles from './DetailSuitableOfferings.module.css';

interface IDetailSuitableOfferings {
   linksForOfferings: string[];
}

const DetailSuitableOfferings: FC<IDetailSuitableOfferings> = ({ linksForOfferings }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.suitable-offerings')}</Title>
      </div>
      <div className={styles['links']}>
        {linksForOfferings.length > 1 ? linksForOfferings.map((link, index) => <Link key={index} url={link} fontSize={'20px'}/>) : null}
      </div>
    </div>
  );
};

export default DetailSuitableOfferings;
