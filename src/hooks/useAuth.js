import { useState, useEffect } from 'react';
import { authService } from '../services/authService';

/**
 * useAuth Hook
 * Provides authentication state and actions
 * 
 * @returns {Object} Authentication state and actions
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Check current authentication status
   */
  const checkAuthStatus = () => {
    try {
      const authStatus = authService.isAuthenticated();
      setIsAuthenticated(authStatus);
      
      if (authStatus) {
        const currentUser = authService.getCurrentUser();
        const userRoles = authService.getUserRoles();
        const userPermissions = authService.getUserPermissions();
        
        setUser(currentUser);
        setRoles(userRoles);
        setPermissions(userPermissions);
      } else {
        setUser(null);
        setRoles([]);
        setPermissions([]);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
      setRoles([]);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign in user
   * @param {string} login - Username or email
   * @param {string} password - User password
   * @returns {Promise<Object>} Authentication response
   */
  const signIn = async (login, password) => {
    try {
      setLoading(true);
      const userData = await authService.signIn(login, password);
      
      // Update state
      setIsAuthenticated(true);
      setUser(userData);
      setRoles(userData.roles || []);
      setPermissions(userData.permissions || []);
      
      return userData;
    } catch (error) {
      // Reset state on error
      setIsAuthenticated(false);
      setUser(null);
      setRoles([]);
      setPermissions([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out user
   */
  const signOut = () => {
    authService.signOut();
    setIsAuthenticated(false);
    setUser(null);
    setRoles([]);
    setPermissions([]);
  };

  /**
   * Check if user has a specific role
   * @param {string} role - Role to check
   * @returns {boolean} True if user has the role
   */
  const hasRole = (role) => {
    return roles.includes(role);
  };

  /**
   * Check if user has any of the specified roles
   * @param {Array} rolesToCheck - Array of roles to check
   * @returns {boolean} True if user has any of the roles
   */
  const hasAnyRole = (rolesToCheck) => {
    return roles.some(role => rolesToCheck.includes(role));
  };

  /**
   * Check if user has a specific permission
   * @param {string} permission - Permission to check
   * @returns {boolean} True if user has the permission
   */
  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  return {
    // State
    isAuthenticated,
    user,
    roles,
    permissions,
    loading,
    
    // Actions
    signIn,
    signOut,
    hasRole,
    hasAnyRole,
    hasPermission,
    checkAuthStatus
  };
};