import React from "react";
import { Link } from "react-router-dom";
import { signOut, signIn } from "../../actions";

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import SignInBar from './SignInBar'

import * as S from './style';
import CenterBar from "./CenterBar";

import PropTypes from 'prop-types';

function Header(props) {
    const { t, } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(signOut())
        navigate('/')
    };

    const handleSignIn = () => {
        // dispatch(signIn())
        navigate('/signin')
    };

    const handleRegister = () => {
        // dispatch(signIn())
        navigate('/register')
    };

    return (
        <>
            <S.TopMenu >
                <S.TopMenuLogo>
                    <Link to="/">
                        <img src="/images/logo.svg" alt={t('left-menu.logo-alt-text')} height='60px' />
                    </Link>
                </S.TopMenuLogo>
                <CenterBar />
                <S.TopMenuSignIn>
                    <SignInBar handleSignOut={handleSignOut} handleSignIn={handleSignIn} handleRegister={handleRegister} />
                </S.TopMenuSignIn>

            </S.TopMenu>
        </>
    )
}

Header.propTypes = {
    type: PropTypes.string,
    isInSignInMenu: PropTypes.bool,
}

export default Header;
