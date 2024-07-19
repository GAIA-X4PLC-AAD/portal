import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ShapeContext } from '../../../../../../context/ShapeContext';
import { downloadTurtleFile } from '../../../../../../services/ApiService';
import Title from '../../../../../Title/Title';
import GaiaXButton from '../../../../../buttons/GaiaXButton';

import styles from './ShapeActions.module.css';

const ShapeActions: FC = () => {
  const { t } = useTranslation();
  const shape = useContext(ShapeContext);

  const openSDWizard = () => {
    window.open('https://sd-creation-wizard.gxfs.gx4fm.org/', '_blank');
  };

  if (!shape) {
    return <div>{t('shapes.not-found')}</div>;
  }

  const handleWizardButton = () => {
    openSDWizard();
    downloadTurtleFile(shape.id);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.actions')}</Title>
      </div>
      <div className={styles['buttons']}>
        <GaiaXButton label={t('details.open-creation-wizard')} handleOnClick={() => handleWizardButton()} width={'100%'}/>
        <GaiaXButton label={t('details.download-file')} handleOnClick={() => downloadTurtleFile(shape.id)} width={'100%'}/>
      </div>
    </div>
  );
};

export default ShapeActions;
