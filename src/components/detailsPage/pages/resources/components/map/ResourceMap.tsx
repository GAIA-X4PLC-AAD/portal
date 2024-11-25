/* test coverage not required */
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Title from 'components/Title/Title';
import React from 'react';

import styles from './ResourceMap.module.css';

const ResourceMap = () => {
  const handleEnlarge = () => {}
  return (
    <div className={styles['map-card-container']}>
      <div className={styles['title']}>
        <Title>Map</Title>
        <OpenInFullIcon onClick={handleEnlarge}/>
      </div>
      {/*<VcMapComponent/>*/}
    </div>
  );
}

export default ResourceMap;
