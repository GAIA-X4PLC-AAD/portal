import MarkdownToJSX from 'markdown-to-jsx';
import React, { useEffect, useRef, useState } from 'react';
import './Markdown.css'

type MarkdownProps = {
  children: string;
};

const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        setIsTruncated(contentRef.current.scrollHeight > contentRef.current.clientHeight + 1);
      }
    }

    checkTruncation();

  }, [children]);

  return (
    <>
      <div ref={contentRef} className='markdown'>
        <MarkdownToJSX>{children}</MarkdownToJSX>
      </div>
      {isTruncated && <div className='ellipsis'>...</div>}
    </>
  );
};

export default Markdown;
