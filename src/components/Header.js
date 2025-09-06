import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, roles } = useAuth();

  const isActive = (path) => location.pathname === path;
  const isLandingPage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-card transition-all duration-300">
      <div className="flex items-center justify-between h-[70px] max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="8" height="24" rx="2" fill="#6366F1" />
            <rect x="10" width="8" height="24" rx="2" fill="#F8C51B" />
            <rect x="20" width="8" height="24" rx="2" fill="#F97316" />
            <rect x="30" width="8" height="24" rx="2" fill="#16A34A" />
          </svg>
          <span className="text-xl font-bold text-gray-900 ml-2">Logo</span>
        </div>
        
       
        <nav className={`flex items-center gap-6 md:flex ${isMobileMenuOpen ? 'flex' : 'hidden'} md:relative absolute md:top-auto top-[70px] md:left-auto left-0 md:right-auto right-0 md:flex-row flex-col md:bg-transparent bg-white md:p-0 p-4 md:shadow-none shadow-md z-40`}>
          <Link 
            to="/home" 
            className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-primary-500 ${isActive('/') ? 'text-primary-500 font-semibold' : 'text-gray-600'}`}
          >
            Home
          </Link>
          <Link 
            to="/Watch lATER" 
            className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-primary-500 ${isActive('/courses') ? 'text-primary-500 font-semibold' : 'text-gray-600'}`}
          >
            Courses
          </Link>
          
          {isAuthenticated && (roles.includes('child') || roles.includes('woman')) && (
            <>
              <Link 
                to="/my-courses" 
                className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-primary-500 ${isActive('/my-courses') ? 'text-primary-500 font-semibold' : 'text-gray-600'}`}
              >
                My Courses
              </Link>
              
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-primary-500 ${isActive('/dashboard') ? 'text-primary-500 font-semibold' : 'text-gray-600'}`}
              >
                Dashboard
              </Link>
            </>
          )}
          
          <Link 
            to="/my-courses" 
            className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-primary-500 ${isActive('/promotions') ? 'text-primary-500 font-semibold' : 'text-gray-600'}`}
          >
            MyCourses
          </Link>
          
          <Link 
            to="/UserProfile" 
            className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-primary-500 ${isActive('/support') ? 'text-primary-500 font-semibold' : 'text-gray-600'}`}
          >w
            Profile
          </Link>
          
          {/* Role-based links */}
          {isAuthenticated && (roles.includes('admin') || roles.includes('supervisor')) && (
            <Link 
              to="/supervisor/dashboard" 
              className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-primary-500 ${isActive('/supervisor/dashboard') ? 'text-primary-500 font-semibold' : 'text-gray-600'}`}
            >
              Approvals
            </Link>
          )}
          
          {isAuthenticated && roles.includes('admin') && (
            <Link 
              to="/admin/users" 
              className={`px-3 py-2 text-[15px] font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-primary-500 ${isActive('/admin/users') ? 'text-primary-500 font-semibold' : 'text-gray-600'}`}
            >
              Manage Users
            </Link>
          )}
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-[220px] lg:w-[220px] md:w-[180px]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
              <path d="M15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L15.7071 14.2929ZM14.2929 15.7071L10.2929 11.7071L11.7071 10.2929L15.7071 14.2929L14.2929 15.7071Z" fill="currentColor"/>
              <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="ml-2 bg-transparent border-none outline-none w-full text-sm text-gray-600 placeholder-gray-500"
            />
          </div>
          
          {/* Notifications */}
          <Link to="/notifications" className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M12 6.44v0a3.5 3.5 0 0 1 3.5 3.5v1.82c0 .34.1.68.3.97l1.45 2.14a1 1 0 0 1-.83 1.56H7.58a1 1 0 0 1-.83-1.56l1.45-2.14c.2-.29.3-.63.3-.97V9.94A3.5 3.5 0 0 1 12 6.44v0z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13.73 17h-3.46a1.73 1.73 0 1 0 3.46 0z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </Link>
          
          {/* Cart */}
          <Link to="/cart" className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
              <path d="M3 6h19l-3 10H6L3 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M17 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </Link>
          
          {/* User Profile or Auth Buttons */}
          {isAuthenticated ? (
            <Link to="/instructor-profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-primary-300 transition-colors">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </Link>
          ) : (
            isLandingPage && (
              <div className="flex items-center gap-3">
                <Link 
                  to="/signin" 
                  className="px-3 py-2 text-[15px] font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 text-[15px] font-semibold text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="hidden md:hidden flex-col items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-[7px]' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-[7px]' : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
