import classnames from 'classnames';
import React, { FC } from 'react';

import styles from './GaiaXButton.module.css';

interface IGaiaXButton {
  label: string;
  disabled?: boolean;
  type?: string;
  children?: React.ReactNode;
  className?: string;
  handleOnClick?: () => void;
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
