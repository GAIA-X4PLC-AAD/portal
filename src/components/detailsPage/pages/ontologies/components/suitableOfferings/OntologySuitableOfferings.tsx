import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { OntologyContext } from '../../../../../../context/OntologyContext';
import Text from '../../../../../Text/Text';
import Title from '../../../../../Title/Title';

import styles from './OntologySuitableOfferings.module.css';

const OntologySuitableOfferings: FC = () => {
  const { t } = useTranslation();
  const ontology = useContext(OntologyContext);

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.suitable-offerings')}</Title>

        {ontology.classes && ontology.classes.length > -1 && (
          <div style={{ gap: '1px', textAlign: 'left' }}>
            {ontology.classes.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </div>
        )}

      </div>
      <div className={styles['links']}>
      </div>
    </div>
  );
};

export default OntologySuitableOfferings;
