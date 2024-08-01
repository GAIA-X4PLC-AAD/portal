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
      <Title>{shape.subject}</Title>
      <Text>Details:</Text>
      <table className={styles['table']}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {shape.properties.map((property, index) => (
            <tr key={index}>
              <td>{property.predicate.split('#').pop()}</td>
              <td>{property.object}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShapeMainContent;
