import React from "react";
import { useEffect, useState } from "react";
import configData from "../config/config.json";
import axios from "axios";
import './Article.css';
import { withTranslation } from "react-i18next";




const Article = ({category, headerMessage,t}) => {
    const [callFlag, setCallFlag] = useState(false); 
    const [articles, setArticles] = useState([]);

    function openLink  (url)  {
        window.open(url, '_blank').focus();
    }

    useEffect(()=> {
        const callGetArticleAPI = async () => {
            
            const {data} = await axios.get(configData.ARTICLE_API_URI+'/articles/filter',{
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
        return ( 
            <div className="article-item-layout" key={article.title} >
                <div className="article-item-inside">
                    <div className="article-preview-image"> 
                        <i src={article.previewImagePath} alt={`image for ${article.title}`}/>
                    </div>
                    <div className="article-logo"> 
                        <i src={article.logoPath} alt={`image for ${article.title}`}/>
                    </div>
                    
                    <div className="article-title">
                        <h1>{article.title}</h1>
                    </div>
                    <div className="article-text">
                            {article.teaserText}
                    </div>
                    <div className="article-detail-button" onClick={()=>{openLink(article.url)}}>
                        {t("article.details-button")}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="articles-layout">
            <div className="article-header-message">
                <h2>{t(headerMessage)}</h2>
            </div>
                <div className="articles-panel-layout"> 
                        {renderArticles}
                </div>        
        </div>
        );
}
export default withTranslation()(Article);