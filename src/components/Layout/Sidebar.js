import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  FaHome, FaBook, FaChartBar, FaUser, FaCog, FaUsers, 
  FaGraduationCap, FaBell, FaWallet, FaCertificate,
  FaTasks, FaComments, FaTrophy, FaShoppingCart,
  FaPlus, FaEye, FaUserShield, FaUserCog
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, hasAnyRole, signOut } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { icon: FaHome, label: t('home'), path: '/home', roles: ['guest', 'woman', 'child'] }
    ];

    // Guest/Trainee/Child items
    if (hasAnyRole(['guest', 'woman', 'child'])) {
      baseItems.push(
        { icon: FaBook, label: t('courses'), path: '/courses', roles: ['guest', 'woman', 'child'] },
        { icon: FaGraduationCap, label: 'My Courses', path: '/my-courses', roles: ['guest', 'woman', 'child'] },
        { icon: FaChartBar, label: t('dashboard'), path: '/dashboard', roles: ['guest', 'woman', 'child'] },
        { icon: FaUser, label: t('profile'), path: '/profile', roles: ['guest', 'woman', 'child'] },
        { icon: FaWallet, label: 'Wallet', path: '/wallet', roles: ['guest', 'woman', 'child'] },
        { icon: FaCertificate, label: 'Certificates', path: '/certificates', roles: ['guest', 'woman', 'child'] },
        { icon: FaTasks, label: 'To-Do List', path: '/todo', roles: ['guest', 'woman', 'child'] },
        { icon: FaTrophy, label: 'Leaderboard', path: '/leaderboard', roles: ['guest', 'woman', 'child'] },
        { icon: FaShoppingCart, label: 'Cart', path: '/cart', roles: ['guest', 'woman', 'child'] }
      );
    }

    // Trainer items
    if (hasAnyRole(['teacher'])) {
      baseItems.push(
        { icon: FaChartBar, label: 'Trainer Dashboard', path: '/trainer/dashboard', roles: ['teacher'] },
        { icon: FaPlus, label: 'Create Course', path: '/trainer/create-course', roles: ['teacher'] },
        { icon: FaBook, label: 'My Courses', path: '/trainer/courses', roles: ['teacher'] },
        { icon: FaUsers, label: 'Students', path: '/trainer/students', roles: ['teacher'] },
        { icon: FaComments, label: 'Messages', path: '/trainer/messages', roles: ['teacher'] },
        { icon: FaEye, label: 'Insights', path: '/trainer/insights', roles: ['teacher'] }
      );
    }

    // Supervisor items
    if (hasAnyRole(['supervisor'])) {
      baseItems.push(
        { icon: FaChartBar, label: 'Supervisor Dashboard', path: '/supervisor/dashboard', roles: ['supervisor'] },
        { icon: FaUsers, label: 'Manage Teachers', path: '/supervisor/teachers', roles: ['supervisor'] },
        { icon: FaGraduationCap, label: 'Manage Students', path: '/supervisor/students', roles: ['supervisor'] },
        { icon: FaBook, label: 'Course Approval', path: '/supervisor/course-approval', roles: ['supervisor'] },
        { icon: FaBell, label: 'Notifications', path: '/supervisor/notifications', roles: ['supervisor'] },
        { icon: FaEye, label: 'Reports', path: '/supervisor/reports', roles: ['supervisor'] }
      );
    }

    // Admin items
    if (hasAnyRole(['admin'])) {
      baseItems.push(
        { icon: FaChartBar, label: 'Admin Dashboard', path: '/admin/dashboard', roles: ['admin'] },
        { icon: FaUserShield, label: 'Manage Admins', path: '/admin/admins', roles: ['admin'] },
        { icon: FaUserCog, label: 'Manage Supervisors', path: '/admin/supervisors', roles: ['admin'] },
        { icon: FaUsers, label: 'All Users', path: '/admin/users', roles: ['admin'] },
        { icon: FaBook, label: 'Categories', path: '/admin/categories', roles: ['admin'] },
        { icon: FaCog, label: 'System Settings', path: '/admin/settings', roles: ['admin'] }
      );
    }

    return baseItems.filter(item => hasAnyRole(item.roles));
  };

  const menuItems = getMenuItems();

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${theme}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="8" height="24" rx="2" fill="#5D5FEF" />
            <rect x="10" width="8" height="24" rx="2" fill="#F8C51B" />
            <rect x="20" width="8" height="24" rx="2" fill="#F97316" />
            <rect x="30" width="8" height="24" rx="2" fill="#16A34A" />
          </svg>
          <span className="sidebar-logo-text">EduPlatform</span>
        </div>
        <button className="sidebar-close" onClick={onClose}>×</button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon className="sidebar-nav-icon" />
              <span className="sidebar-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <img src={user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} alt="User" className="sidebar-user-avatar" />
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || 'User'}</div>
            <div className="sidebar-user-role">{user?.role || 'Guest'}</div>
          </div>
        </div>
        <button className="sidebar-logout" onClick={signOut}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;