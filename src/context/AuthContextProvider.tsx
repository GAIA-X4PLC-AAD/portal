import axios from 'axios';
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';
import { createContext, useEffect, useState } from 'react';

import { AuthContextValues } from './AuthContextValues';

// const realm: string = process.env.REACT_APP_REALM_NAME ? process.env.REACT_APP_REALM_NAME : "";
// const clientID: string = process.env.REACT_APP_CLIENT_ID ? process.env.REACT_APP_CLIENT_ID : "";
// const url: string = process.env.REACT_APP_FEDERATED_CATALOGUE_API_URL ? process.env.REACT_APP_FEDERATED_CATALOGUE_API_URL : "";
//
// console.log("realm", realm);
// console.log("clientID", clientID);
// console.log("url", url);
// console.log("EDGE", process.env.REACT_APP_EDGE_API_URI);

// /**
//  * KeycloakConfig configures the connection to the Keycloak server.
//  */
// const keycloakConfig: KeycloakConfig = {
//   realm: realm,
//   clientId: clientID,
//   url: url,
// };

const keycloakConfig: KeycloakConfig = {
  realm: 'gaia-x',
  clientId: 'portal',
  url: 'https://fc-keycloak.gxfs.gx4fm.org/',
};

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
  // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
  onLoad: 'login-required',
  checkLoginIframe: false,
  pkceMethod: 'S256'
};

// Create the Keycloak client instance
const keycloak = new Keycloak(keycloakConfig);

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  logout: () => {
  },
  login: () => {
  },
  hasRole: (role) => false,
  getConfig: () => null,
  token: '',
};

/**
 * Create the AuthContext using the default values.
 */
export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);

/**
 * The props that must be passed to create the {@link AuthContextProvider}.
 */
// eslint-disable-next-line
interface AuthContextProviderProps {
  /**
   * The elements wrapped by the auth context.
   */
  // eslint-disable-next-line
  children: React.JSX.Element;
}

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: AuthContextProviderProps) => {
  // Create the local state in which we will keep track if a user is authenticated
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    async function loadToken() {
      try {
        const token = await keycloak.token;
        if (token) {
          setToken(token);
        }
      } catch {
        console.log('error trying to load the token');
      }
    }

    if (isAuthenticated){
      loadToken();
    }
  }, [isAuthenticated])

  /**
   * Initiate the logout
   */
  const logout = () => {
    keycloak.logout();
  };

  const login = () => {
    /**
     * Initialize the Keycloak instance
     */
    async function initializeKeycloak() {
      console.log('initialize Keycloak');
      try {
        const isAuthenticatedResponse = await keycloak.init(keycloakInitOptions);

        // If the authentication was not successfully the user is send back to the Keycloak login form
        if (!isAuthenticatedResponse) {
          console.log('user is not yet authenticated. forwarding user to login.');
          await keycloak.login();
        }
        // If we get here the user is authenticated and we can update the state accordingly
        console.log('user already authenticated');
        setAuthenticated(true);
      } catch {
        console.log('error initializing Keycloak');
        setAuthenticated(false);
      }
    }

    if (!isAuthenticated) {
      initializeKeycloak();
    }
  }

  async function getConfig() {
    return axios.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Bearer ${keycloak.token}`;
      config.headers['Access-Control-Allow-Origin'] = '*';
      return config;
    });
  }

  /**
   * Check if the user has the given role
   * @param role to be checked
   * @returns whether or not if the user has the role
   */
  const hasRole = (role: string) => {
    return keycloak.hasRealmRole(role);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login, hasRole, getConfig, token }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
