import React from 'react';

import { ReactComponent as MyIcon } from '../../../../assets/logos/msg_white.svg';
import Text from '../../../../common/components/fields/text/Text';
import { useFooter } from '../../../../hooks/useFooter';

import styles from './Footer.module.css';

export const Footer = () => {
  const footerAssets = useFooter();

  return (
    <div className={styles['footer-container']}>
      <div className={styles.logoContainer}>
        <Text className={styles.logoText}>Powered by</Text>
        <MyIcon className={styles.msgIcon}/>
      </div>
      <Text className={styles.copyright}>Gaia-X © 2024</Text>
      <ul className={styles.navigationItems}>
        {footerAssets.map((footerAsset, index) => {
          return (
            <li className={styles.navigationItem} key={index}>
              <a href={footerAsset.path}>{footerAsset.navigationItemName}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
