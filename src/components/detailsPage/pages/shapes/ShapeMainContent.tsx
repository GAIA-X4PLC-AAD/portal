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

  const uniqueTypes = Array.from(new Set(
    shape.properties.flatMap(property => property.propertyValues.map(value => value.type))
  )).sort();

  return (
    <div className={styles['container']}>
      <Title>{shape.subject}</Title>
      <Text>Details</Text>

      <table className={styles['table']}>
        <thead>
          <tr>
            {uniqueTypes.map((type, index) => (
              <th key={index}>{type.split('#').pop()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shape.properties.map((property, index) => (
            <tr key={index}>
              {uniqueTypes.map((type, index) => {
                const value = property.propertyValues.find(value => value.type === type);
                return <td key={index}>{value ? value.value : ''}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ShapeMainContent;
