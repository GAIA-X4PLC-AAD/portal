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
      <Title>{shape.short_shape}</Title>
      <Text>Details:</Text>
      <div>
        {shape.properties && shape.properties.length > 0 ? (
          <table className={styles['table']}>
            <thead>
              <tr>
                <th>{t('shapes.path')}</th>
                <th>{t('shapes.name')}</th>
                <th>{t('shapes.description')}</th>
                <th>{t('shapes.message')}</th>
                <th>{t('shapes.minCount')}</th>
                <th>{t('shapes.datatype')}</th>
              </tr>
            </thead>
            <tbody>
              {shape.properties.map((property, index) => (
                <tr key={index}>
                  <td>{property.path}</td>
                  <td>{property.name || '-'}</td>
                  <td>{property.description || '-'}</td>
                  <td>{property.message || '-'}</td>
                  <td>{property.minCount !== undefined ? property.minCount : '-'}</td>
                  <td>{property.datatype || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>{t('shapes.no-properties')}</p>
        )}
      </div>
    </div>
  );
};

export default ShapeMainContent;
