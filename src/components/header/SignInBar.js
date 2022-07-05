import React from 'react';

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import * as S from './style';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BodyBoldText, ButtonText, Circle, DropDownArrowUp, Row } from '../../common/styles';

import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';



// USER AVATAR
function UserAvatarButton({ onClicked }) {
  const { t, } = useTranslation();
  const _userName = useSelector((state) => state.user.user.first_name)
  const navigate = useNavigate();

  const userButton = <Circle background='#ffffff' backgroundColor='#ffffff' borderColor='#E9E9E9'
    radius='41px'
    backgroundImage='/images/identicon.png' isButton borderThickness='1.36667px'>
    <ButtonText>{_userName.substring(0, 2)}</ButtonText>

  </Circle>

  return <Menu menuButton={userButton}>
    <MenuItem onClick={onClicked}>{t('left-menu.user-info')}</MenuItem>
    <MenuItem onClick={onClicked}>{t('left-menu.logout')}</MenuItem>
  </Menu>
}

UserAvatarButton.propTypes = {
  onClicked: PropTypes.func,
}

// USER INFO
function UserInfoButton() {
  const _userName = useSelector((state) => state.user.user.first_name)
  const navigate = useNavigate();

  return <S.HeaderButton onClick={() => navigate("/account/user/details")}>{_userName}</S.HeaderButton>
}

function PprInfoButton() {
  const navigate = useNavigate();
  return <S.HeaderButton onClick={() => navigate("/account/provider/details")}>Provider</S.HeaderButton>
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
      <Row alignItems='center'>
        <UserAvatarButton onClicked={handleSignOut}/>
      </Row>
    </>;

  const signedOutButtons =
    <>
      <RegisterButton onClicked={handleRegister} />
      <SignInButton onClicked={handleSignIn} data-cy='dateInput' />
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
