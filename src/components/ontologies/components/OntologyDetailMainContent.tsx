/* test coverage not required */
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Subtitle from '../../../common/components/fields/subtitle/Subtitle';
import Title from '../../../common/components/fields/title/Title';
import DetailsMainContent from '../../../common/components/layouts/DetailsMainContent';
import Markdown from '../../../common/components/markdown/Markdown';
import { Shape } from '../../../types/shapes.model';
import { OntologyContext } from '../../context/OntologyContext';

import styles from './OntologyDetailMainContent.module.css';

const OntologyDetailMainContent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ontology = useContext(OntologyContext);

  const handleNavigationToShapeDetailsPage = (shape: Shape) => {
    const encodedUri = encodeURIComponent(shape.shaclShapeName)
    navigate(`/shapes/${encodedUri}`);
  }

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <DetailsMainContent>
      <Title>{t('ontologies.title')}</Title>
      <Markdown>{ontology.description}</Markdown>

      {ontology.relatedShapes.length > 0 && (
        <>
          <Subtitle>{t('ontologies.classes')}</Subtitle>
          {ontology.relatedShapes.map((shape, index) => (
            <div className={styles['link']} key={index}
              onClick={() => handleNavigationToShapeDetailsPage(shape)}>
              {shape.shaclShapeName}
            </div>
          ))}
        </>
      )}
    </DetailsMainContent>
  );
};

export default OntologyDetailMainContent;
