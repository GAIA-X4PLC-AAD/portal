import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useTranslation, withTranslation } from "react-i18next";
import Search from "./Search";
import Article from "./components/Article";

import PropTypes from 'prop-types';

const Home = ({ t }) => {

    const isInSignInMenu = useSelector((state) => state.signin.isInSignInMenu)

    return (
        <div className="home">
            <div className='banner-container' hidden={isInSignInMenu}>
                <div className='banner-content'>
                    <div className='banner-logo'>
                        <img src='/images/logo_white.svg' height='80px' width='200px'></img>
                    </div>
                    <h1>{t('article.what-is-new')}</h1>
                    <h4>{t('filler')}</h4>
                    <div className='banner-slider'>
                    </div>
                </div>
            </div>
            <div className='search-container' hidden={isInSignInMenu}>
                <div>
                    <Search />
                </div>
            </div>
            <div className="home-article">
                <Article headerMessage="article.what-is-new" category="NEWS" />
            </div>
            <div className="home-article">
                <Article headerMessage="article.what-is-gaiax" category="ARTICLE" />
            </div>
        </div>
    );
}

Home.propTypes = {
    t: PropTypes.func,
}

export default withTranslation()(Home);
