import Title from 'components/Title/Title';
import GaiaXButton from 'components/buttons/GaiaXButton';
import { useTranslation } from 'react-i18next';

import styles from './ResourceActions.module.css';
const ResourceActions = () => {
  const { t } = useTranslation();
  const title='Actions'
  return (
    <div className={styles['sidebar-card-container']}>
      <Title>{title}</Title>
      <GaiaXButton
        label={t('resources.download-description')}
        handleOnClick={() => {}}
      />
      <GaiaXButton
        label={t('details.view-graph')}
        handleOnClick={() => {}}
      />
      <GaiaXButton
        label={t('resources.contact-provider')}
        handleOnClick={() => {}}
      />
    </div>
  );
}
export default ResourceActions;