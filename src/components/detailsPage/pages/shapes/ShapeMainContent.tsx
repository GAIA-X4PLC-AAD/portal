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

  const uniquePredicates = Array.from(new Set(
    shape.properties.flatMap(property => property.values.map(value => value.predicate))
  )).sort();

  return (
    <div className={styles['container']}>
      <Title>{shape.subject}</Title>
      <Text>Details</Text>

      <table className={styles['table']}>
        <thead>
          <tr>
            {uniquePredicates.map((predicate, index) => (
              <th key={index}>{predicate.split('#').pop()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shape.properties.map((property, index) => (
            <tr key={index}>
              {uniquePredicates.map((predicate, index) => {
                const value = property.values.find(value => value.predicate === predicate);
                return <td key={index}>{value ? value.object : ''}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ShapeMainContent;
