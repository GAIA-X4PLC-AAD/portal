import React from "react";
import { withTranslation } from "react-i18next";
import Search from "./Search";
import Article from "./components/Article";

import PropTypes from 'prop-types';

const Home = ({t}) => {
    return (
        <div className="home">
            <div className="home-article">
                <Article headerMessage="article.what-is-new" category="NEWS"/>
            </div>
            <div className="home-article">
                <Article headerMessage="article.what-is-gaiax" category="ARTICLE"/>
            </div>
        </div>
    );
}

Home.propTypes = {
    t: PropTypes.func,
}

export default withTranslation () (Home);
