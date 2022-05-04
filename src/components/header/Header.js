import React from "react";
import { Link } from "react-router-dom";
import { signOut, signIn } from "../../actions";

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import SignInBar from './SignInBar'


function Header() {
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
          <SignInBar />
        </div>
      </div>
    </div>
  )

}

export default Header;
