import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from './useAuth';
import { authService } from '../services/authService';

// Mock the authService
jest.mock('../services/authService', () => ({
  authService: {
    isAuthenticated: jest.fn(),
    getCurrentUser: jest.fn(),
    getUserRoles: jest.fn(),
    getUserPermissions: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn()
  }
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with default values', () => {
      authService.isAuthenticated.mockReturnValue(false);
      authService.getCurrentUser.mockReturnValue(null);
      authService.getUserRoles.mockReturnValue([]);
      authService.getUserPermissions.mockReturnValue([]);

      const { result } = renderHook(() => useAuth());

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.roles).toEqual([]);
      expect(result.current.permissions).toEqual([]);
      expect(result.current.loading).toBe(true);
    });
  });

  describe('checkAuthStatus', () => {
    it('should set authenticated state when user is authenticated', () => {
      const mockUser = { id: 1, name: 'Test User' };
      const mockRoles = ['user'];
      const mockPermissions = ['read'];

      authService.isAuthenticated.mockReturnValue(true);
      authService.getCurrentUser.mockReturnValue(mockUser);
      authService.getUserRoles.mockReturnValue(mockRoles);
      authService.getUserPermissions.mockReturnValue(mockPermissions);

      const { result } = renderHook(() => useAuth());

      // Wait for useEffect to complete
      act(() => {
        result.current.checkAuthStatus();
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.roles).toEqual(mockRoles);
      expect(result.current.permissions).toEqual(mockPermissions);
      expect(result.current.loading).toBe(false);
    });

    it('should set unauthenticated state when user is not authenticated', () => {
      authService.isAuthenticated.mockReturnValue(false);

      const { result } = renderHook(() => useAuth());

      // Wait for useEffect to complete
      act(() => {
        result.current.checkAuthStatus();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.roles).toEqual([]);
      expect(result.current.permissions).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });

  describe('signIn', () => {
    it('should set user data on successful sign in', async () => {
      const mockUserData = {
        token: 'test-token',
        user: { id: 1, name: 'Test User' },
        roles: ['user'],
        permissions: ['read']
      };

      authService.signIn.mockResolvedValue(mockUserData);

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signIn('testuser', 'password');
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUserData);
      expect(result.current.roles).toEqual(['user']);
      expect(result.current.permissions).toEqual(['read']);
      expect(result.current.loading).toBe(false);
    });

    it('should handle sign in error', async () => {
      const errorMessage = 'Invalid credentials';
      authService.signIn.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useAuth());

      await expect(
        act(async () => {
          await result.current.signIn('testuser', 'wrongpassword');
        })
      ).rejects.toThrow(errorMessage);

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.roles).toEqual([]);
      expect(result.current.permissions).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });

  describe('signOut', () => {
    it('should clear user data on sign out', () => {
      authService.signOut.mockImplementation(() => {});

      const { result } = renderHook(() => useAuth());

      // Set initial state to authenticated
      act(() => {
        result.current.isAuthenticated = true;
        result.current.user = { id: 1, name: 'Test User' };
        result.current.roles = ['user'];
        result.current.permissions = ['read'];
      });

      // Sign out
      act(() => {
        result.current.signOut();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.roles).toEqual([]);
      expect(result.current.permissions).toEqual([]);
    });
  });

  describe('hasRole', () => {
    it('should return true when user has the specified role', () => {
      const { result } = renderHook(() => useAuth());

      // Set roles
      act(() => {
        result.current.roles = ['user', 'admin'];
      });

      expect(result.current.hasRole('admin')).toBe(true);
    });

    it('should return false when user does not have the specified role', () => {
      const { result } = renderHook(() => useAuth());

      // Set roles
      act(() => {
        result.current.roles = ['user'];
      });

      expect(result.current.hasRole('admin')).toBe(false);
    });
  });

  describe('hasPermission', () => {
    it('should return true when user has the specified permission', () => {
      const { result } = renderHook(() => useAuth());

      // Set permissions
      act(() => {
        result.current.permissions = ['read', 'write'];
      });

      expect(result.current.hasPermission('write')).toBe(true);
    });

    it('should return false when user does not have the specified permission', () => {
      const { result } = renderHook(() => useAuth());

      // Set permissions
      act(() => {
        result.current.permissions = ['read'];
      });

      expect(result.current.hasPermission('write')).toBe(false);
    });
  });
});