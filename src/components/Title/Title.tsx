import { FC } from 'react';

import styles from './Title.module.css';

interface ITitle {
  children: string;
}

const Title: FC<ITitle> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default Title;
