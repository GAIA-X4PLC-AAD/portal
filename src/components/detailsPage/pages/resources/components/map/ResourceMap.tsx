import Title from 'components/Title/Title';
import { useContext } from 'react';

import { SelfDescriptionContext } from '../../../../../../context/SelfDescriptionContext';
import VcMapComponent from '../../../../../VcMapComponent/VcMapComponent';

import styles from './ResourceMap.module.css';

export const ResourceMap = () => {
  const selfDescription = useContext(SelfDescriptionContext)

  return (
    <div className={styles['map-card-container']}>
      <Title>Map</Title>
      <VcMapComponent />
    </div>
  );
}

export default ResourceMap;
