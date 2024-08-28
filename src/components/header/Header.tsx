import { FC } from 'react';

import Title from '../Title/Title';

import styles from './Header.module.css';

interface IHeader {
    title: string;
}

const Header: FC<IHeader> = ({ title }) => {
  return (
    <div className={styles['container']}>
      <header className={styles['header-container']}>
        <div className={styles['header-title']}>
          <Title>{title}</Title>
        </div>
      </header>
    </div>
  );
};

export default Header;
