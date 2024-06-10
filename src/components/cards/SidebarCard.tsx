import Text from 'components/Text/Text';
import Title from 'components/Title/Title';
import GaiaXButton from 'components/buttons/GaiaXButton';
import Subtitle from 'components/subtitle/Subtitle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SidebarCard.module.css';

interface ISidebarCard {
  title: string;
  subtitle: string;
  text: string;
}

export default function SidebarCard({
  title,
  subtitle,
  text,
}: Readonly<ISidebarCard>) {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);

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
