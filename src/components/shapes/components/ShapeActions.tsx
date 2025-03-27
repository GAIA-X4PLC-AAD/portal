/* test coverage not required */
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import GaiaXButton from '../../../common/components/buttons/GaiaXButton';
import Title from '../../../common/components/fields/title/Title';
import { getConvertedFile, getSchemaById } from '../../../services/schemaApiService';
import { downloadFile } from '../../../utils/fileUtils';
import { ShapeContext } from '../../context/ShapeContext';

import styles from './ShapeActions.module.css';

const ShapeActions: FC = () => {
  const { t } = useTranslation();
  const shape = useContext(ShapeContext);

  if (!shape) {
    return <div>{t('shapes.not-found')}</div>;
  }

  const handleJsonDownload = async () => {
    const data = await getConvertedFile(shape.shaclShapeId);
    downloadFile(shape.shaclShapeId, '.json', data);
  }

  const handleTurtleDownload = async () => {
    const response = await getSchemaById(shape.shaclShapeId);
    downloadFile(shape.shaclShapeId, '.json', response);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <Title>{t('dashboard.actions')}</Title>
      </div>
      <div className={styles['buttons']}>
        <GaiaXButton label={t('details.download-json')} handleOnClick={handleJsonDownload}/>
        <GaiaXButton label={t('details.download-file')} handleOnClick={handleTurtleDownload}/>
      </div>
    </div>
  );
};

export default ShapeActions;
