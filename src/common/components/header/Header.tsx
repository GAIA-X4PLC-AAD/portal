import {FC} from 'react';

import Title from '../fields/title/Title';

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
      <div className={styles['header-content']}>
        <Title className={styles['header-breadcrumb']}>{title}</Title>
      </div>
    </header>
  );
};

export default Header;
