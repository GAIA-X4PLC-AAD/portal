import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import Title from '../../common/components/fields/title/Title';
import { Shape } from '../../types/shapes.model';

import styles from './ItemCard.module.css';

interface IShapeCardContent {
    shape: Shape;
}

const ShapeCardContent: FC<IShapeCardContent> = ({ shape } ) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    navigate(`/shapes/details/${encodeURI(shape.shaclShapeName)}`);
  }

  return (
    <div className={styles.content}>
      <div style={{ textAlign: 'left' }}>
        <Title>{shape.shaclShapeName}</Title>
      </div>
      <div className={styles.button}>
        <GaiaXButton
          label={t('details.more-details')}
          handleOnClick={handleNavigationToDetailsPage}
        />
      </div>
    </div>
  );
}

export default ShapeCardContent;
