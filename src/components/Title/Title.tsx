import { FC } from 'react';

import styles from './Title.module.css';

interface ITitle {
  children: string;
}

const Title: FC<ITitle> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default Title;
