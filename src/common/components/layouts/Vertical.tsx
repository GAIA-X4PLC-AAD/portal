import classnames from 'classnames';
import React, { FC, ReactNode } from 'react';

import style from './Layout.module.css'

interface IContainer {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

const Vertical: FC<IContainer> = ({ children, className = '', visible = true }) => {
  return (
    <div className={classnames([className, style.vertical])}>
      {visible && children}
    </div>
  )
}

export default Vertical;
