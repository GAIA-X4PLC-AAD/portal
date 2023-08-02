import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../actions";

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';

import SignInBar from './SignInBar'

import './Header.css'
import * as S from './style';
import CenterBar from "./CenterBar";

import PropTypes from 'prop-types';
import { Row } from "../../common/styles";
import ReactTooltip from "react-tooltip";

function Header(props) {
    const { t, } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        navigate('/onboarding')
    };


    return (
        <>
            <S.TopMenu >
                <ReactTooltip />
                <S.TopMenuLogo data-tip={t('left-menu.tooltip.home')}>
                    <Link to="/">
                        <img src="/images/logo.svg" alt={t('left-menu.logo-alt-text')} height='60px' />
                     asdada   <img src="/images/logo_GXPLC.png" alt={t('left-menu.logo-alt-text')} height='142' className="header-gxplc-img"/>
                    </Link>
                </S.TopMenuLogo>
                <CenterBar  />
                {/*<Row>*/}
                {/*    <SignInBar handleSignOut={handleSignOut} handleSignIn={handleSignIn} handleRegister={handleRegister} />*/}
                {/*</Row>*/}

            </S.TopMenu>
        </>
    )
}

Header.propTypes = {
    type: PropTypes.string,
}

export default Header;
