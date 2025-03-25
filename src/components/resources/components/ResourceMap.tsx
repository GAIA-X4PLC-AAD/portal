/* test coverage not required */
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import React, { FC } from 'react';

import Title from '../../../common/components/fields/title/Title';
import Horizontal from '../../../common/components/layouts/Horizontal';
import Vertical from '../../../common/components/layouts/Vertical';
import Map from '../../../common/components/map/Map';

import styles from './ResourceMap.module.css';

interface IResourceMap {
    mediaUrl: string | undefined;
}

const ResourceMap: FC<IResourceMap> = ({ mediaUrl }) => {
  const handleEnlarge = () => {}

  if (!mediaUrl) {
    return null;
  }

  return (
    <Vertical className={styles.mapCardContainer}>
      {/*<Horizontal className={styles.headerContainer}>*/}
      <Title className={styles.title}>Map</Title>
      <OpenInFullIcon onClick={handleEnlarge}/>
      {/*</Horizontal>*/}
      <Map/>
    </Vertical>
  );
}

export default ResourceMap;
