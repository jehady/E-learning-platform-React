import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../utils/api';

/**
 * useApi Hook
 * Handles API calls with loading, error, and data states
 * 
 * @param {string} url - API endpoint URL
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} options - Additional options for the API call
 * @returns {Object} API state and actions
 */
export const useApi = (url, method = 'GET', options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshToken, setRefreshToken] = useState(0);

  /**
   * Execute API call
   * @param {Object} requestData - Data to send with the request
   * @param {Object} requestConfig - Additional config for the request
   * @returns {Promise<any>} API response
   */
  const execute = useCallback(async (requestData = null, requestConfig = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      // Merge options with request config
      const config = { ...options, ...requestConfig };
      
      // Execute appropriate method
      switch (method.toUpperCase()) {
        case 'GET':
          response = await apiService.get(url, config);
          break;
        case 'POST':
          response = await apiService.post(url, requestData, config);
          break;
        case 'PUT':
          response = await apiService.put(url, requestData, config);
          break;
        case 'PATCH':
          response = await apiService.patch(url, requestData, config);
          break;
        case 'DELETE':
          response = await apiService.delete(url, config);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, options]);

  /**
   * Refresh the API call
   */
  const refresh = useCallback(() => {
    setRefreshToken(prev => prev + 1);
  }, []);

  // Execute API call when URL, method, or refreshToken changes
  useEffect(() => {
    if (!url) return;
    
    // For GET requests, execute immediately
    if (method.toUpperCase() === 'GET') {
      execute();
    }
  }, [url, method, refreshToken, execute]);

  return {
    // State
    data,
    loading,
    error,
    
    // Actions
    execute,
    refresh
  };
};

/**
 * useApiGet Hook
 * Specialized hook for GET requests
 * 
 * @param {string} url - API endpoint URL
 * @param {Object} options - Additional options for the API call
 * @returns {Object} API state and actions
 */
export const useApiGet = (url, options = {}) => {
  return useApi(url, 'GET', options);
};

/**
 * useApiPost Hook
 * Specialized hook for POST requests
 * 
 * @param {string} url - API endpoint URL
 * @param {Object} options - Additional options for the API call
 * @returns {Object} API state and actions
 */
export const useApiPost = (url, options = {}) => {
  return useApi(url, 'POST', options);
};

/**
 * useApiPut Hook
 * Specialized hook for PUT requests
 * 
 * @param {string} url - API endpoint URL
 * @param {Object} options - Additional options for the API call
 * @returns {Object} API state and actions
 */
export const useApiPut = (url, options = {}) => {
  return useApi(url, 'PUT', options);
};

/**
 * useApiDelete Hook
 * Specialized hook for DELETE requests
 * 
 * @param {string} url - API endpoint URL
 * @param {Object} options - Additional options for the API call
 * @returns {Object} API state and actions
 */
export const useApiDelete = (url, options = {}) => {
  return useApi(url, 'DELETE', options);
};