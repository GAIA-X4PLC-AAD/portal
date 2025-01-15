/* test coverage not required */
import axios from 'axios';
import { t } from 'i18next';
import keycloakConfig from 'keycloak-config.json';
import Keycloak from 'keycloak-js';
import React, { createContext, useEffect, useMemo, useState } from 'react';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import { closeNotification, notify } from '../../common/components/notification/Notification';

import styles from './AuthContextProvider.module.css';

const getDotEnvKeycloakApiUrl = (): string => {
  if (!process.env.REACT_APP_KEYCLOAK_API_URL) {
    throw new Error('REACT_APP_KEYCLOAK_API_URL is not defined');
  }
  return process.env.REACT_APP_KEYCLOAK_API_URL;
}

const keycloak = new Keycloak({
  ...keycloakConfig.config,
  url: getDotEnvKeycloakApiUrl()
});

const initOptions = keycloakConfig.initOptions as Keycloak.KeycloakInitOptions;

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  redirectPath: string | null;
  setRedirectPath: (path: string | null) => void;
}

const defaultAuthContextValues: AuthContextType = {
  isAuthenticated: false,
  token: '',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  hasRole: (_role: string) => false,
  redirectPath: null,
  setRedirectPath: () => {},
};

export const AuthContext = createContext<AuthContextType>(
  defaultAuthContextValues
);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [notificationShown, setNotificationShown] = useState(false);

  // Initialise Keycloak
  useEffect(() => {
    keycloak
      .init(initOptions)
      .then((authenticated: boolean) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          axios.defaults.headers.common.Authorization = `Bearer ${keycloak.token ? keycloak.token : ''}`
          setToken(keycloak.token ? keycloak.token : '');
          setupTokenExpiryCheck();
        }
      })
      .catch((error: any) => {
        console.error('Error during Keycloak initialization:', error);
      });
  }, []);

  const setupTokenExpiryCheck = () => {
    const checkTokenExpiry = () => {
      if (keycloak.tokenParsed && keycloak.tokenParsed.exp) {
        const expirationTime = keycloak.tokenParsed.exp * 1000; // Convert to milliseconds

        //const timeToExpiry = expirationTime - Date.now(); // 15 minutes now
        //const timeToExpiry = (expirationTime - Date.now());
        let timeToExpiry = expirationTime - Date.now();
        if (timeToExpiry > 860000) {
          timeToExpiry = expirationTime - Date.now() - 860000;
        }
        // if (timeToExpiry > 500000) {
        //   timeToExpiry = expirationTime - Date.now() - 500000;
        // }
        console.log(timeToExpiry);
        // alert(timeToExpiry);

        if (timeToExpiry <= 30000 && timeToExpiry > 0 && !notificationShown) { // 1 minute before expiry
          setNotificationShown(true);
        }

        if (timeToExpiry <= 0) {
          handleLogout();
        }
      }
    };

    // Check token expiration every second
    const intervalId = setInterval(checkTokenExpiry, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    if (notificationShown) {
      showExpirationNotification();
    }
    if (!notificationShown) {
      closeNotification();
    }
  }, [notificationShown]);

  const showExpirationNotification = () => {
    const toasterId = notify({
      messageType: 'WARNING',
      message: (
        <div className={styles.notificationContainer}>
          <p>{t('session.willExpire')}</p>
          <p>{t('session.confirmRenew')}</p>
          <div className={styles.buttonContainer}>
            <GaiaXButton
              className={styles.notificationButton}
              label={t('common.yes')}
              handleOnClick={() => {
                keycloak.updateToken(600)   //900 second = 15 minutes
                  .then((refreshed: boolean) => {
                    if (refreshed) {
                      setToken(keycloak.token ? keycloak.token : '');
                      setNotificationShown(false);
                      closeNotification(toasterId);
                    }
                  })
                  .catch(() => {
                    console.warn('Failed to refresh token.');
                    alert('Failed to refresh token.');
                  });
              }}
            />
          </div>
        </div>
      ),
      options: {
        autoClose: false,
      },
    });
  };

  const handleLogout = async () => {
    keycloak.logout();
    setIsAuthenticated(false);
    setToken('');
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      token,
      login: keycloak.login,
      logout: handleLogout,
      hasRole: keycloak.hasRealmRole,
      redirectPath,
      setRedirectPath,
    }),
    [isAuthenticated, token, redirectPath]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
