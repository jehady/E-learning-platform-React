import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import CompactTopBar from '../CompactTopBar';
import './Layout.css';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const HIDE_CHROME = ['/signin','/signup','/reset-password','/email-verification'];
  const hideChrome = HIDE_CHROME.some(p => pathname.startsWith(p));

  // Hide chrome only on explicit auth pages
  if (hideChrome) {
    return children;
  }

  const roles = (typeof window !== 'undefined') ? (JSON.parse(localStorage.getItem('userRoles') || '[]')) : [];
  const learner = roles.includes('woman') || roles.includes('child');

  return (
    <div className="layout">
      <div className="layout-main">
        {/* Show compact bar for women/child roles; otherwise use full header */}
        {learner ? (
          <CompactTopBar />
        ) : (
          <Header />
        )}
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;