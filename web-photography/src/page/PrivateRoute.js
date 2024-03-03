// PrivateRoute.js
import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';
import Dashboard from './Dashboard';
function PrivateRoute() {
    let isAuthenticated = /* Check if the user is authenticated */ false;
    if(auth.currentUser != null){
        isAuthenticated = true;
    }

    console.log(auth);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;