/* test coverage not required */
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Text from '../../../../common/components/fields/././text/Text';
import Title from '../../../../common/components/fields/title/Title';
import Markdown from '../../../../common/components/markdown/Markdown';
import { Shape } from '../../../../types/shapes.model';
import { OntologyContext } from '../../../context/OntologyContext';

import styles from './OntologyMainContent.module.css';

const OntologyMainContent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ontology = useContext(OntologyContext);

  const handleNavigationToShapeDetailsPage = (shape: Shape) => {
    navigate(`/shapes/details/${shape.shaclShapeName}`);
  }

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <Title>{t('ontologies.title')}</Title>
      <Markdown>
        {ontology.description}
      </Markdown>
      {ontology.relatedShapes.length > 0 && (
        <div style={{ textAlign: 'left' }}>
          <Text>{t('ontologies.classes')}</Text>
          {ontology.relatedShapes.map((shape, index) => (
            <div className={styles['link']} key={index} onClick={() => handleNavigationToShapeDetailsPage(shape)}>
              {shape.shaclShapeName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OntologyMainContent;
