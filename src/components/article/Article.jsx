import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import './Article.css';
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import DataPreview from "../discovery/tabs/dataPreview/DataPreview";
import { Padding, H1Text, BodyText } from "../../common/styles";

const Article = ({ category, headerMessage, t }) => {
    const [callFlag, setCallFlag] = useState(false);
    const [articles, setArticles] = useState([]);

    function openLink(url) {
        window.open(url, '_blank').focus();
    }
    const getUrl = (url) => {
        return (<a href={url} target="_blank" rel="noreferrer">{url}</a>);
    }

    // useEffect(() => {
    //     const callGetArticleAPI = async () => {
    //
    //         const { data } = await axios.get(process.env.REACT_APP_EDGE_API_URI + '/articles/filter', {
    //             params: { category: category }
    //         });
    //
    //         setCallFlag(true);
    //         setArticles(data);
    //
    //     };
    //     // only tries to load articles the first time
    //     if (!callFlag) {
    //         callGetArticleAPI();
    //     }
    // }, [articles, callFlag]);

    // get first 3 rows
    const renderArticles = articles.filter((v, i) => { return i < 3 }).map((article) => {
        let parsed = {
            headline: article.title,
            img_preview_url: article.previewImagePath,
            img_logo_url: article.logoPath,
            subline: getUrl(article.url),
            description: article.teaserText,
            onDetailsClick: () => { openLink(article.url) }
        }

        return (
            <DataPreview
            data={parsed}
            width="278px"
            key={`article_${article.title}`}
            shouldShowDetailsButton={false}
                margin="0px" marginRight='24px' displayLogo={false} />
        );
    });

    return (
        <div className="articles-layout">
            <H1Text>{t(headerMessage)}</H1Text>
            <Padding key='i01' paddingTop='20px' />
            <BodyText textAlign='justify'>{t(`${headerMessage}-message`)}</BodyText>

            <div className="articles-panel-layout">
                {renderArticles}
            </div>
        </div>
    );
}


Article.propTypes = {
    category: PropTypes.string,
    headerMessage: PropTypes.string,
    t: PropTypes.func,
}

export default withTranslation()(Article);
