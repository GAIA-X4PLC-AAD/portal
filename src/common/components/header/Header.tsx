import {FC} from 'react';

import { Breadcrumb, IBreadcrumb } from '../breadcrumb/Breadcrumb';
import Title from '../fields/title/Title';

import styles from './Header.module.css';

interface IHeader {
    title?: string;
    visible?: boolean;
    breadcrumbs?: IBreadcrumb[];
}

const Header: FC<IHeader> = ({ title, visible = true, breadcrumbs }) => {
  if (!visible) {
    return <></>
  }
  return (
    <header className={styles['header-container']}>
      <div className={styles['header-content']}>
        {title && <Title className={styles['header-breadcrumb']}>{title}</Title>}
        {breadcrumbs && <Breadcrumb breadcrumbs={breadcrumbs}/>}
      </div>
    </header>
  );
};

export default Header;
