import React from "react";
import { useEffect, useState } from "react";
import configData from "../../config/config.json";
import axios from "axios";
import './Article.css';
import { withTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import DataPreview from "../discovery/tabs/dataPreview/DataPreview";

const Article = ({category, headerMessage,t}) => {
    const [callFlag, setCallFlag] = useState(false); 
    const [articles, setArticles] = useState([]);

    function openLink  (url)  {
        window.open(url, '_blank').focus();
    }
    const getUrl= (url) => {
        return (<a href={url} target="_blank" rel="noreferrer">{url}</a>);
    }

    useEffect(()=> {
        const callGetArticleAPI = async () => {
            
            const {data} = await axios.get(process.env.REACT_APP_EDGE_API_URI+'/api/articles/filter',{
                params: {category: category}
            });        

            setCallFlag(true);
            setArticles(data);

        };
        // only tries to load articles the first time
        if (!callFlag) {
            callGetArticleAPI();
        }
    },[articles,callFlag]);
    
    // get first 3 rows
    const renderArticles = articles.filter((v,i)=> {return i<3}).map((article)=> { 
        let parsed = {
            headline: article.title,
            img_preview_url: article.previewImagePath,
            img_logo_url: article.logoPath,
            subline: getUrl(article.url),
            description: article.teaserText,
            onDetailsClick: () => { openLink(article.url) }
          }
        
        return ( 
            <DataPreview data={parsed} key={`article_${article.title}`} margin="12px;"/>
        );
    });

    return (
        <div className="articles-layout">
            <div className="article-header-message">
                
                <h2>{t(headerMessage)}</h2>
            </div>
            <div className="article-header-message">
                <p>{t(`${headerMessage}-message`)}</p>
            </div>

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
