import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ShapeContext } from '../../../../context/ShapeContext';
import Text from '../../../Text/Text';
import Title from '../../../Title/Title';

import styles from './ShapeMainContent.module.css';

const ShapeMainContent: FC = () => {
  const { t } = useTranslation();
  const shape = useContext(ShapeContext);

  if (!shape) {
    return <div>{t('shapes.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <Title>{t('shapes.title')}</Title>
      <Text>Details:</Text>
      {
        shape.content.map((item, index) => (
          <div key={index} style={{ textAlign: 'left' }}>
            <p>{item.predicate}: {item.object}</p>
          </div>
        ))
      }
    </div>
  );
};

export default ShapeMainContent;
