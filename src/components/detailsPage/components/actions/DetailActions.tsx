import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../../context/AuthContextProvider';
import { OntologyContext } from '../../../../context/OntologyContext';
import { downloadTurtleFile } from '../../../../services/ApiService';
import Title from '../../../Title/Title';
import GaiaXButton from '../../../buttons/GaiaXButton';

import styles from './DetailActions.module.css';

enum graphRoutes {
    shapesAndOntologies = '/shapesAndOntologies/graph/',
}

const DetailActions: FC = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const ontology = useContext(OntologyContext);

  const handleNavigationToGraphPage = () => {
    const encodedUri = encodeURIComponent(ontology.subject);
    navigate(`${graphRoutes.shapesAndOntologies}${encodedUri}`);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.actions')}</Title>
      </div>
      <div className={styles['buttons']}>
        <GaiaXButton label={t('details.view-graph')} handleOnClick={() => handleNavigationToGraphPage()} width={'100%'}/>
        <GaiaXButton label={t('details.download-file')} handleOnClick={() => downloadTurtleFile(authContext, ontology.subject)} width={'100%'}/>
      </div>
    </div>
  );
};

export default DetailActions;
