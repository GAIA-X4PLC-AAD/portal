import classNames from 'classnames';
import Markdown from 'markdown-to-jsx'
import React from 'react';

import styles from './GMarkdown.module.css';

type GMarkdownProps = {
    children: React.ReactNode,
    isCard?: boolean,
    height?: number;
}
const GMarkdown: React.FC<GMarkdownProps> = ({ isCard, height, children }) => {
  const cardClass = isCard ? styles.card : '';
  const inlineStyles = isCard && height ? { maxHeight: height } : {};
  return <div className={classNames(styles.gmarkdown, cardClass)} style={inlineStyles}><Markdown>{ children }</Markdown></div>
}

export default GMarkdown;
