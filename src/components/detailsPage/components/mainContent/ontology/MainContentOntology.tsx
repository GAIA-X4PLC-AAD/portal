import { FC } from 'react';

import { Ontology } from '../../../../../utils/ontologyMapper';
import Title from '../../../../Title/Title';

import styles from './MainContentOntology.module.css';

interface IMainContentOntology {
    ontology: Ontology;
}

const MainContentOntology: FC<IMainContentOntology> = ({ ontology }) => {
  return (
    <div className={styles['container']}>
      <Title>Ontology</Title>
    </div>
  );
};

export default MainContentOntology;
