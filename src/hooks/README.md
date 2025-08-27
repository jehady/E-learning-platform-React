# Hooks

This directory contains custom React hooks that provide reusable functionality across the application.

## useAuth Hook

The useAuth hook provides authentication state and actions for managing user authentication.

### Usage

```javascript
import { useAuth } from '../hooks/useAuth';

const MyComponent = () => {
  const { 
    isAuthenticated, 
    user, 
    roles, 
    permissions, 
    loading,
    signIn,
    signOut,
    hasRole,
    hasAnyRole,
    hasPermission
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

### API

#### `useAuth()`
Returns an object with the following properties:

- `isAuthenticated` (boolean): Whether the user is authenticated
- `user` (object|null): Current user data or null if not authenticated
- `roles` (array): Array of user roles
- `permissions` (array): Array of user permissions
- `loading` (boolean): Whether the authentication state is being loaded
- `signIn(login, password)`: Function to sign in a user
- `signOut()`: Function to sign out the current user
- `hasRole(role)`: Function to check if user has a specific role
- `hasAnyRole(roles)`: Function to check if user has any of the specified roles
- `hasPermission(permission)`: Function to check if user has a specific permission
- `checkAuthStatus()`: Function to manually check authentication status

## useApi Hook

The useApi hook provides a convenient way to make API calls with automatic loading and error handling.

### Usage

```javascript
import { useApiGet, useApiPost } from '../hooks/useApi';

const MyComponent = () => {
  // GET request
  const { data: users, loading, error, refresh } = useApiGet('/api/users');
  
  // POST request
  const { execute: createUser, loading: creating, error: createError } = useApiPost('/api/users');

  const handleCreateUser = async () => {
    try {
      const newUser = await createUser({ name: 'John Doe', email: 'john@example.com' });
      console.log('User created:', newUser);
      refresh(); // Refresh the users list
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={handleCreateUser} disabled={creating}>
        {creating ? 'Creating...' : 'Create User'}
      </button>
      {createError && <div>Error: {createError.message}</div>}
    </div>
  );
};
```

### API

#### `useApi(url, method, options)`
Generic hook for making API calls.

#### `useApiGet(url, options)`
Specialized hook for GET requests.

#### `useApiPost(url, options)`
Specialized hook for POST requests.

#### `useApiPut(url, options)`
Specialized hook for PUT requests.

#### `useApiDelete(url, options)`
Specialized hook for DELETE requests.

Each hook returns an object with the following properties:

- `data` (any): The response data from the API
- `loading` (boolean): Whether the request is in progress
- `error` (object|null): Error information if the request failed
- `execute(requestData, requestConfig)`: Function to manually execute the request
- `refresh()`: Function to refresh/re-execute the request