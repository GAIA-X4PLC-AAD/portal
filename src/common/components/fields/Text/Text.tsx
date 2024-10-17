import classnames from 'classnames';
import React, { FC } from 'react';

import styles from './Text.module.css';

interface IText {
  className: string;
  visible: boolean;
  children: string;
}

const Text: FC<IText> = ({ className, visible = true, children }) => {
  if (!visible) {
    return <></>
  }
  return <p className={classnames([className, styles.text])}>{children}</p>;
};

export default Text;
