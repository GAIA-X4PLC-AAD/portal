import { FC, ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../context/AuthContextProvider';

import styles from './Main.css'

interface IMain {
    children: ReactNode
}

const Main: FC<IMain> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  if (authContext.isAuthenticated) {
    return (
      <main className={styles.content}>
        {children}
      </main>
    )
  }
  return <p>{t('common.not-authenticated')}</p>
}

export default Main;
