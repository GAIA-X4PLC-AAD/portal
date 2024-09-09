import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import GMarkdown from '../../../../common/markdown/GMarkdown';
import { OntologyContext } from '../../../../context/OntologyContext';
import { Shape } from '../../../../types/shapes.model';
import Text from '../../../Text/Text';
import Title from '../../../Title/Title';

import styles from './OntologyMainContent.module.css';

const OntologyMainContent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ontology = useContext(OntologyContext);

  const handleNavigationToShapeDetailsPage = (shape: Shape) => {
    navigate(`/shapes/details/${shape.subject}`);
  }

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <Title>{t('ontologies.title')}</Title>
      <GMarkdown>
        {ontology.description}
      </GMarkdown>
      {ontology.relatedShapes.length > 0 && (
        <div style={{ textAlign: 'left' }}>
          <Text>{t('ontologies.classes')}</Text>
          {ontology.relatedShapes.map((shape, index) => (
            <div className={styles['link']} key={index} onClick={() => handleNavigationToShapeDetailsPage(shape)}>
              {shape.classname ? shape.classname : shape.subject}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OntologyMainContent;
