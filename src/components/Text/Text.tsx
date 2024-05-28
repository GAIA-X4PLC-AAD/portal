import { FC } from 'react';

import styles from './Text.module.css';

interface IText {
  children: string;
}

const Text: FC<IText> = ({ children }) => {
  return <p className={styles.text}>{children}</p>;
};

export default Text;
