import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase'; // Assuming firebase.js is in the parent directory
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(''); // State for user type

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  if (password !== passwordConfirmation) {
    setError('Passwords do not match.');
    setLoading(false);
    return;
  }

  try {
    // Create FormData
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    formData.append('user_type', 'oman');

    // Make Axios POST request
    const response = await axios.post('https://c260b3cab0b6.ngrok-free.app/api/sign_up', formData, {
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': '1',
      },
    });
    console.log(response.data);

    // Check response content type
    const contentType = response.headers['content-type'];
    let responseData;
    if (contentType && contentType.includes('application/json')) {
      responseData = response.data; // Axios automatically parses JSON
    } else {
      // Handle non-JSON responses if necessary
      responseData = response.data;
      console.error('Received non-JSON response:', responseData);
      throw new Error(`Server responded with non-JSON content. Status: ${response.status}. Response: ${responseData.substring(0, 200)}...`);
    }

    // Success handling
    console.log('Sign up successful:', responseData);
    navigate('/my-courses'); // Redirect on success

  } catch (err) {
    setError(err.message);
    console.error('Sign up error:', err);
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithPopup(auth, googleProvider);
      navigate('/my-courses');
    } catch (err) {
      setError(err.message);
      console.error('Google sign-up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirmation">Confirm Password:</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userType">User Type:</label>
            <div className="radio-group">
              <input
                type="radio"
                id="women"
                name="userType"
                value="women"
                checked={userType === 'women'}
                onChange={(e) => setUserType(e.target.value)}
                required
              />
              <label htmlFor="women">Women</label>

              <input
                type="radio"
                id="child"
                name="userType"
                value="child"
                checked={userType === 'child'}
                onChange={(e) => setUserType(e.target.value)}
                required
              />
              <label htmlFor="child">Child</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="social-login">
          <p>Or continue with</p>
          <button onClick={handleGoogleSignUp} className="btn btn-google">
            <img src="/images/google-icon.png" alt="Google" />
            Continue with Google
          </button>
        </div>

        <div className="login-links">
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
          <p>
            <Link to="/reset-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;