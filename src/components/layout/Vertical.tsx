import { FC, ReactNode } from 'react';

import style from './Layout.module.css'

interface IContainer {
    children: ReactNode;
    visible?: boolean;
}

const Vertical: FC<IContainer> = ({ children, visible = true }) => {
  return (
    <div className={style.vertical}>
      {visible && children}
    </div>
  )
}

export default Vertical;
