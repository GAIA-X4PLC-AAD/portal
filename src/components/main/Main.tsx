import { FC, ReactNode } from 'react';

import styles from './Main.css'

interface IMain {
    children: ReactNode
}

const Main: FC<IMain> = ({ children }) => {
  return (
    <main className={styles.content}>
      {children}
    </main>
  )
}

export default Main;
