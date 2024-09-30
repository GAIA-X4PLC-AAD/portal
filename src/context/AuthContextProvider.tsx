import axios from 'axios';
import keycloakConfig from 'keycloak-config';
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';
import React, { createContext, useEffect, useMemo, useState } from 'react';

const getDotEnvKeycloakApiUrl= (keycloakApiUrl: string): string => {
  if (!process.env[keycloakApiUrl]) {
    throw new Error(`${keycloakApiUrl} is not defined`);
  }
  return process.env[keycloakApiUrl];
}

const config: KeycloakConfig = {
  ...keycloakConfig.config,
  url: getDotEnvKeycloakApiUrl(keycloakConfig.config.url)
};

const keycloak = new Keycloak(keycloakConfig);
const initOptions = keycloakConfig.initOptions as KeycloakInitOptions;

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

  // Initialise Keycloak
  useEffect(() => {
    keycloak
      .init(initOptions)
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          axios.defaults.headers.common.Authorization = `Bearer ${keycloak.token ? keycloak.token : ''}`
          setToken(keycloak.token ? keycloak.token : '');
          scheduleTokenRenewal();
        }
      })
      .catch((error) => {
        console.error('Error during Keycloak initialization:', error);
      });
  }, []);

  const scheduleTokenRenewal = () => {
    const interval = setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            setToken(keycloak.token ? keycloak.token : '');
          }
        })
        .catch(() => {
          console.warn('Failed to refresh token. Logging out...');
          handleLogout();
        });
    }, 60000);

    if (keycloak.tokenParsed && keycloak.tokenParsed.exp) {
      const expirationTime = keycloak.tokenParsed.exp * 1000 - Date.now();
      const timeout = setTimeout(handleLogout, expirationTime);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  };

  const handleLogout = async () => {
    await keycloak.logout();
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
