import { AuthContext } from 'context/AuthContextProvider';
import { ReactNode, useContext, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

interface IProtectedRoute {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: IProtectedRoute) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      authContext.setRedirectPath(location.pathname);
      console.log('Redirecting to Home');
      navigate('/'); // Redirect to home page
    } else if (authContext.redirectPath) {
      console.log('Redirecting to:', authContext.redirectPath);
      navigate(authContext.redirectPath);
      authContext.setRedirectPath(null);
    }
  }, [authContext.isAuthenticated, navigate, location, authContext]);

  return authContext.isAuthenticated ? <>{children}</> : null;
}
