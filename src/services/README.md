# Services

This directory contains service modules that encapsulate business logic and provide reusable functionality across the application.

## AuthService

The AuthService handles all authentication-related functionality including:

- User sign in and sign up
- Token management
- User data storage and retrieval
- Role and permission checking
- Session management

### Usage

```javascript
import { authService } from './services/authService';

// Sign in a user
try {
  const userData = await authService.signIn('username', 'password');
  console.log('User signed in:', userData);
} catch (error) {
  console.error('Sign in failed:', error.message);
}

// Check if user is authenticated
if (authService.isAuthenticated()) {
  console.log('User is authenticated');
}

// Get user roles
const roles = authService.getUserRoles();
if (roles.includes('admin')) {
  console.log('User is an admin');
}

// Sign out
authService.signOut();
```

### API

#### `signIn(login, password)`
Signs in a user with the provided credentials.

#### `signUp(userData)`
Registers a new user with the provided data.

#### `setAuthData(userData)`
Stores authentication data in localStorage.

#### `getCurrentUser()`
Returns the current user data or null if not authenticated.

#### `getUserRoles()`
Returns an array of user roles.

#### `getUserPermissions()`
Returns an array of user permissions.

#### `hasRole(role)`
Checks if the user has a specific role.

#### `hasAnyRole(roles)`
Checks if the user has any of the specified roles.

#### `hasPermission(permission)`
Checks if the user has a specific permission.

#### `isAuthenticated()`
Checks if the user is authenticated.

#### `signOut()`
Signs out the current user.

#### `getToken()`
Returns the authentication token or null if not authenticated.

#### `refreshToken()`
Refreshes the authentication token.