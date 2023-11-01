import Keycloak, {KeycloakConfig, KeycloakInitOptions} from "keycloak-js";
import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContextValues} from "./AuthContextValues";
import {retrieveToken} from "../common/auth";

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
  realm: "gaia-x",
  clientId: "portal",
  url: "https://fc-keycloak.gxfs.gx4fm.org/",
  // url: "http://localhost:8280",
};

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
  // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
  onLoad: "login-required",
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
  username: "",
  logout: () => {
  },
  login: () => {
  },
  hasRole: (role) => false,
  getConfig: () => null,
  token: "",
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
interface AuthContextProviderProps {
  /**
   * The elements wrapped by the auth context.
   */
  children: JSX.Element;
}


/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: AuthContextProviderProps) => {
  // Create the local state in which we will keep track if a user is authenticated
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  // Local state that will contain the users name once it is loaded
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    /**
     * Load the profile for of the user from Keycloak
     */
    async function loadProfile() {
      try {
        const profile = await keycloak.loadUserProfile();
        console.log('Profile', profile);
        if (profile.firstName) {
          setUsername(profile.firstName);
        } else if (profile.username) {
          setUsername(profile.username);
        }
      } catch {
        setUsername("Fail");
        console.log("error trying to load the user profile");
      }
    }

    async function refreshToken() {
      axios.interceptors.response.use(
        // No special handling of responses needed. We return it as it comes in.
        (response) => {
          return response;
        },
        // This object is not null if an error occurred
        async (error) => {
          if (error.response === undefined) {
            throw error;
          }
          // Check if it is a 401 Unauthorized error
          if (error.response.status === 401) {
            try {
              // Try to refresh the access token
              const result = await keycloak.updateToken(5);
              // Was refreshing the access token successfully?
              if (result) {
                // Repeat the request
                return await axios({...error.config});
              } else {
                // If the access token could not be refreshed we reject the promise and the code responsible for the request has to handle it.
                throw new Error("Unauthorized");
              }
            } catch (error) {
              keycloak.logout();
              throw error;
            }
          }
          // No special treatment of any other error
          throw error;
        },
      );
    }

    async function loadToken() {
      try {
        const token = await keycloak.token;
        if (token) {
          setToken(token);
                    // axios.create({
          //   headers: {
          //     options: {
          //       'Authorization': `Bearer ${token}`,
          //       'Access-Control-Allow-Origin': '*',
          //       'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
          //     }
          //   }
          // });

          // axios.interceptors.request.use((config) => {
          //   config.headers["Authorization"] = `Bearer ${keycloak.token}`;
          //   config.headers["Access-Control-Allow-Origin"] = "*";
          //   return config;
          // });

        }
      } catch {
        console.log("error trying to load the token");
      }
    }
    if(isAuthenticated){
      loadProfile();
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
      console.log("initialize Keycloak");
      try {
        const isAuthenticatedResponse = await keycloak.init(keycloakInitOptions);

        // If the authentication was not successfully the user is send back to the Keycloak login form
        if (!isAuthenticatedResponse) {
          console.log("user is not yet authenticated. forwarding user to login.");
          await keycloak.login();
        }
        // If we get here the user is authenticated and we can update the state accordingly
        console.log("user already authenticated");
        setAuthenticated(isAuthenticatedResponse);
      } catch {
        console.log("error initializing Keycloak");
        setAuthenticated(false);
      }
    }

    if (!isAuthenticated) {
      initializeKeycloak();
    }
  }

  async function getConfig() {
    return axios.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${keycloak.token}`;
      config.headers["Access-Control-Allow-Origin"] = "*";
      return config;
    });
    // axios.interceptors.request.use(function (config) {
    //   const token = retrieveToken();
    //
    //   if (token) {
    //     // @ts-ignore
    //     config.headers = {
    //       ...config.headers,
    //       authorization: `Bearer ${token}`,
    //     };
    //   }
    //   return config;
    // }, function (error) {
    //   console.log("in axios interceptors request error")
    //   return Promise.reject(error);
    // });
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
    <AuthContext.Provider value={{isAuthenticated, username, logout, login, hasRole, getConfig, token}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
