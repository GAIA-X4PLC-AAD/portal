import Text from 'components/Text/Text';
import Title from 'components/Title/Title';
import React, { FC, FunctionComponent } from 'react';

import styles from './HeaderWithImage.module.css';

interface IHeaderWithImage {
  title: string;
  content: string;
  Image: FunctionComponent;
}

const  HeaderWithImage: FC<IHeaderWithImage> = ({ title, content, Image }: Readonly<IHeaderWithImage>) => {
  return (
    <div className={styles['header-container']}>
      <div className={styles['header-image']}>
        <Image />
      </div>
      <div className={styles['header-content']}>
        <Title>{title}</Title>
        <Text>{content}</Text>
      </div>
    </div>
  );
}

export default HeaderWithImage;
