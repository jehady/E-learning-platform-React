import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaBell, FaCheck, FaTrash, FaFilter, 
  FaBook, FaUsers, FaAward, FaExclamationTriangle 
} from 'react-icons/fa';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const { user, hasAnyRole } = useAuth();
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const mockNotifications = [
    {
      id: 1,
      type: 'course',
      title: 'New Course Available',
      message: 'A new course "Advanced React Development" has been published',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      icon: FaBook,
      color: 'var(--primary-color)',
      actionUrl: '/courses/123'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Certificate Earned',
      message: 'Congratulations! You have earned a certificate for "JavaScript Fundamentals"',
      timestamp: '2024-01-19T15:45:00Z',
      read: false,
      icon: FaAward,
      color: 'var(--warning-color)',
      actionUrl: '/certificates'
    },
    {
      id: 3,
      type: 'system',
      title: 'Assignment Due Soon',
      message: 'Your assignment for "UI/UX Design" is due in 2 days',
      timestamp: '2024-01-18T09:15:00Z',
      read: true,
      icon: FaExclamationTriangle,
      color: 'var(--danger-color)',
      actionUrl: '/courses/456/assignments'
    },
    {
      id: 4,
      type: 'social',
      title: 'New Student Enrolled',
      message: 'Sarah Johnson has enrolled in your "React Basics" course',
      timestamp: '2024-01-17T14:20:00Z',
      read: true,
      icon: FaUsers,
      color: 'var(--success-color)',
      actionUrl: '/trainer/students'
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    if (filter !== 'all') return notif.type === filter;
    return true;
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1 className="page-title">
          <FaBell /> Notifications
          {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          }
        </h1>
        <div className="notifications-actions">
          {unreadCount > 0 && (
            <button 
              className="btn btn-secondary"
              onClick={handleMarkAllAsRead}
            >
              <FaCheck /> Mark All Read
            </button>
          )}
        </div>
      </div>

      <div className="notifications-filters">
        <div className="filter-tabs">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'course', label: 'Courses', count: notifications.filter(n => n.type === 'course').length },
            { key: 'achievement', label: 'Achievements', count: notifications.filter(n => n.type === 'achievement').length },
            { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
          ].map(tab => (
            <button
              key={tab.key}
              className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="notifications-content">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading notifications...</p>
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="notifications-list">
            {filteredNotifications.map(notification => {
              const IconComponent = notification.icon;
              return (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-icon" style={{ color: notification.color }}>
                    <IconComponent />
                  </div>
                  
                  <div className="notification-content">
                    <div className="notification-main">
                      <h3 className="notification-title">{notification.title}</h3>
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{getTimeAgo(notification.timestamp)}</span>
                    </div>
                  </div>
                  
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        className="action-btn mark-read-btn"
                        onClick={() => handleMarkAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteNotification(notification.id)}
                      title="Delete notification"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <FaBell className="empty-icon" />
            <h2>No notifications</h2>
            <p>
              {filter === 'all' 
                ? 'You have no notifications at the moment.' 
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        )}
      </div>

      {hasAnyRole(['admin', 'supervisor']) && (
        <div className="notification-settings">
          <div className="settings-card">
            <h2>Notification Settings</h2>
            <div className="settings-options">
              <div className="setting-item">
                <label className="setting-label">
                  <input type="checkbox" defaultChecked />
                  <span>Course enrollments</span>
                </label>
              </div>
              <div className="setting-item">
                <label className="setting-label">
                  <input type="checkbox" defaultChecked />
                  <span>New course submissions</span>
                </label>
              </div>
              <div className="setting-item">
                <label className="setting-label">
                  <input type="checkbox" defaultChecked />
                  <span>User registrations</span>
                </label>
              </div>
              <div className="setting-item">
                <label className="setting-label">
                  <input type="checkbox" />
                  <span>System updates</span>
                </label>
              </div>
            </div>
            <button className="btn btn-primary">Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;