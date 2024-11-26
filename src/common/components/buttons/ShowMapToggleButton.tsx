import ListIcon from '@mui/icons-material/List';
import MapIcon from '@mui/icons-material/Map';
import Text from 'common/components/fields/text/Text';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Svg from '../icon/Svg';

import styles from './ShowMapButton.module.css';

interface IShowMapButton {
    selected: boolean;
    onToggle: () => void;
}

const ShowMapToggleButton = ({ selected = false, onToggle }: IShowMapButton) => {
  const { t } = useTranslation();

  return (
    <Svg Icon={selected ? ListIcon : MapIcon} onClick={onToggle}>
      <Text className={styles.buttonLabel}>{t('details.view-graph')}</Text>
    </Svg>
  )
}

export default ShowMapToggleButton;
