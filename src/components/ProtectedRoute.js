import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

/**
 * ProtectedRoute Component
 * Protects routes based on authentication status and user roles
 *
 * @param {React.ReactNode} children - Child components to render if authorized
 * @param {Array<string>} allowedRoles - Array of roles allowed to access this route
 * @returns {React.ReactNode} Protected content or redirect
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Check if user is authenticated
  const isAuthenticated = authService.isAuthenticated();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If no specific roles required, allow access
  if (!allowedRoles || allowedRoles.length === 0) {
    return children;
  }

  // Check if user has any of the allowed roles
  const hasAllowedRole = authService.hasAnyRole(allowedRoles);
  
  // If user doesn't have required role, redirect to home
  if (!hasAllowedRole) {
    return <Navigate to="/home" replace />;
  }

  // Authorized, render children
  return children;
};

export default ProtectedRoute;