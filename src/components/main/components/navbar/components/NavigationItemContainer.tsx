import classnames from 'classnames';
import React, { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LoginButton from '../../../../../common/components/buttons/LoginButton';
import LanguageSelectionModal
  from '../../../../../common/components/dialogs/LanguageSelectionDialog/LanguageSelectionDialog';
import { AuthContext } from '../../../../context/AuthContextProvider';
import { NavbarAsset } from '../helpers/types';

import NavbarItem from './NavbarItem';
import styles from './NavigationItemContainer.module.css'

interface NavbarItemListProps {
  navbarAssets: NavbarAsset[];
  visible: boolean;
  onHide: () => void;
}

const NavigationItemContainer: FC<NavbarItemListProps> = ({ navbarAssets, visible, onHide }) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  if (!authContext.isAuthenticated) {
    return <></>
  }

  return (
    <>
      <ul className={classnames([styles.navigationItemContainer, visible ? '' : styles.hidden])}>
        {
          navbarAssets.map((asset) => (
            <NavbarItem
              key={asset.name}
              name={asset.name}
              path={asset.path}
              onClick={onHide}
            />
          ))
        }

        <NavbarItem
          key={'left-menu.choose-language'}
          name={t('left-menu.choose-language')}
          onClick={() => {
            onHide();
            setIsLanguageModalOpen(true);
          }}
        />

        <LoginButton className={styles.login}/>
      </ul>

      <LanguageSelectionModal
        isOpen={isLanguageModalOpen}
        close={() => setIsLanguageModalOpen(false)}
      />
    </>
  )
}

export default NavigationItemContainer;
