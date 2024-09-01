import { FC, ReactNode } from 'react';

import style from './Layout.module.css'

interface IContainer {
    children: ReactNode;
    visible?: boolean;
}

const Horizontal: FC<IContainer> = ({ children, visible = true }) => {

  if (visible) {
    return (
      <div className={style.horizontal}>
        {children}
      </div>
    )
  }
  return <></>
}

export default Horizontal;
