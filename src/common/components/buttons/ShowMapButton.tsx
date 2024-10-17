import MapIcon from '@mui/icons-material/Map';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './ShowMapButton.css';

interface IShowMapButton {
    selected: boolean;
    onToggle: () => void;
}

const ShowMapButton = ({ selected, onToggle }: IShowMapButton) => {
  const { t } = useTranslation();

  return (
    <button className={`button ${selected ? 'selected' : ''}`} onClick={onToggle}>
      <MapIcon/>{t('details.view-graph')}
    </button>
  )
}

export default ShowMapButton;
