import GaiaXButton from 'common/components/buttons/GaiaXButton';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContextType } from '../../../context/AuthContextProvider';

interface LoginButtonProps {
  authContext: AuthContextType;
}

const LoginButton: FC<LoginButtonProps> = ({ authContext }) => {
  const { t } = useTranslation();

  if (authContext.isAuthenticated) {
    return <GaiaXButton
      label={t('top-menu.signout')}
      handleOnClick={authContext.logout}
    />
  }

  return <GaiaXButton
    label={t('top-menu.signin')}
    handleOnClick={authContext.login}
  />
}

export default LoginButton;
