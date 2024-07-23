import Text from 'components/Text/Text';
import Title from 'components/Title/Title';
import GaiaXButton from 'components/buttons/GaiaXButton';
import Subtitle from 'components/subtitle/Subtitle';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SelfDescriptionContext } from '../../../../../../context/SelfDescriptionContext';

import styles from './ResourceOfferedBy.module.css';

const ResourceOfferedBy = () => {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);
  const selfDescription = useContext(SelfDescriptionContext)

  const title='Offered by'
  const subtitle='3D Mapping Solutions GmbH'
  const text='We offer high-precision 3D map data of roads and urban environments for applications in autonomous driving, robotics, urban planning and navigation systems.'

  const handleClickContactOrBuy = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className={styles['sidebar-card-container']}>
      {showNotification && (
        <div className={styles.notification}>
          {t('details.contact-or-buy-button-notification')}
        </div>
      )}
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Text>{text}</Text>
      <GaiaXButton
        label={t('details.sidebar-button-label')}
        handleOnClick={handleClickContactOrBuy}
      />
    </div>
  );
}

export default ResourceOfferedBy;
