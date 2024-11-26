import Title from 'common/components/fields/title/Title';
import React from 'react';

import styles from './MapCard.module.css';

export default function MapCard() {
  return (
    <div className={styles['map-card-container']}>
      <Title>Map</Title>
      <img
        src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
        alt="Map of a location"
        width={400}
        height={350}
      />
    </div>
  );
}
