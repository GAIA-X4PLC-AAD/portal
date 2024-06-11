import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../../context/AuthContextProvider';
import { downloadTurtleFile } from '../../../../services/ontologyService.utils';
import { Ontology } from '../../../../types/shapesAndOntologies.model';
import Title from '../../../Title/Title';
import GaiaXButton from '../../../buttons/GaiaXButton';

import styles from './DetailActions.module.css';

interface IDetailActions {
    ontology: Ontology;
}

const DetailActions: FC<IDetailActions> = ({ ontology }) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.actions')}</Title>
      </div>
      <div className={styles['buttons']}>
        <GaiaXButton label={t('details.view-graph')} handleOnClick={() => {}} width={'100%'}/>
        <GaiaXButton label={t('details.download-file')} handleOnClick={() => downloadTurtleFile(authContext, ontology.subject)} width={'100%'}/>
      </div>
    </div>
  );
};

export default DetailActions;
