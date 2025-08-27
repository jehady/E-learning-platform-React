import axios from 'axios';

const API_BASE_URL = 'https://536f629d58c5.ngrok-free.app';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '1'
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common response patterns
apiClient.interceptors.response.use(
  (response) => {
    // Transform successful responses to extract data
    return response.data?.data || response.data || response;
  },
  (error) => {
    // Handle common error patterns
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear auth data
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          localStorage.removeItem('userRoles');
          localStorage.removeItem('userPermissions');
          break;
        case 403:
          // Forbidden - user doesn't have permission
          console.warn('Access forbidden:', data.message || 'You do not have permission to perform this action');
          break;
        case 404:
          // Not found
          console.warn('Resource not found:', data.message || 'The requested resource was not found');
          break;
        case 500:
          // Server error
          console.error('Server error:', data.message || 'An internal server error occurred');
          break;
        default:
          // Other errors
          console.error(`HTTP ${status}:`, data.message || 'An error occurred');
      }
      
      // Return a consistent error structure
      return Promise.reject({
        status,
        message: data.message || 'An error occurred',
        data: data
      });
    } else if (error.request) {
      // Network error
      console.error('Network error:', 'Could not connect to the server');
      return Promise.reject({
        status: null,
        message: 'Network error: Could not connect to the server',
        data: null
      });
    } else {
      // Other errors
      console.error('Error:', error.message);
      return Promise.reject({
        status: null,
        message: error.message || 'An unexpected error occurred',
        data: null
      });
    }
  }
);

// API service wrapper
class ApiService {
  constructor(client) {
    this.client = client;
  }

  // Generic request method
  async request(config) {
    try {
      const response = await this.client(config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // HTTP methods
  async get(url, config = {}) {
    return this.request({ ...config, method: 'GET', url });
  }

  async post(url, data = {}, config = {}) {
    return this.request({ ...config, method: 'POST', url, data });
  }

  async put(url, data = {}, config = {}) {
    return this.request({ ...config, method: 'PUT', url, data });
  }

  async patch(url, data = {}, config = {}) {
    return this.request({ ...config, method: 'PATCH', url, data });
  }

  async delete(url, config = {}) {
    return this.request({ ...config, method: 'DELETE', url });
  }

  // Get base URL
  getBaseUrl() {
    return API_BASE_URL;
  }

  // Set auth token
  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }
}

// Export singleton instance
export const apiService = new ApiService(apiClient);
export default apiClient;