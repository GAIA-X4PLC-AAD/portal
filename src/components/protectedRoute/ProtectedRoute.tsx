import { ReactNode, useContext } from "react";

import { AuthContext } from "context/AuthContextProvider";

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
