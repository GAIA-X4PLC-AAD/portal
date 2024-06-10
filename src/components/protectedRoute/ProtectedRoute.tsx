import { AuthContext } from 'context/AuthContextProvider';
import { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProtectedRoute {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRoute) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      navigate('/'); // Redirect to home page
    }
  }, [authContext.isAuthenticated, navigate]);

  return authContext.isAuthenticated ? <>{children}</> : null;
}
