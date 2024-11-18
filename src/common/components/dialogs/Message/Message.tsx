import classnames from 'classnames';
import React, { FC } from 'react';

import styles from './Message.module.css'

interface ITitle {
  className?: string;
  children: React.ReactNode | string;
}

const Message: FC<ITitle> = ({ className, children }) => {
  return (
    <span className={classnames([className, styles.message])}>
      {children}
    </span>
  );
};

export default Message;
