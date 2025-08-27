import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('https://74cda276e7e3.ngrok-free.app/api/send_code', {
        email: email
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '1'
        }
      });
      
      console.log(response.data);
      setMessage('Password reset code sent! Check your email for the verification code.');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Failed to send reset code. Please try again.');
      } else if (err.request) {
        setError('Network Error: Could not connect to the server. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Reset Password Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container-modern">
        <div className="auth-header">
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">Enter your email to receive a reset code</p>
        </div>
        
        {message && <div className="auth-success">{message}</div>}
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleReset} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="auth-primary-btn" disabled={loading}>
            {loading ? 'Sending Code...' : 'Send Reset Code'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p><Link to="/signin" className="auth-link">Back to Sign In</Link></p>
          <p>Don't have an account? <Link to="/signup" className="auth-link">Create one</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 