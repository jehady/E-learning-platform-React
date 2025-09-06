import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-hero-v2">
      <div className="landing-overlay" /> 
      <main className="landing-main">
        <div className="landing-content">
          <h1 className="landing-hero-title">"[Platform Name]":</h1>
          <p className="landing-hero-sub">Empowering you through online education. Welcome.</p>
          <Link to="/signup" className="landing-cta-btn">Start for free</Link>
        </div>
      </main>
      
    </div>
  );
};

export default Landing; 