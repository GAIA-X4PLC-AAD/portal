import Title from 'components/Title/Title';

import styles from './ResourceMap.module.css';

const ResourceMap = () => {
  return (
    <div className={styles['map-card-container']}>
      <div className={styles['title']}>
        <Title>Map</Title>
      </div>
      {/*<VcMapComponent/>*/}
    </div>
  );
}

export default ResourceMap;
