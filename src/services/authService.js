import apiClient, { apiService } from '../utils/api';

/**
 * Authentication Service
 * Handles user authentication, token management, and user data storage
 */

class AuthService {
  /**
   * Sign in user with credentials
   * @param {string} login - Username or email
   * @param {string} password - User password
   * @returns {Promise<Object>} Authentication response data
   */
  async signIn(login, password) {
    try {
      const response = await apiService.post('/api/sign_in', {
        login,
        password
      });

      // Store user data and tokens
      this.setAuthData(response);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sign up new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration response data
   */
  async signUp(userData) {
    try {
      const response = await apiService.post('/api/sign_up', userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Store authentication data in localStorage
   * @param {Object} userData - User data from authentication response
   */
  setAuthData(userData) {
    // Make sure we have a token
    if (!userData.token) {
      throw new Error('No authentication token received');
    }

    // Store token and user data
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Store roles with fallback to empty array
    const roles = userData.roles || [];
    localStorage.setItem('userRoles', JSON.stringify(roles));

    // Store permissions with fallback to empty array
    const permissions = userData.permissions || [];
    localStorage.setItem('userPermissions', JSON.stringify(permissions));

    // Update API client with new token
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  }

  /**
   * Get current user data
   * @returns {Object|null} User data or null if not authenticated
   */
  getCurrentUser() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Get user roles
   * @returns {Array} Array of user roles
   */
  getUserRoles() {
    const roles = localStorage.getItem('userRoles');
    return roles ? JSON.parse(roles) : [];
  }

  /**
   * Get user permissions
   * @returns {Array} Array of user permissions
   */
  getUserPermissions() {
    const permissions = localStorage.getItem('userPermissions');
    return permissions ? JSON.parse(permissions) : [];
  }

  /**
   * Check if user has a specific role
   * @param {string} role - Role to check
   * @returns {boolean} True if user has the role
   */
  hasRole(role) {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  /**
   * Check if user has any of the specified roles
   * @param {Array} roles - Array of roles to check
   * @returns {boolean} True if user has any of the roles
   */
  hasAnyRole(roles) {
    const userRoles = this.getUserRoles();
    return userRoles.some(role => roles.includes(role));
  }

  /**
   * Check if user has a specific permission
   * @param {string} permission - Permission to check
   * @returns {boolean} True if user has the permission
   */
  hasPermission(permission) {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission);
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  /**
   * Sign out user
   */
  signOut() {
    // Clear all auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('userRoles');
    localStorage.removeItem('userPermissions');

    // Remove auth header from API client
    delete apiClient.defaults.headers.common['Authorization'];
  }

  /**
   * Get authentication token
   * @returns {string|null} Auth token or null if not authenticated
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Refresh authentication token
   * @returns {Promise<Object>} Refresh response data
   */
  async refreshToken() {
    try {
      const response = await apiService.post('/api/refresh');
      
      // Update stored token
      if (response.token) {
        localStorage.setItem('token', response.token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      }
      
      return response;
    } catch (error) {
      // If refresh fails, sign out user
      this.signOut();
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;