import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Ontology } from '../../../../utils/ontologyMapper';
import Text from '../../../Text/Text';
import Title from '../../../Title/Title';

import styles from './MainContentOntology.module.css';

interface IMainContentOntology {
    ontology: Ontology;
}

const MainContentOntology: FC<IMainContentOntology> = ({ ontology }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <div>
        <Title>{t('ontologies.title')}</Title>
        {/* todo Button?Label*/}
      </div>
      <Text>{ontology.description}</Text>

      {ontology.shapes && ontology.shapes.length > 0 && (
        <div style={{ gap: '1px' }}>
          <Title>{t('shapes.titles')}</Title>
          {ontology.shapes.map((shape, index) => (
            <Text key={index}>{shape.label}</Text>
          ))}
        </div>
      )}

      {ontology.relatedOntologies && ontology.relatedOntologies.length > 0 && (
        <div style={{ gap: '1px' }}>
          <Title>{t('ontologies.related-ontologies')}</Title>
          {ontology.relatedOntologies.map((relatedOntology, index) => (
            <Text key={index}>{relatedOntology.subject}</Text>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContentOntology;