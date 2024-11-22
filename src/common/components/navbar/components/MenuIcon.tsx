import HamburgerIcon from '@mui/icons-material/Menu';
import React, { FC, useContext } from 'react'

import { AuthContext } from '../../../../context/AuthContextProvider';

import styles from './MenuIcon.module.css';

interface MenuIconProps {
  onClick: () => void;
}

const MenuIcon: FC<MenuIconProps> = ({ onClick }) => {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated) {
    return <></>
  }

  return (
    <div
      className={styles.menuIcon}
      onClick={onClick}
    >
      <HamburgerIcon style={{ fill: 'gainsboro' }}/>
    </div>
  )
}

export default MenuIcon;
