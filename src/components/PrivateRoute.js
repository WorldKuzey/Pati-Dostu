// src/components/PrivateRoute.js
/*import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import {  useToken } from '../context/TokenContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { token } = useToken();

  return token ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute; */
