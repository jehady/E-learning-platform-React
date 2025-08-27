import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-modern">
      <div className="header-container">
        <div className="header-logo">
          <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="8" height="24" rx="2" fill="#5D5FEF" />
            <rect x="10" width="8" height="24" rx="2" fill="#F8C51B" />
            <rect x="20" width="8" height="24" rx="2" fill="#F97316" />
            <rect x="30" width="8" height="24" rx="2" fill="#16A34A" />
          </svg>
          <span className="header-logo-text">Logo</span>
        </div>
        
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={`header-nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/my-courses" className={`header-nav-link ${isActive('/my-courses') ? 'active' : ''}`}>My Courses</Link>
          <Link to="/dashboard" className={`header-nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/promotions" className={`header-nav-link ${isActive('/promotions') ? 'active' : ''}`}>Promotions</Link>
          <Link to="/support" className={`header-nav-link ${isActive('/support') ? 'active' : ''}`}>Support</Link>
        </nav>
        
        <div className="header-actions">
          <div className="header-search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L15.7071 14.2929ZM14.2929 15.7071L10.2929 11.7071L11.7071 10.2929L15.7071 14.2929L14.2929 15.7071Z" fill="#666666"/>
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#666666" strokeWidth="2"/>
            </svg>
            <input type="text" placeholder="Search..." className="header-search-input" />
          </div>
          
          <Link to="/notifications" className="header-icon-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.44v0a3.5 3.5 0 0 1 3.5 3.5v1.82c0 .34.1.68.3.97l1.45 2.14a1 1 0 0 1-.83 1.56H7.58a1 1 0 0 1-.83-1.56l1.45-2.14c.2-.29.3-.63.3-.97V9.94A3.5 3.5 0 0 1 12 6.44v0z" stroke="#666666" strokeWidth="1.5"/>
              <path d="M13.73 17h-3.46a1.73 1.73 0 1 0 3.46 0z" stroke="#666666" strokeWidth="1.5"/>
            </svg>
          </Link>
          
          <Link to="/cart" className="header-icon-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h19l-3 10H6L3 6z" stroke="#666666" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="#666666" strokeWidth="1.5"/>
              <path d="M17 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="#666666" strokeWidth="1.5"/>
            </svg>
          </Link>
          <Link to="/instructor-profile" className="header-user-profile">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="header-user-avatar" />
          </Link>
        </div>

        <button 
          className="header-mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;