import React from 'react'

import styles from './Subtitle.module.css';

interface ISubtitle {
  children: string;
}

export default function Subtitle({ children }: Readonly<ISubtitle>) {
  return <h2 className={styles.subtitle}>{children}</h2>;
}
