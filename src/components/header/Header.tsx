import React, { FC } from 'react';

import Title from '../Title/Title';

import styles from './Header.module.css';

interface IHeader {
    title: string;
  visible?: boolean;
}

const Header: FC<IHeader> = ({ title, visible = true }) => {
  if (!visible) {
    return <></>
  }
  return (
    <header className={styles['header-container']}>
      <div className={styles['header-title']}>
        <Title>{title}</Title>
      </div>
    </header>
  );
};

export default Header;
