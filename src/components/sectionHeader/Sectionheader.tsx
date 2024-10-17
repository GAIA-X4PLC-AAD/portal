import React, { FC } from 'react';

import styles from './SectionHeader.module.css';

interface ISectionHeader {
    children: string;
}

const SectionHeader: FC<ISectionHeader> = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default SectionHeader;
