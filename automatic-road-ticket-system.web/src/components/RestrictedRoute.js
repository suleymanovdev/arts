import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RestrictedRoute = ({ children }) => {
  const jwtToken = Cookies.get('jwtToken');
  
  if (jwtToken) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default RestrictedRoute;
