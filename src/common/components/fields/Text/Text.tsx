import classnames from 'classnames';
import React, { FC, ReactElement } from 'react';

import styles from './Text.module.css';

interface IText {
  className?: string;
  visible?: boolean;
  children?: ReactElement | string;
}

const Text: FC<IText> = ({ className, visible = true, children }) => {
  if (!visible || !children) {
    return <></>
  }
  if (typeof children === 'string') {
    return <p className={classnames([className, styles.text])}>{children}</p>;
  }
  return <>{children}</>
};

export default Text;
