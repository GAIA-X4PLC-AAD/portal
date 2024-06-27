import { FC } from 'react';

import styles from './GaiaXButton.module.css';

interface IGaiaXButton {
  label: string;
  handleOnClick: () => void;
  width?: string;
}

const GaiaXButton: FC<Readonly<IGaiaXButton>> = ({
  label,
  handleOnClick,
  width,
}) => {
  return (
    <button className={styles.button} onClick={handleOnClick} style={width ? { width } : {}}>
      {label}
    </button>
  );
}

export default GaiaXButton;
