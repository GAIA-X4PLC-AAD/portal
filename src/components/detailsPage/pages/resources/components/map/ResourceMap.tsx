import Title from 'components/Title/Title';
import { useContext } from 'react';

import { SelfDescriptionContext } from '../../../../../../context/SelfDescriptionContext';
import VcMapComponent from '../../../../../VcMapComponent/VcMapComponent';

import styles from './ResourceMap.module.css';

export const ResourceMap = () => {
  const selfDescription = useContext(SelfDescriptionContext)
  const geoJSON  = './../../vienna-streets.geojson';

  return (
    <div className={styles['map-card-container']}>
      <Title>Map</Title>
      <VcMapComponent geoJSON={geoJSON}/>
    </div>
  );
}

export default ResourceMap;
