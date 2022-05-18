import React from 'react';

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import * as S from './style';

import PropTypes from 'prop-types';

//
// each function component is independent, isolated and testable.
// state is managed inside the component itself
//

// USER INFO
function UserInfoButton() {
  const _userName = useSelector((state) => state.user.user.first_name)

  return <S.HeaderButton onClick={() => { }}>{_userName}</S.HeaderButton>
}

// SIGNOUT
const SignOutButton = ({ onClicked }) => {
  const { t, } = useTranslation();
  return <S.HeaderButton onClick={onClicked} id="top-menu-signout">{t('top-menu.signout')}</S.HeaderButton>
};

SignOutButton.propTypes = {
  onClicked: PropTypes.func,
}

// SIGNIN
const SignInButton = ({ onClicked }) => {
  const { t, } = useTranslation();
  return <S.HeaderButton onClick={onClicked} id="top-menu-signin">{t('top-menu.signin')}</S.HeaderButton>
}

SignInButton.propTypes = {
  onClicked: PropTypes.func,
}

// REGISTER
const RegisterButton = ({ onClicked }) => {
  const { t, } = useTranslation();
  return <S.HeaderButton onClick={onClicked} id="top-menu-register">{t('top-menu.register')}</S.HeaderButton>
}

RegisterButton.propTypes = {
  onClicked: PropTypes.func,
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
      <SignInButton onClicked={handleSignIn} data-cy='dateInput'/>
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

SignInBar.propTypes = {
  handleSignIn: PropTypes.func,
  handleSignOut: PropTypes.func,
  handleRegister: PropTypes.func,
}

export default SignInBar
