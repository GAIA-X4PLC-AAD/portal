import React from 'react';

import Subtitle from '../fields/subtitle/Subtitle';

import styles from './NoContent.module.css'

interface INoContent {
    message: string;
    visible: boolean;
}

const NoContent = ({ message, visible }: INoContent) => {
  if (!visible) {
    return <></>
  }

  return <div className={styles.container}>
    <Subtitle className={styles.text}>{message}</Subtitle></div>
}

export default NoContent;
