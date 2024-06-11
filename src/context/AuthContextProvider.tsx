import React, { createContext, useEffect, useState, useMemo } from "react";
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  realm: "gaia-x",
  clientId: "portal",
  url: "https://fc-keycloak.gxfs.gx4fm.org/",
};

const keycloak = new Keycloak(keycloakConfig);

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "check-sso",
  checkLoginIframe: false,
  pkceMethod: "S256",
};

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

const defaultAuthContextValues: AuthContextType = {
  isAuthenticated: false,
  token: "",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  hasRole: (role: string) => false,
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
  const [token, setToken] = useState("");

  // Initialise Keycloak
  useEffect(() => {
    keycloak
      .init(keycloakInitOptions)
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          setToken(keycloak.token ?? "");
          scheduleTokenRenewal();
        }
      })
      .catch((error) => {
        console.error("Error during Keycloak initialization:", error);
      });
  }, []);

  const scheduleTokenRenewal = () => {
    const interval = setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            setToken(keycloak.token ?? "");
          }
        })
        .catch(() => {
          console.warn("Failed to refresh token. Logging out...");
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
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      token,
      login: keycloak.login,
      logout: handleLogout,
      hasRole: keycloak.hasRealmRole,
    }),
    [isAuthenticated, token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
