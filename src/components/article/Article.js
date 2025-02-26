import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';

import { BodyText, H1Text, Padding } from '../../common/styles';
import DataPreview from '../discovery/tabs/dataPreview/DataPreview';

import './Article.css';

const Article = ({ category, headerMessage, t }) => {
  // eslint-disable-next-line no-unused-vars
  const [callFlag, setCallFlag] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
      <p>
        <BodyText textAlign='justify'>{t(`${headerMessage}-message-introduction-section`)}</BodyText>
      </p>
      <p>
        <BodyText textAlign='justify'>{t(`${headerMessage}-message-main-section`)}</BodyText>
      </p>
      <p>
        <BodyText textAlign='justify'>{t(`${headerMessage}-message-ending-section`)}</BodyText>
      </p>
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
