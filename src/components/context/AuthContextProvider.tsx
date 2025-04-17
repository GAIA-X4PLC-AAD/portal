import React, { createContext, useEffect, useMemo, useState } from 'react';

import LoadingIndicator from '../../common/components/loadingIndicator/LoadingIndicator';

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
  isAuthenticated: true, // Authentifizierung immer wahr
  token: 'mock-token', // Mock-Token
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  hasRole: (_role: string) => true, // Immer wahr für Rollenprüfung
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
  const [isAuthenticated] = useState(true); // Immer authentifiziert
  const [token] = useState('mock-token'); // Mock-Token
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Kein Laden erforderlich

  useEffect(() => {
    // Simulierte Initialisierung
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    console.log('Logout called (mock)');
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      token,
      login: () => Promise.resolve(),
      logout: handleLogout,
      hasRole: (_role: string) => true, // Immer wahr
      redirectPath,
      setRedirectPath,
    }),
    [isAuthenticated, token, redirectPath]
  );

  if (loading) {
    return <LoadingIndicator visible={true} />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
