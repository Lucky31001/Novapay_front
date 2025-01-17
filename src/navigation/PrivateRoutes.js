import React from 'react';
import { Navigate } from 'react-router-dom';
import api from '../config/api';

const PrivateRoute = ({ children }) => {
    return api.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;