import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './NavbarItem.module.css';

interface NavbarItemProps {
  name: string,
  onClick: () => void,
  path?: string,
}

const NavbarItem: FC<NavbarItemProps> = ({ name, path, onClick }) => {
  const navigate = useNavigate();

  if (!path) {
    return (
      <li onClick={onClick}>
        <div className={styles.navigationItem}>
          {name}
        </div>
      </li>
    )
  }

  return (
    <li onClick={() => {
      onClick();
      navigate(path);
    }}>
      <NavLink
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          isActive
            ? `${styles.navigationItem} ${styles.active}`
            : styles.navigationItem
        }
      >
        {name}
      </NavLink>
    </li>
  )
}

export default NavbarItem;
