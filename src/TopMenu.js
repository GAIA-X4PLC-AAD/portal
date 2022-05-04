import React from "react";
import { Link } from "react-router-dom";
import { signOut, signIn } from "./actions";

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

//
// each function component is independent, isolated and testable.
// state is managed inside the component itself
//

// USER INFO
function UserInfoButton() {
  const _userName = useSelector((state) => state.user.name)

  return <button onClick={() => {}}>{_userName ?? 'AB'}</button>
};

// SIGNOUT
function SignOutButton() {
  const { t, } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  return <button onClick={() => {
    dispatch(signOut())
    navigate('/')
  }}>{t('top-menu.signout')}</button>
}

function LoggedInUserButtons() {

  return <>
    <UserInfoButton />
    <SignOutButton />
  </>
}

// SIGNIN
function SignInButton() {
  const navigate = useNavigate();
  const { t, } = useTranslation();
  const dispatch = useDispatch()

  return <button onClick={() => {
    dispatch(signIn())
    navigate('/signin')
  }}>{t('top-menu.signin')}</button>
}

// REGISTER
function RegisterButton() {
  const navigate = useNavigate();
  const { t, } = useTranslation();
  const dispatch = useDispatch()

  return <button onClick={() => {
    dispatch(signIn())
    navigate('/register')
  }}>{t('top-menu.register')}</button>
}

function LoggedOutUserButtons() {
  return <>
    <RegisterButton />
    <SignInButton />
  </>
}


function TopBarButtons() {
  const isUserSignedIn = useSelector((state) => state.user.isUserSignedIn)

  return (<>
    {isUserSignedIn ? LoggedInUserButtons() : LoggedOutUserButtons()}
  </>)
}


function TopMenu() {
  const { t, } = useTranslation();

  return (
    <div className='top-menu-container'>
      <div className='top-menu'>
        <div className='top-menu-logo'>
          <Link to="/">
            <img src="images/logo.svg" alt={t('left-menu.logo-alt-text')} height='60px' />
          </Link>
        </div>
        <div className='top-menu-links'>
          <Link to="/services"> {t('left-menu.services')}</Link>
          <Link to="/data"> {t('left-menu.data')}</Link>
          <Link to="/provider"> {t('left-menu.provider')}</Link>
        </div>
        <div className='top-menu-signin'>
          <TopBarButtons />
        </div>
      </div>
    </div>
  )

}

export default TopMenu
