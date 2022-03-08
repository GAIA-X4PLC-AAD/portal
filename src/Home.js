import React from "react";
import { withTranslation } from "react-i18next";

const Home = ({t}) => {
    return (
        <div className="home">
            <div className="header">
                <h1>{t('home.welcome.title')}</h1>
                <h2>{t('home.welcome.subtitle')}</h2>
            </div>
            <div className="search"> TODO: Here goes Search component</div>
            

        </div>
    );
}

export default withTranslation () (Home);