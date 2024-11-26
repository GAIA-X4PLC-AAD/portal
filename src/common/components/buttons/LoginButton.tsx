import classnames from 'classnames';
import GaiaXButton from 'common/components/buttons/GaiaXButton';
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../components/context/AuthContextProvider';

import styles from './LoginButton.module.css'

interface LoginButtonProps {
  className?: string;
}

const LoginButton: FC<LoginButtonProps> = ({ className }) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  if (authContext.isAuthenticated) {
    return <GaiaXButton
      className={classnames([className, styles.loginButton])}
      label={t('top-menu.signout')}
      handleOnClick={authContext.logout}
    />
  }

  return <GaiaXButton
    className={classnames([styles.loginButton])}
    label={t('top-menu.signin')}
    handleOnClick={authContext.login}
  />
}

export default LoginButton;
