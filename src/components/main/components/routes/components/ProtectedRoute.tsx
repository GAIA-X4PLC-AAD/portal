import {AuthContext} from '../../../../context/AuthContextProvider';
import React, {ReactNode, useContext, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

interface IProtectedRoute {
  children: ReactNode;
  isAuthenticationRequired?: boolean
}

export default function ProtectedRoute({ children, isAuthenticationRequired = true }: IProtectedRoute) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticationRequired && !authContext.isAuthenticated) {
      authContext.setRedirectPath(location.pathname);
      console.debug('Redirecting to Home');
      navigate('/');
    } else {
      if (authContext.redirectPath) {
        console.debug('Redirecting to:', authContext.redirectPath);
        navigate(authContext.redirectPath);
        authContext.setRedirectPath(null);
      }
    }
  }, [authContext.isAuthenticated, navigate, location, authContext]);

  return !isAuthenticationRequired || authContext.isAuthenticated ? <>{children}</> : null;
}
