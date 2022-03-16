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
                        <img src={article.previewImagePath} alt={`image for ${article.title}`}/>
                    </div>
                    <div className="article-headline"> 
                        <img src={article.logoPath} alt={`image for ${article.title}`}/>
                        <h3>{article.title}</h3>
                        {article.url}
                    </div>
                    <div className="article-text">
                            {article.teaserText}
                    </div>
                    <button 
                        className="article-detail-button"
                        type="button" 
                        onClick={()=>{openLink(article.url)}}>
                        {t("article.details-button")}
                    </button>
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
