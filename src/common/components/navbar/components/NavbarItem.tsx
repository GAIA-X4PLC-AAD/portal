import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavbarItem.module.css';

type NavbarItemProps = |
  {
    name: string
    path: string;
  } |
  {
    name: string
    onClick: () => void;
  }

const NavbarItem: FC<NavbarItemProps> = (props) => {
  if ('onClick' in props) {
    return (
      <li className={styles.navigationItem} onClick={props.onClick}>
        {props.name}
      </li>
    )
  }

  return (
    <li className={styles.navigationItem}>
      <NavLink
        to={props.path}
        className={({ isActive }) =>
          isActive
            ? `${styles.navigationItem} ${styles.active}`
            : styles.navigationItem
        }
      >
        {props.name}
      </NavLink>
    </li>
  )
}

export default NavbarItem;
