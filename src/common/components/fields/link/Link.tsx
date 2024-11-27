import classnames from 'classnames';
import React, { FC } from 'react';

import styles from './Link.module.css';

interface ILink {
    url: string;
    label?: string;
    fontSize?: string;
    className?: string;
}

const Link: FC<ILink> = ({ className, url, label, fontSize }) => {
  return (
    <a
      className={classnames([className, styles.link])}
      href={url} target="_blank"
      style={fontSize ? { fontSize } : {}}
      rel="noreferrer"
    >
      {label ? label : url}
    </a>
  );
};

export default Link;
