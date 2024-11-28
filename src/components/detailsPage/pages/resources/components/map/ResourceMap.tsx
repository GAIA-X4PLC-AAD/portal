import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import React from 'react';

import Title from '../../../../../../common/components/fields/title/Title';
import Horizontal from '../../../../../../common/components/layouts/Horizontal';
import Vertical from '../../../../../../common/components/layouts/Vertical';
import Map from '../../../../../../common/components/map/Map';

import styles from './ResourceMap.module.css';

const ResourceMap = () => {
  const handleEnlarge = () => {}
  return (
    <Vertical className={styles.mapCardContainer}>
      <Horizontal className={styles.headerContainer}>
        <Title className={styles.title}>Map</Title>
        <OpenInFullIcon onClick={handleEnlarge}/>
      </Horizontal>
      <Map/>
    </Vertical>
  );
}

export default ResourceMap;
