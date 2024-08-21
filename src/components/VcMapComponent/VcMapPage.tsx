import Header from '../header/Header';

import VcMapComponent from './VcMapComponent';
import styles from './VcMapPage.module.css';

const VcMapPage = () => {
  return (
    <div>
      <Header title={'VcMapPage'}/>
      <div className={styles['content-container']}>
        <VcMapComponent />
      </div>
    </div>
  );
};

export default VcMapPage;
