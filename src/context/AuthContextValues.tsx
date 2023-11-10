import {KeycloakInstance} from "keycloak-js";

/**
 * AuthContextValues defines the structure for the default values of the {@link AuthContext}.
 */
export interface AuthContextValues {
  /**
   * Whether a user is currently authenticated or not
   */
  isAuthenticated: boolean;

  /**
   * The name of the authenticated user
   */
  username?: string;

  /**
   * Function to initiate the logout
   */
  logout: () => void;

  /**
   * Function to initiate the login
   */
  login: () => void;

  /**
   * Check if the user has the given role
   */
  hasRole: (role: string) => boolean;

  getConfig: () => Promise<number> | null;

  token: string;
}
