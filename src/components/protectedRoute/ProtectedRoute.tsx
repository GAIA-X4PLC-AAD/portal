import { AuthContext } from 'context/AuthContextProvider';
import { ReactNode, useContext } from 'react';

interface IProtectedRoute {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRoute) {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated) {
    authContext.login();
  }

  return children;
}
