import React, { FC } from 'react';

import styles from './DetailsSidebar.module.css';
import Vertical from './Vertical';

interface DetailsSidebarProps {
    children?: React.ReactNode;
    visible?: boolean;
}

const DetailsSidebar: FC<DetailsSidebarProps> = ({ children, visible = true }) => (
  <Vertical className={styles.sidebarContainer} visible={visible}>
    {children}
  </Vertical>
)

export default DetailsSidebar;
