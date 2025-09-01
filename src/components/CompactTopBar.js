import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaTags, FaShoppingCart, FaBell, FaWallet } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const CompactTopBar = () => {
  const { roles } = useAuth();
  const { pathname } = useLocation();
  const isLearner = roles.includes('woman') || roles.includes('child');
  if (!isLearner) return null;

  const Active = ({ to, children }) => (
    <Link to={to} className={`ctb-link ${pathname === to ? 'active' : ''}`}>{children}</Link>
  );

  return (
    <div className="compact-topbar">
      <div className="ctb-left">
        <Active to="/home"><FaHome /> Home</Active>
        <Active to="/my-courses"><FaBook /> My Courses</Active>
        <Active to="/promotions"><FaTags /> Offers</Active>
      </div>
      <div className="ctb-right">
        <Link to="/cart" className="ctb-icon" aria-label="Cart"><FaShoppingCart /></Link>
        <Link to="/notifications" className="ctb-icon" aria-label="Notifications"><FaBell /></Link>
        <Link to="/wallet" className="ctb-icon" aria-label="Wallet"><FaWallet /></Link>
      </div>
    </div>
  );
};

export default CompactTopBar;


