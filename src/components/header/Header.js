import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {signIn, signOut} from "../../actions";
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import SignInBar from './SignInBar'

import * as S from './style';
import CenterBar from "./CenterBar";
import PropTypes from 'prop-types';
import {BlueButton, Row} from "../../common/styles";
import ReactTooltip from "react-tooltip";
import {AuthContext} from "../../context/AuthContextProvider";
import UserInfo from "../user/UserInfo";
import {Gaiax4FutureMobilityLogo} from "./style";
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
                <ReactTooltip />
                <S.TopMenuLogo data-tip={t('left-menu.tooltip.home')}>
                    <Link to="/">
                            <Gaiax4FutureMobilityLogo src="/images/logos/Gaia_X_4_future_mobility.jpg" alt={t('left-menu.logo-alt-text')} />
                    </Link>
                </S.TopMenuLogo>
                <CenterBar  />
                <Row>
                    { !authContext.isAuthenticated &&
                        <S.HeaderButton border={true} onClick={authContext.login} id="top-menu-signin">
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
