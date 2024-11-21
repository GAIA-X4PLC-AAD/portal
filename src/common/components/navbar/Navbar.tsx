import { AuthContext } from 'context/AuthContextProvider';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import LoginButton from '../buttons/LoginButton';

import GaiaXLogo from './components/GaiaXLogo';
import NavbarContainer from './components/NavbarContainer';
import NavigationItemContainer from './components/NavigationItemContainer';
import { NavbarAsset } from './helpers/types';

export default function Navbar() {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
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
      path: '/about',
      name: t('left-menu.about'),
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
  ] as NavbarAsset[]

  return (
    <NavbarContainer>
      <GaiaXLogo/>
      <NavigationItemContainer visible={authContext.isAuthenticated} navbarAssets={navbarAssets}/>
      <LoginButton authContext={authContext}/>
    </NavbarContainer>
  );
}
