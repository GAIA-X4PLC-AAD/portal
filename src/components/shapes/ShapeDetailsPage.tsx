import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Header from '../../common/components/header/Header';
import DetailsContent from '../../common/components/layouts/DetailsContent';
import DetailsSidebar from '../../common/components/layouts/DetailsSidebar';
import Main from '../../common/components/layouts/Main';
import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';
import NoContent from '../../common/components/noContent/NoContent';
import { getShapeByName } from '../../services/shapeService.utils';
import { Shape } from '../../types/shapes.model';
import { ShapeContext } from '../context/ShapeContext';

import ShapeActions from './components/ShapeActions';
import ShapeSuitableOfferings from './components/ShapeSuitableOfferings';
import ShapesDetailMainContent from './components/ShapesDetailMainContent';

const ShapeDetailsPage: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const shapeId = location.pathname.split('/shapes/')[1];

  const [isLoading, setIsLoading] = useState(true);
  const [shape, setShape] = useState<Shape>();

  useEffect(() => {
    if (shapeId) {
      getShapeByName(shapeId)
        .then((response) => setShape(response))
        .finally(() => setIsLoading(false));
    }
  }, [shapeId]);

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
            to: `/shapes/${shapeId}`
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
