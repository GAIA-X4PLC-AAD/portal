import React, { FC, ReactNode } from 'react';

import style from './Layout.module.css'

interface IMain {
    children: ReactNode
}

const Main: FC<IMain> = ({ children }) => {
  return (
    <main className={style.main}>
      {children}
    </main>
  )
}

export default Main;
