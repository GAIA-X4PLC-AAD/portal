import React from "react";
import { withTranslation } from "react-i18next";
import Search from "./Search";

const Home = ({t}) => {
    return (
        <div className="home">
            <div className="home-header">
                <h1>{t('home.welcome.title')}</h1>
                <h2>{t('home.welcome.subtitle')}</h2>
            </div>
            <div className="home-search"> <Search/></div>
            <div className="home-article">TODO: put here what's new</div>
            <div className="home-article">TODO: put here what is Gaia-X</div>
        </div>
    );
}

export default withTranslation () (Home);