import classnames from 'classnames';
import React, { FC } from 'react';

import styles from './GaiaXButton.module.css';

interface IGaiaXButton {
  label: string;
  handleOnClick: () => void;
  className: string;
  disabled: boolean;
  children: React.ReactNode;
  type: string;
}

const GaiaXButton: FC<Readonly<IGaiaXButton>> = ({
  label,
  handleOnClick,
  className,
  disabled = false,
  children,
  type
}) => {
  const disabledStyle = disabled ? [styles.buttonDisabled] : []

  return (
    <button
      className={classnames([...disabledStyle, className, styles.button])}
      onClick={handleOnClick}
      disabled={disabled}
      type={type}
    >
      {!!label && label}
      {!!children && children}
    </button>
  );
}

export default GaiaXButton;
