import { FC } from 'react';

import Title from '../../Title/Title';

import styles from './DetailsTitle.module.css';

interface IDetailsTitle {
    title: string;
}

const DetailsTitle: FC<IDetailsTitle> = ({ title }) => {
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

export default DetailsTitle;
