import React, { useState } from 'react';

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import * as S from './style';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BodyBoldText, BodyText, ButtonText, Circle, DropDownArrowUp, H4LightText, HorizontalLine, OutlineButton, Row } from '../../common/styles';

import { Menu, MenuItem, MenuButton, SubMenu, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Padding } from '../discovery/tabs/style';
import buildLanguageItemView from '../../common/language_item';



// USER AVATAR
function UserAvatarButton({ onClicked }) {
  const { t, i18n } = useTranslation();
  const _lang = i18n['language']

  const _isEn = _lang.indexOf('en') == 0
  const _isEs = _lang.indexOf('es') == 0

  const _userName = useSelector((state) => state.user.user.first_name)
  const navigate = useNavigate();

  // language modal
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const userButton = <Circle background='#ffffff' backgroundColor='#ffffff' borderColor='#E9E9E9'
    radius='41px'
    backgroundImage='/images/identicon.png' isButton borderThickness='1.36667px'>
    <ButtonText>{_userName.substring(0, 2)}</ButtonText>

  </Circle>

  return <Menu menuButton={userButton}>
    <MenuItem onClick={() => navigate('/admin/participant')}>{t('left-menu.user-info')}</MenuItem>
    <MenuItem onClick={onOpenModal} >
      {t('left-menu.change-language')}
    </MenuItem>
    <MenuDivider />
    <MenuItem onClick={onClicked}>{t('left-menu.logout')}</MenuItem>

    <Modal open={openModal} onClose={onCloseModal} center showCloseIcon={false}>
      <H4LightText>{t('left-menu.choose-language')}</H4LightText>
      <BodyText>{t('left-menu.select-system-language')}</BodyText>
      <HorizontalLine />

      <Padding vertical='20px' horizontal='40px'>
        {buildLanguageItemView({ background: _isEn ? '#46DAFF1F' : '#fff', name: 'English', code: 'en' })}
        {buildLanguageItemView({ background: _isEs ? '#46DAFF1F' : '#fff', name: 'Spanish', code: 'es' })}
        {/* {buildIdentifyServiceProvider({ background: '#fff', name: 'Deutsch', code: 'de' })} */}
        <Padding paddingTop='30px' />
        <Row><OutlineButton onClick={onCloseModal}>{t('left-menu.close')}</OutlineButton></Row>
      </Padding>
    </Modal>
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
        <UserAvatarButton onClicked={handleSignOut} />
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
