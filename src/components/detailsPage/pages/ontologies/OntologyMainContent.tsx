import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { OntologyContext } from '../../../../context/OntologyContext';
import Text from '../../../Text/Text';
import Title from '../../../Title/Title';

import styles from './OntologyMainContent.module.css';

const OntologyMainContent: FC = () => {
  const { t } = useTranslation();
  const ontology = useContext(OntologyContext);

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <Title>{t('ontologies.title')}</Title>

      <Text>{ontology.description}</Text>

      {ontology.relatedOntologies && ontology.relatedOntologies.length > -1 && (
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

export default OntologyMainContent;
