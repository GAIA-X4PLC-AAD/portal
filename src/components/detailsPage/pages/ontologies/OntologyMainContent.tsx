import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { OntologyContext } from '../../../../context/OntologyContext';
import Text from '../../../Text/Text';
import Title from '../../../Title/Title';

import styles from './OntologyMainContent.module.css';

const OntologyMainContent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ontology = useContext(OntologyContext);

  const handleNavigationToShapeDetailsPage = (shapeId: string) => {
    navigate(`/shapes/details/${shapeId}`);
  }

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <Title>{t('ontologies.title')}</Title>
      <Text>{ontology.description}</Text>

      {ontology.relatedShapes && ontology.relatedShapes.length > 0 && (
        <div style={{ gap: '1px',  textAlign: 'left' }}>
          <Title>{t('shapes.titles')}</Title>
          {ontology.relatedShapes.map((shape, index) => (
            <div key={index} onClick={() => handleNavigationToShapeDetailsPage(shape.id)} style={{ cursor: 'pointer' }}>
              <Text>{shape.subject.replace(new RegExp(`^${ontology.namespace}`), '')}</Text>
            </div>
          ))}
        </div>
      )}

      {ontology.relatedOntologies && ontology.relatedOntologies.length > -1 && (
        <div style={{ gap: '1px', textAlign: 'left' }}>
          <Title>{t('ontologies.related-ontologies')}</Title>
          {ontology.relatedOntologies.map((relatedOntology, index) => (
            <Text key={index}>{relatedOntology.subject}</Text>
          ))}
        </div>
      )}
    </div>
  );
};

export default OntologyMainContent;
