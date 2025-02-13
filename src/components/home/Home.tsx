import Text from '../../common/components/fields/text/Text';
import Title from '../../common/components/fields/title/Title';
import {AuthContext} from '../context/AuthContextProvider';
import HeaderWithImage from './components/HeaderWithImage/HeaderWithImage';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';

import {ReactComponent as HeaderImage} from '../../assets/images/header_image.svg';

import styles from './Home.module.css';

export default function Home() {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const guidelines = t('article.how-to-start-guidelines');

  return (
    <div className={styles['home-container']}>
      <HeaderWithImage
        title={t('home.header.title')}
        content={t('home.marketplace_text')}
        Image={HeaderImage}
      />
      {authContext.isAuthenticated ? (
        <div className={styles['home-content']}>
          <Title className={styles.homeTitle}>{t('article.how-to-start')}</Title>
          {Object.values(guidelines).map((guideline, index) => {
            return <Text
              key={index}
              className={styles.homeText}
            >
              {`→ ${guideline}`}
            </Text>;
          })}
        </div>
      ) : (
        <div className={styles['home-content']}>
          <Title className={styles.homeTitle}>{t('article.what-is-gaiax')}</Title>
          <Text className={styles.homeText}>{t('article.what-is-gaiax-message-introduction-section')}</Text>
          <Text className={styles.homeText}>{t('article.what-is-gaiax-message-main-section')}</Text>
          <Text className={styles.homeText}>{t('article.what-is-gaiax-message-ending-section')}</Text>
        </div>
      )}
    </div>
  );
}
