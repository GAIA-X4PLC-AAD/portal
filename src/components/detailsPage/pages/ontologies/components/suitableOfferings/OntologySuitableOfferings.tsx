/* test coverage not required */
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Title from '../../../../../../common/components/fields/title/Title';
import { OntologyContext } from '../../../../../context/OntologyContext';

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
        {/*TODO: Ontology type has been changed the detail page is not working anymore. It should be fixed */}
        {/*{ontology.classes && ontology.classes.length > -1 && (*/}
        {/*  <div style={{ gap: '1px', textAlign: 'left' }}>*/}
        {/*    {ontology.classes.map((item, index) => (*/}
        {/*      <Text key={index}>{item}</Text>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*)}*/}

      </div>
      <div className={styles['links']}>
      </div>
    </div>
  );
};

export default OntologySuitableOfferings;
