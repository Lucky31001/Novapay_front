import React from 'react';
import { Navigate } from 'react-router-dom';
import api from '../config/api';

const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
};

const PrivateRoute = ({ children }) => {
  const token = api.token;
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
