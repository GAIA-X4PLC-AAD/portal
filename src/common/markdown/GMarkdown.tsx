import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';
import React, { useEffect, useRef, useState } from 'react';

import styles from './GMarkdown.module.css';

type GMarkdownProps = {
    children: React.ReactNode;
    isCard?: boolean;
    maxContentHeight?: number;
};

const GMarkdown: React.FC<GMarkdownProps> = ({ isCard, maxContentHeight = 300, children }) => {
  const [isHigher, setIsHigher] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setIsHigher(contentHeight > maxContentHeight); // Adjust height as needed
      setContentHeight(contentHeight);
    }
  }, [children]);

  const cardClass = isCard ? styles.card : '';
  const inlineStyles = isCard && maxContentHeight ? { maxHeight: maxContentHeight } : {};

  return (
    <>
      <div className={classNames(styles.gmarkdown, cardClass)} style={inlineStyles}>
        <div ref={contentRef}>
          <Markdown>{children}</Markdown>
        </div>
      </div>
      {isCard && isHigher && <div className={styles.ellipsis}>...</div>}
    </>
  );
};

export default GMarkdown;
