import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaEdit, FaCamera, FaSave, FaBell, FaLock, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, hasAnyRole } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    location: user?.location || '',
    interests: user?.interests || []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // API call to update profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      location: user?.location || '',
      interests: user?.interests || []
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="avatar-container">
              <img 
                src={user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} 
                alt="Profile" 
                className="profile-avatar"
              />
              {isEditing && (
                <button className="avatar-edit-btn">
                  <FaCamera />
                </button>
              )}
            </div>
            <div className="profile-basic-info">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="profile-name-input"
                />
              ) : (
                <h1 className="profile-name">{user?.name}</h1>
              )}
              <p className="profile-role">{t(user?.role || 'guest')}</p>
              <div className="profile-stats">
                {hasAnyRole(['guest', 'woman', 'child']) && (
                  <>
                    <div className="stat-item">
                      <span className="stat-value">12</span>
                      <span className="stat-label">Courses</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">8</span>
                      <span className="stat-label">Certificates</span>
                    </div>
                  </>
                )}
                {hasAnyRole(['teacher']) && (
                  <>
                    <div className="stat-item">
                      <span className="stat-value">25</span>
                      <span className="stat-label">Courses Created</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">1,234</span>
                      <span className="stat-label">Students</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="btn btn-primary" onClick={handleSave}>
                  <FaSave /> {t('save')}
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  <FaTimes /> {t('cancel')}
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                <FaEdit /> {t('edit')}
              </button>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <div className="profile-section">
              <h2>Personal Information</h2>
              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    ) : (
                      <p className="form-value">{user?.email}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    ) : (
                      <p className="form-value">{user?.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <p className="form-value">{user?.location || 'Not provided'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="4"
                    />
                  ) : (
                    <p className="form-value">{user?.bio || 'No bio provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {hasAnyRole(['guest', 'woman', 'child']) && (
              <div className="profile-section">
                <h2>Learning Progress</h2>
                <div className="progress-stats">
                  <div className="progress-item">
                    <div className="progress-circle">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="progress-text">75%</div>
                    </div>
                    <p>Course Completion</p>
                  </div>
                  
                  <div className="progress-item">
                    <div className="progress-circle">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="progress-text">60%</div>
                    </div>
                    <p>Quiz Average</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="profile-sidebar">
            <div className="profile-card">
              <h3>Account Settings</h3>
              <div className="settings-list">
                <Link to="/settings/notifications" className="settings-item">
                  <FaBell /> Notification Preferences
                </Link>
                <Link to="/settings/privacy" className="settings-item">
                  <FaLock /> Privacy Settings
                </Link>
                <Link to="/settings/security" className="settings-item">
                  <FaLock /> Security
                </Link>
              </div>
            </div>

            {hasAnyRole(['guest', 'woman', 'child']) && (
              <div className="profile-card">
                <h3>Recent Achievements</h3>
                <div className="achievements-list">
                  <div className="achievement-item">
                    <div className="achievement-icon">🏆</div>
                    <div>
                      <p className="achievement-title">Course Completed</p>
                      <p className="achievement-desc">UI/UX Design Basics</p>
                    </div>
                  </div>
                  <div className="achievement-item">
                    <div className="achievement-icon">⭐</div>
                    <div>
                      <p className="achievement-title">Perfect Score</p>
                      <p className="achievement-desc">JavaScript Quiz</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;