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
  const isAuthenticated = authService.isAuthenticated();

  // Treat unauthenticated visitors as "guest" role for public routes
  if (!isAuthenticated) {
    const allowsGuest = Array.isArray(allowedRoles) && allowedRoles.includes('guest');
    if (allowsGuest) {
      return children;
    }
    return <Navigate to="/signin" replace />;
  }

  // If no specific roles required, allow access
  if (!allowedRoles || allowedRoles.length === 0) {
    return children;
  }

  // Authenticated: ensure user has one of the allowed roles
  const hasAllowedRole = authService.hasAnyRole(allowedRoles);
  if (!hasAllowedRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;