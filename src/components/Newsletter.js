import React from 'react';

const Newsletter = () => {
  return (
    <div className="newsletter-modern">
      <h3 className="newsletter-title">Subscribe to our newsletter</h3>
      <p className="newsletter-text">For product announcements and exclusive insights</p>
      <div className="newsletter-form">
        <input type="email" placeholder="Your email" className="newsletter-input" />
        <button className="newsletter-button">Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;