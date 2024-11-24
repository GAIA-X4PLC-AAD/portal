import Icon from '@mui/icons-material/Menu';
import React, { FC, useContext } from 'react'

import { AuthContext } from '../../../../index/context/AuthContextProvider';

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
      <Icon style={{ fill: 'gainsboro' }}/>
    </div>
  )
}

export default MenuIcon;
