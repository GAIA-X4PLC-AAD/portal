import Header from '../header/Header';

import VcMapComponent from './VcMapComponent';
import styles from './VcMapPage.module.css';

const VcMapPage = () => { const geoJSON  = './../../vienna-streets.geojson';
  return (
    <div>
      <Header title={'VcMapPage'}/>
      <div className={styles['content-container']}>
        <VcMapComponent geoJSON={geoJSON}/>
      </div>
    </div>
  );
};

export default VcMapPage;
