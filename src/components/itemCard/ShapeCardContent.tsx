import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Shape } from '../../types/shapesAndOntologies.model';
import Title from '../Title/Title';
import GaiaXButton from '../buttons/GaiaXButton';

import styles from './ItemCard.module.css';

interface IShapeCardContent {
    shape: Shape;
}

const ShapeCardContent: FC<IShapeCardContent> = ({ shape } ) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    navigate(`/shapes/details/${shape.id}`);
  }

  return (
    <div className={styles.content}>
      <div style={{ textAlign: 'left' }}>
        <Title>{shape.subject}</Title>
      </div>
      {/*{shape.map((item: any, index: number) => (*/}
      {/*  <p key={index}>{item}</p>*/}
      {/*))}*/}
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
