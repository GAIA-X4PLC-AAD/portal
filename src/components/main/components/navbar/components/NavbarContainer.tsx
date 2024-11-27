import React, { FC } from 'react';

import styles from './NavbarContainer.module.css';

interface NavbarContainerProps {
  children: React.ReactNode;
}

const NavbarContainer: FC<NavbarContainerProps> = ({ children }) => (
  <nav className={styles.navbar}>
    <div className={styles.navbarContainer}>
      {children}
    </div>
  </nav>
)

export default NavbarContainer;
