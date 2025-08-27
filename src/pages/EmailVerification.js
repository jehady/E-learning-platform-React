import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const EmailVerification = () => {
  return (
    <div className="auth-page">
      <div className="auth-container-modern">
        <div className="auth-header">
          <div className="verification-icon">
            <FaEnvelope className="envelope-icon" />
          </div>
          <h1 className="auth-title">Verify Your Email</h1>
          <p className="auth-subtitle">
            We've sent a verification link to your email address. 
            Please check your inbox and click the link to verify your account.
          </p>
        </div>
        
        <div className="verification-content">
          <div className="verification-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-text">Check your email inbox</div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-text">Click the verification link</div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-text">Return here and sign in</div>
            </div>
          </div>
          
          <div className="verification-note">
            <FaCheckCircle className="check-icon" />
            <p>
              Once verified, you'll have full access to all features and courses.
            </p>
          </div>
        </div>
        
        <div className="verification-actions">
          <Link to="/signin" className="auth-primary-btn">
            Go to Sign In
          </Link>
        </div>
        
        <div className="auth-footer">
          <p>Didn't receive the email? <Link to="/resend-verification" className="auth-link">Resend verification</Link></p>
          <p>Need help? <Link to="/contact" className="auth-link">Contact support</Link></p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 