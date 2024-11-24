import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import gaiaLogo from '../../../../../assets/images/PLC-AAD-Logo.png';

import styles from './GaiaXLogo.module.css';

const GaiaXLogo: FC = () => (
  <div className={styles.logo}>
    <Link to="/">
      <img src={gaiaLogo} alt="Gaia-X Logo"/>
    </Link>
  </div>
)

export default GaiaXLogo;
