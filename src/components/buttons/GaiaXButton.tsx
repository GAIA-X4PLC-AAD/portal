import React, { FC } from 'react';

import styles from './GaiaXButton.module.css';

interface IGaiaXButton {
  label: string;
  handleOnClick: () => void;
}

const GaiaXButton: FC<Readonly<IGaiaXButton>> = ({
  label,
  handleOnClick,
}) => {
  return (
    <button className={styles.button} onClick={handleOnClick}>
      {label}
    </button>
  );
}

export default GaiaXButton;
