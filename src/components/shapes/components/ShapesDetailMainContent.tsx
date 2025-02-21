import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Title from '../../../common/components/fields/title/Title';
import DetailsMainContent from '../../../common/components/layouts/DetailsMainContent';
import { getShapeByName } from '../../../services/shapeService.utils';
import { ShapeContext } from '../../context/ShapeContext';

import styles from './ShapesDetailMainContent.module.css';

const ShapesDetailMainContent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const shape = useContext(ShapeContext);

  if (!shape) {
    return <div>{t('shapes.not-found')}</div>;
  }

  const handleNavigationToDetailsPage = async (shapeName: string) => {
    const shapeToLink = await getShapeByName(shapeName);
    if (shapeToLink) {
      navigate(`/shapes/details/${shapeToLink.shaclShapeName}`);
    }
  }

  const uniqueTypes = Array.from(new Set(
    shape.properties.flatMap(property => property.propertyValues.map(value => value.type))
  ));

  return (
    <DetailsMainContent>
      <Title>{shape.shaclShapeName}</Title>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
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
                  if (value && value.value && type === 'http://www.w3.org/ns/shacl#node') {
                    return <td key={index} className={styles.link} onClick={() => handleNavigationToDetailsPage(value.value)}>{value ? value.value : ''}</td>;
                  } else {
                    return <td key={index}>{value ? value.value : ''}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DetailsMainContent>
  );
};

export default ShapesDetailMainContent;
