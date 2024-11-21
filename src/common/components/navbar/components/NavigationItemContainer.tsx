import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LanguageSelectionModal from '../../dialogs/LanguageSelectionDialog/LanguageSelectionDialog';
import { NavbarAsset } from '../helpers/types';

import NavbarItem from './NavbarItem';
import styles from './NavigationItemContainer.module.css'

interface NavbarItemListProps {
  navbarAssets: NavbarAsset[];
  visible: boolean;
}

const NavigationItemContainer: FC<NavbarItemListProps> = ({ navbarAssets, visible }) => {
  const { t } = useTranslation();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  if (!visible) {
    return <></>
  }

  return (
    <>
      <ul className={styles.navigationItems}>
        {
          navbarAssets.map((asset) => (
            <NavbarItem key={asset.name} name={asset.name} path={asset.path}/>
          ))
        }

        <NavbarItem
          key={'left-menu.choose-language'}
          name={t('left-menu.choose-language')}
          onClick={() => setIsLanguageModalOpen(true)}
        />
      </ul>

      <LanguageSelectionModal
        isOpen={isLanguageModalOpen}
        close={() => setIsLanguageModalOpen(false)}
      />
    </>
  )
}

export default NavigationItemContainer;
