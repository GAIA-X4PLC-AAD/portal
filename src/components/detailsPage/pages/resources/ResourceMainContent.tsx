import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { SelfDescriptionContext } from '../../../../context/SelfDescriptionContext';
import Text from '../../../Text/Text';
import Title from '../../../Title/Title';

import styles from './ResourceMainContent.module.css';

const ResourceMainContent: FC = () => {
  const { t } = useTranslation();
  const selfDescription = useContext(SelfDescriptionContext);

  return (
    <div className={styles['container']}>
      <Title>Resource</Title>
      <Text>{selfDescription && selfDescription.description ? selfDescription.description : t('common.no-description')}</Text>

      <Title>{t('common.general-details')}</Title>

      <Title>{t('common.content-details')}</Title>

      <Title>{t('common.compatible-offerings')}</Title>

      <Title>{t('common.related-offerings')}</Title>
    </div>
  );
};

export default ResourceMainContent;
