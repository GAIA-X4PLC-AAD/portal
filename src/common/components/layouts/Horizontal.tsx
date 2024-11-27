import classnames from 'classnames';
import React, { FC, ReactNode } from 'react';

import style from './Layout.module.css'

interface IContainer {
    children: ReactNode;
    visible?: boolean;
    className?: string;
}

const Horizontal: FC<IContainer> = ({ children, className, visible = true }) => {

  if (visible) {
    return (
      <div className={classnames([className, style.horizontal])}>
        {children}
      </div>
    )
  }
  return <></>
}

export default Horizontal;
