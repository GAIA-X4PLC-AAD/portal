/* test coverage not required */
import {FC, useContext} from 'react';
import {useTranslation} from 'react-i18next';

import Title from '../../../common/components/fields/title/Title';
import Horizontal from '../../../common/components/layouts/Horizontal';
import Vertical from '../../../common/components/layouts/Vertical';
import {OntologyContext} from '../../context/OntologyContext';

import styles from './OntologySuitableOfferings.module.css';

const OntologySuitableOfferings: FC = () => {
  const { t } = useTranslation();
  const ontology = useContext(OntologyContext);

  if (!ontology) {
    return <div>{t('ontologies.not-found')}</div>;
  }

  return (
    <Vertical className={styles.offeringCardContainer}>
      <Horizontal className={styles.headerContainer}>
        <Title className={styles.title}>{t('dashboard.suitable-offerings')}</Title>
      </Horizontal>

      {/*{ontology.classes && ontology.classes.length > -1 && (*/}
      {/*  <div style={{ gap: '1px', textAlign: 'left' }}>*/}
      {/*    {ontology.classes.map((item, index) => (*/}
      {/*      <Text key={index}>{item}</Text>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*)}*/}

    </Vertical>
  );
};

export default OntologySuitableOfferings;
