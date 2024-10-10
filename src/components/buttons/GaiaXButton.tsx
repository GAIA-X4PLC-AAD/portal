import classnames from 'classnames';
import React, { FC } from 'react';

import styles from './GaiaXButton.module.css';

interface IGaiaXButton {
  label: string;
  handleOnClick: () => void;
  className: string;
  disabled: boolean;
  children: React.ReactNode;
}

const GaiaXButton: FC<Readonly<IGaiaXButton>> = ({
  label,
  handleOnClick,
  className,
  disabled = false,
  children,
}) => {
  const disabledStyle = disabled ? [styles.buttonDisabled] : []

  return (
    <button
      className={classnames([className, styles.button, ...disabledStyle])}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {!!label && label}
      {!!children && children}
    </button>
  );
}

export default GaiaXButton;
