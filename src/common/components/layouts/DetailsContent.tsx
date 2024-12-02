import React, { FC } from 'react';

import styles from './DetailsContent.module.css';
import Horizontal from './Horizontal';

interface DetailsMainContentProps {
    children?: React.ReactNode;
    visible?: boolean;
}

const DetailsContent: FC<DetailsMainContentProps> = ({ children, visible = true }) => (
  <Horizontal className={styles.mainContentContainer} visible={visible}>
    {children}
  </Horizontal>
)

export default DetailsContent;
