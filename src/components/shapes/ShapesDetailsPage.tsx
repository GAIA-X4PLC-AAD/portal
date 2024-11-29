import { ShapeContext } from 'components/context/ShapeContext';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// @ts-ignore
import car from '../../assets/car.gif';
import Header from '../../common/components/header/Header';
import Horizontal from '../../common/components/layouts/Horizontal';
import Main from '../../common/components/layouts/Main';
import Vertical from '../../common/components/layouts/Vertical';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { getShapeByName } from '../../services/shapeService.utils';
import { Shape } from '../../types/shapes.model';
import { ARROW_RIGHT } from '../../utils/symbols';

import styles from './ShapeDetailsPage.module.css';
import ShapeActions from './components/ShapeActions';
import ShapeSuitableOfferings from './components/ShapeSuitableOfferings';
import ShapesDetailMainContent from './components/ShapesDetailMainContent';

const ShapesDetailsPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const id = location.pathname.split('/shapes/details/')[1] + location.hash;
  const [isLoading, setIsLoading] = useState(true);
  const [shape, setShape] = useState<Shape>();

  useEffect(() => {
    const loadShape = async () => {
      try {
        const shape = await getShapeByName(id);
        setShape(shape);
      } catch (error) {
        console.error('Error getting shape:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadShape();

  }, [id]);

  if (isLoading) {
    return (
      <div className="newCarLoader">
        <img src={car} alt="loading..." className="car"/>
      </div>
    );
  }

  if (!shape) {
    return <div>{t('shapes.not-found')}</div>;
  }

  return (
    <ShapeContext.Provider value={shape}>
      <Header title={`${t('shapes.titles')} ${ARROW_RIGHT} ${shape.shaclShapeName}`}/>
      <Main>
        <LoadingIndicator visible={isLoading}/>
        <NoContent message={t('ontologies.ontology-detail-not-available')} visible={!isLoading && !ontology}/>

        <Horizontal className={styles.mainContentContainer} visible={!isLoading && !!ontology}>
          <ShapesDetailMainContent/>

          <Vertical className={styles.sidebarContainer}>
            <ShapeSuitableOfferings/>
            <ShapeActions/>
          </Vertical>
        </Horizontal>
      </Main>
    </ShapeContext.Provider>
  );
}

export default ShapesDetailsPage;
