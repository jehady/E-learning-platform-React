import { authService } from './authService';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

// Mock axios
jest.mock('axios', () => ({
  create: () => ({
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  })
}));

describe('AuthService', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorage.clear();
  });

  describe('setAuthData', () => {
    it('should store user data in localStorage', () => {
      const userData = {
        token: 'test-token',
        roles: ['user'],
        permissions: ['read']
      };

      authService.setAuthData(userData);

      expect(localStorage.getItem('token')).toBe('test-token');
      expect(JSON.parse(localStorage.getItem('userRoles'))).toEqual(['user']);
      expect(JSON.parse(localStorage.getItem('userPermissions'))).toEqual(['read']);
    });

    it('should throw error if no token provided', () => {
      const userData = {
        roles: ['user'],
        permissions: ['read']
      };

      expect(() => {
        authService.setAuthData(userData);
      }).toThrow('No authentication token received');
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorage.setItem('token', 'test-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false when no token exists', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('hasRole', () => {
    it('should return true when user has role', () => {
      localStorage.setItem('userRoles', JSON.stringify(['admin', 'user']));
      expect(authService.hasRole('admin')).toBe(true);
    });

    it('should return false when user does not have role', () => {
      localStorage.setItem('userRoles', JSON.stringify(['user']));
      expect(authService.hasRole('admin')).toBe(false);
    });
  });

  describe('signOut', () => {
    it('should clear all auth data from localStorage', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('userData', JSON.stringify({ id: 1 }));
      localStorage.setItem('userRoles', JSON.stringify(['user']));
      localStorage.setItem('userPermissions', JSON.stringify(['read']));

      authService.signOut();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('userData')).toBeNull();
      expect(localStorage.getItem('userRoles')).toBeNull();
      expect(localStorage.getItem('userPermissions')).toBeNull();
    });
  });
});