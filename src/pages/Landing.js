import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Landing = () => {
  return (
    <div className="landing-hero-v2">
      <div className="landing-overlay" />
      <header className="landing-header">
        <img src="/favicon.ico" alt="Logo" className="landing-logo" />
        <span className="landing-title">Logo</span>
        <nav className="landing-nav">
          <a href="#" className="active">Home</a>
          <a href="#">My Courses</a>
          <a href="#">Dashboard</a>
          <a href="#">Promotions</a>
          <a href="#">Support</a>
        </nav>
        <input type="text" placeholder="Search..." className="landing-search" />
        <span className="landing-icon">🔔</span>
        <span className="landing-icon">🛒</span>
        <Link to="/signup" className="landing-signup-btn">Sign up</Link>
      </header>
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