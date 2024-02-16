import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {signIn, signOut} from "../../actions/index.js";
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import SignInBar from './SignInBar.js'

import * as S from './style.js';
import CenterBar from "./CenterBar.js";
import PropTypes from 'prop-types';
import {BlueButton, Row} from "../../common/styles.js";
import {AuthContext} from "../../context/AuthContextProvider.tsx";
import UserInfo from "../user/UserInfo.tsx";
import {Tooltip} from "react-tooltip";
function Header(props) {
    const { t, } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut())
        navigate('/')
    };

    const handleSignIn = () => {
        dispatch(signIn())
        navigate('/signin')
    };

    const handleRegister = () => {
        // dispatch(signIn())
        navigate('/onboarding')
    };

    const authContext = useContext(AuthContext);
    return (
        <>
            <S.SubMenu />
            <S.TopMenu >
                <S.TopMenuLogo data-tooltip-id="left-menu.tooltip.home"
                               data-tooltip-content={t('left-menu.tooltip.home')}>
                    <Link to="/">
                            <img src="/images/logos/plcaad.webp" alt={t('left-menu.logo-alt-text')} />
                    </Link>
                </S.TopMenuLogo>
                <Tooltip id="left-menu.tooltip.home" />
                <CenterBar  />
                <Row>
                    { !authContext.isAuthenticated &&
                        <S.HeaderButton $border="true" onClick={authContext.login} id="top-menu-signin">
                            {t('top-menu.signin')}
                        </S.HeaderButton>
                    }
                    { authContext.isAuthenticated && <UserInfo></UserInfo> }
                    {/*<SignInBar handleSignOut={handleSignOut} handleSignIn={handleSignIn} handleRegister={handleRegister} />*/}
                </Row>

            </S.TopMenu>
        </>
    )
}

Header.propTypes = {
    type: PropTypes.string,
}

export default Header;
