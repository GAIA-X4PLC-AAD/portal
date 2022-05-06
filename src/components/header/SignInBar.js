import React from 'react';

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import * as S from './style';

//
// each function component is independent, isolated and testable.
// state is managed inside the component itself
//

// USER INFO
function UserInfoButton() {
  const _userName = useSelector((state) => state.user.user.first_name)

  return <S.HeaderButton onClick={() => { }}>{_userName}</S.HeaderButton>
};

// SIGNOUT
const SignOutButton = ({ onClicked }) => {
  const { t, } = useTranslation();
  return <S.HeaderButton onClick={onClicked}>{t('top-menu.signout')}</S.HeaderButton>
};

// SIGNIN
const SignInButton = ({ onClicked }) => {
  const { t, } = useTranslation();
  return <S.HeaderButton onClick={onClicked}>{t('top-menu.signin')}</S.HeaderButton>
}

// REGISTER
const RegisterButton = ({ onClicked }) => {
  const { t, } = useTranslation();
  return <S.HeaderButton onClick={onClicked}>{t('top-menu.register')}</S.HeaderButton>
}

const SignInBar = ({ handleSignIn, handleSignOut, handleRegister }) => {
  const isUserSignedIn = useSelector((state) => state.user.isUserSignedIn)
  const isInSignInMenu = useSelector((state) => state.signin.isInSignInMenu)

  const signedInButtons =
    <>
      <UserInfoButton />
      <SignOutButton onClicked={handleSignOut} />
    </>;

  const signedOutButtons =
    <>
      <RegisterButton onClicked={handleRegister} />
      <SignInButton onClicked={handleSignIn} />
    </>;

  if (isInSignInMenu) { return (<></>); }
  else {
    return (
      <>
        {isUserSignedIn ? signedInButtons : signedOutButtons}
      </>
    )
  }

}

export default SignInBar
