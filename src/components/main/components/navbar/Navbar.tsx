/* test coverage not required */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoginButton from '../../../../common/components/buttons/LoginButton';

import styles from './Navbar.module.css';
import GaiaXLogo from './components/GaiaXLogo';
import MenuIcon from './components/MenuIcon';
import NavbarContainer from './components/NavbarContainer';
import NavigationItemContainer from './components/NavigationItemContainer';
import { NavbarAsset } from './helpers/types';

export default function Navbar() {
  const { t } = useTranslation();
  const navbarAssets = [
    {
      path: '/service-offerings',
      name: t('service-offerings.title'),
    },
    {
      path: '/participants',
      name: t('left-menu.tooltip.participants'),
    },
    {
      path: '/resources',
      name: t('left-menu.tooltip.resources'),
    },
    {
      path: '/ontologies',
      name: t('ontologies.titles'),
    },
    {
      path: '/shapes',
      name: t('shapes.titles'),
    },
    {
      path: '/support',
      name: t('left-menu.support'),
    },
    {
      path: '/about',
      name: t('left-menu.about'),
    },
  ] as NavbarAsset[]
  const [dropdownMenuVisible, setDropdownMenuVisible] = useState(false);

  return (
    <NavbarContainer>
      <GaiaXLogo/>
      <MenuIcon onClick={() => setDropdownMenuVisible(!dropdownMenuVisible)}/>
      <NavigationItemContainer
        visible={dropdownMenuVisible}
        onHide={() => setDropdownMenuVisible(false)}
        navbarAssets={navbarAssets}/>
      <LoginButton className={styles.login}/>
    </NavbarContainer>
  );
}
