/* test coverage not required */
import keycloakConfig from 'keycloak-config.json';
import Keycloak from 'keycloak-js';
import React, { createContext, useEffect, useMemo, useState } from 'react';

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

// const initOptions = keycloakConfig.initOptions as Keycloak.KeycloakInitOptions;

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
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [token, setToken] = useState('');
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  // Initialise Keycloak
  useEffect(() => {
    // keycloak
    //   .init(initOptions)
    //   .then((authenticated: boolean) => {
    //     setIsAuthenticated(authenticated);
    //     if (authenticated) {
    //       axios.defaults.headers.common.Authorization = `Bearer ${keycloak.token ? keycloak.token : ''}`
    //       setToken(keycloak.token ? keycloak.token : '');
    //       scheduleTokenRenewal();
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.error('Error during Keycloak initialization:', error);
    //   });
  }, []);

  // const scheduleTokenRenewal = () => {
  //   const interval = setInterval(() => {
  //     keycloak
  //       .updateToken(70)
  //       .then((refreshed: boolean) => {
  //         if (refreshed) {
  //           setToken(keycloak.token ? keycloak.token : '');
  //         }
  //       })
  //       .catch(() => {
  //         console.warn('Failed to refresh token. Logging out...');
  //         handleLogout();
  //       });
  //   }, 60000);
  //
  //   if (keycloak.tokenParsed && keycloak.tokenParsed.exp) {
  //     const expirationTime = keycloak.tokenParsed.exp * 1000 - Date.now();
  //     const timeout = setTimeout(handleLogout, expirationTime);
  //
  //     return () => {
  //       clearInterval(interval);
  //       clearTimeout(timeout);
  //     };
  //   }
  // };

  const handleLogout = async () => {
    keycloak.logout();
    setIsAuthenticated(false);
    setToken('');
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      token,
      login: () => Promise.resolve(),
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
