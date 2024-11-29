import React, { FC } from 'react';

import styles from './DetailsPropertyContainer.module.css';

interface DetailsMainContentProps {
    children?: React.ReactNode;
    visible?: boolean;
}

const DetailsPropertyContainer: FC<DetailsMainContentProps> = ({ children, visible = true }) => {
  if (!visible) {
    return <></>
  }

  return (
    <div className={styles.detailsPropertyContainer}>
      {children}
    </div>
  )
}

export default DetailsPropertyContainer;
