import React from 'react';
import { Link } from 'react-router-dom';

const TeacherVerification = () => {
  return (
    <div className="auth-container">
      <div className="verification-message">
        <h2>Registration Submitted Successfully!</h2>
        <div className="message-content">
          <p>Thank you for your interest in becoming a teacher on our platform.</p>
          <p>Your application has been received and is currently under review by our admin team.</p>
          <p>We will process your request as soon as possible and notify you via email once your account is approved.</p>
        </div>
        <div className="verification-actions">
          <Link to="/" className="auth-button">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherVerification;