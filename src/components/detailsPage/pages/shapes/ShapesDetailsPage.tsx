import { ShapeContext } from '../../../../context/ShapeContext';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// @ts-ignore
import car from '../../../../assets/car.gif';
import { getShapeByName } from '../../../../services/shapeService.utils';
import { Shape } from '../../../../types/shapes.model';
import { ARROW_RIGHT } from '../../../../utils/symbols';
import Header from '../../../header/Header';
import DetailsContent from '../../layout/content/DetailsContent';
import DetailsMainContent from '../../layout/mainContent/DetailsMainContent';
import DetailsPage from '../../layout/mainPage/DetailsPage';
import DetailsSidebar from '../../layout/sidebar/DetailsSidebar';

import ShapeMainContent from './ShapeMainContent';
import ShapeActions from './components/actions/ShapeActions';
import ShapeSuitableOfferings from './components/suitableOfferings/ShapeSuitableOfferings';

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
    <DetailsPage>
      <Header title={`${t('shapes.titles')} ${ARROW_RIGHT} ${shape.shaclShapeName}`}/>
      <ShapeContext.Provider value={shape}>
        <DetailsContent>
          <DetailsMainContent>
            <ShapeMainContent />
          </DetailsMainContent>
          <DetailsSidebar>
            <ShapeSuitableOfferings />
            <ShapeActions />
          </DetailsSidebar>
        </DetailsContent>
      </ShapeContext.Provider>
    </DetailsPage>
  );
}

export default ShapesDetailsPage;
