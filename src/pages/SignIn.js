import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService'; 
import './SignIn.css';
import { API_BASE_URL } from '../utils/api';

const SignIn = () => {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const userData = await authService.signIn(loginIdentifier, password);
      console.log('userData', userData);

      const roles = userData.roles || [];
      if (roles.includes('admin')) {
        navigate('/AdminDashboard');
      } else if (roles.includes('supervisor')) {
        navigate('/SubAdminPage');
      } else if (roles.includes('teacher')) {
        navigate('/instructor-profile');
      } else {
        navigate('/home');
      }
    } catch (err) {
      if (err.status === 401) {
        setError('Invalid credentials. Please check your username/email and password.');
      } else if (err.status === 403) {
        setError('Access forbidden. You do not have permission to access this application.');
      } else if (err.status === null) {
        setError(err.message || 'Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'Sign in failed. Please try again later.');
      }
      console.error('Sign In Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${API_BASE_URL}/google/redirect`;
  };

  return (
    <div className="auth-page">
      <div className="auth-container-modern">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue your learning journey</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSignIn} className="auth-form">
          <div className="input-group">
            <label htmlFor="loginIdentifier">Email or Username</label>
            <input
              type="text"
              id="loginIdentifier"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
              placeholder="Enter your email or username"
              required
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="auth-google-btn"
          disabled={loading}
        >
          <img 
            src="https://developers.google.com/identity/images/g-logo.png" 
            alt="Google logo" 
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          Sign in with Google
        </button>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
          <p><Link to="/reset-password" className="auth-link">Forgot password?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
