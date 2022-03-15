import React from "react";
import { withTranslation } from "react-i18next";
import Search from "./Search";
import Article from "./components/Article";

const Home = ({t}) => {
    return (
        <div className="home">
            <div className="home-header">
                <h1>{t('home.welcome.title')}</h1>
                <h2>{t('home.welcome.subtitle')}</h2>
            </div>
            <div className="home-search"> <Search/></div>
            <div className="home-article">
                <Article headerMessage="article.what-is-new" category="NEWS"/>
            </div>
            <div className="home-article">
                <Article headerMessage="article.what-is-gaiax" category="ARTICLE"/>
            </div>
        </div>
    );
}

export default withTranslation () (Home);