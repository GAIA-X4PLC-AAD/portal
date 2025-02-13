import classnames from 'classnames';
import {useTranslation} from 'react-i18next';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import Text from '../../common/components/fields/././text/Text';
import Subtitle from '../../common/components/fields/subtitle/Subtitle';
import Title from '../../common/components/fields/title/Title';
import {ResourceDetails} from '../../types/resources.model';

import styles from './SidebarCard.module.css';

interface ISidebarCard {
  title: string;
  subtitle: string;
  text: string;
  resource?: ResourceDetails;
}

export default function SidebarCard({
  title,
  subtitle,
                                        text
}: Readonly<ISidebarCard>) {
  const { t } = useTranslation();
  const handleClickBuyButton = () => {
  };

  return (
    <div className={styles['sidebar-card-container']}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Text>{text}</Text>
      <GaiaXButton
        className={classnames([styles.buyButton])}
        label={t('details.sidebar-buy-button')}
        handleOnClick={handleClickBuyButton}
      />
    </div>
  );
}
