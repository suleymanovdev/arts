import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const jwtToken = Cookies.get('jwtToken');
  
  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
