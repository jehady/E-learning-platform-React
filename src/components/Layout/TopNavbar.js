import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  FaSearch, FaBell, FaShoppingCart, FaUser, FaMoon, FaSun, 
  FaGlobe, FaBars, FaCog 
} from 'react-icons/fa';

const TopNavbar = ({ onToggleSidebar }) => {
  const { user, hasAnyRole } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className={`top-navbar ${theme}`}>
      <div className="navbar-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar}>
          <FaBars />
        </button>
        
        <div className="navbar-search">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder={t('search')} 
            className="search-input"
          />
        </div>
      </div>

      <div className="navbar-right">
        <button className="navbar-icon-btn" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>

        <button className="navbar-icon-btn" onClick={toggleLanguage}>
          <FaGlobe />
          <span className="language-text">{language.toUpperCase()}</span>
        </button>

        {hasAnyRole(['guest', 'woman', 'child']) && (
          <Link to="/cart" className="navbar-icon-btn cart-btn">
            <FaShoppingCart />
            <span className="cart-badge">3</span>
          </Link>
        )}

        <div className="navbar-notifications">
          <button 
            className="navbar-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            <span className="notification-badge">5</span>
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <button className="mark-all-read">Mark all read</button>
              </div>
              <div className="notifications-list">
                <div className="notification-item">
                  <div className="notification-content">
                    <p>New course available: Advanced React</p>
                    <span className="notification-time">2 hours ago</span>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-content">
                    <p>Assignment deadline approaching</p>
                    <span className="notification-time">1 day ago</span>
                  </div>
                </div>
              </div>
              <Link to="/notifications" className="view-all-notifications">
                View All Notifications
              </Link>
            </div>
          )}
        </div>

        <div className="navbar-user">
          <button 
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img 
              src={user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} 
              alt="User" 
              className="user-avatar"
            />
          </button>
          
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <img 
                  src={user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} 
                  alt="User" 
                  className="dropdown-avatar"
                />
                <div>
                  <div className="dropdown-name">{user?.name || 'User'}</div>
                  <div className="dropdown-role">{user?.role || 'Guest'}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <Link to="/profile" className="dropdown-item">
                <FaUser /> {t('profile')}
              </Link>
              <Link to="/settings" className="dropdown-item">
                <FaCog /> {t('settings')}
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-btn">
                {t('logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;