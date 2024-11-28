import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Text from '../text/Text';

import styles from './TextEntry.module.css'

interface EntryProps {
    name: string;
    value: string;
}

const TextEntry: FC<EntryProps> = ({ name, value }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.textEntryContainer}>
      <Text className={styles.nameTextField}>{name}</Text>
      <Text className={styles.valueTextField}>{value || t('common.not-specified')}</Text>
    </div>
  )
}

export default TextEntry
