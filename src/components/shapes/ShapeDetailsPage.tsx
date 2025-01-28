/* test coverage not required */
import { ShapeContext } from 'components/context/ShapeContext';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import car from '../../assets/car.gif';
import Header from '../../common/components/header/Header';
import DetailsContent from '../../common/components/layouts/DetailsContent';
import DetailsSidebar from '../../common/components/layouts/DetailsSidebar';
import Main from '../../common/components/layouts/Main';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { getShapeByName } from '../../services/shapeService.utils';
import { Shape } from '../../types/shapes.model';

import ShapeActions from './components/ShapeActions';
import ShapeSuitableOfferings from './components/ShapeSuitableOfferings';
import ShapesDetailMainContent from './components/ShapesDetailMainContent';

const ShapeDetailsPage: FC = () => {
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
      <Header
        breadcrumbs={[
          {
            label: t('shapes.titles'),
            to: '/shapes'
          },
          {
            label: shape?.shaclShapeName ?? '',
            to: `/shapes/details/${id}`
          }]}
      />
      <Main>
        <LoadingIndicator visible={isLoading}/>
        <NoContent message={t('shapes.shape-detail-not-available')} visible={!isLoading && !shape}/>

        <DetailsContent visible={!isLoading && !!shape}>
          <ShapesDetailMainContent/>

          <DetailsSidebar>
            <ShapeSuitableOfferings/>
            <ShapeActions/>
          </DetailsSidebar>
        </DetailsContent>
      </Main>
    </ShapeContext.Provider>
  );
}

export default ShapeDetailsPage;
