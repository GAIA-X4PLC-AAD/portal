/* test coverage not required */
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import GaiaXButton from '../../../../../../common/components/buttons/GaiaXButton';
import { ShapeContext } from '../../../../../../context/ShapeContext';
import { downloadJsonFile, downloadTurtleFile } from '../../../../../../services/schemaService.utils';
import Title from '../../../../../Title/Title';

import styles from './ShapeActions.module.css';

// todo test json download
const ShapeActions: FC = () => {
  const { t } = useTranslation();
  const shape = useContext(ShapeContext);

  if (!shape) {
    return <div>{t('shapes.not-found')}</div>;
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.actions')}</Title>
      </div>
      <div className={styles['buttons']}>
        <GaiaXButton label={t('details.download-json')} handleOnClick={() => downloadJsonFile(shape.shaclShapeId)} width={'100%'}/>
        <GaiaXButton label={t('details.download-file')} handleOnClick={() => downloadTurtleFile(shape.shaclShapeId)} width={'100%'}/>
      </div>
    </div>
  );
};

export default ShapeActions;
