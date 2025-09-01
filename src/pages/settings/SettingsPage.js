import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  FaCog, FaUser, FaBell, FaLock, FaGlobe,
  FaPalette, FaKey, FaTrash, FaSave
} from 'react-icons/fa';
import './SettingsPage.css';

const SettingsPage = () => {
  const { user } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      courseUpdates: true,
      assignments: true,
      messages: false,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showProgress: true,
      allowMessages: true
    },
    preferences: {
      autoplay: true,
      subtitles: false,
      playbackSpeed: '1x',
      videoQuality: 'auto'
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // API call to save settings
  };

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'privacy', label: 'Privacy', icon: FaLock },
    { id: 'preferences', label: 'Preferences', icon: FaCog },
    { id: 'security', label: 'Security', icon: FaKey },
    { id: 'appearance', label: 'Appearance', icon: FaPalette }
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="page-title">
          <FaCog /> Settings
        </h1>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <nav className="settings-nav">
            {settingsTabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent className="nav-icon" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="settings-main">
          <div className="settings-section">
            {activeTab === 'profile' && (
              <div className="tab-content">
                <h2>Profile Settings</h2>
                <div className="form-group">
                  <label>Display Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    defaultValue={user?.bio}
                    className="form-textarea"
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    defaultValue={user?.location}
                    className="form-input"
                    placeholder="Your location"
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="tab-content">
                <h2>Notification Preferences</h2>
                <div className="settings-group">
                  <h3>Email Notifications</h3>
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="setting-item">
                      <label className="setting-toggle">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        <span className="setting-label">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="tab-content">
                <h2>Privacy Settings</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Profile Visibility</label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      className="form-select"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                  
                  {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                    <div key={key} className="setting-item">
                      <label className="setting-toggle">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        <span className="setting-label">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="tab-content">
                <h2>Learning Preferences</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Video Playback Speed</label>
                    <select
                      value={settings.preferences.playbackSpeed}
                      onChange={(e) => handleSettingChange('preferences', 'playbackSpeed', e.target.value)}
                      className="form-select"
                    >
                      <option value="0.5x">0.5x</option>
                      <option value="0.75x">0.75x</option>
                      <option value="1x">1x (Normal)</option>
                      <option value="1.25x">1.25x</option>
                      <option value="1.5x">1.5x</option>
                      <option value="2x">2x</option>
                    </select>
                  </div>
                  
                  <div className="setting-item">
                    <label>Video Quality</label>
                    <select
                      value={settings.preferences.videoQuality}
                      onChange={(e) => handleSettingChange('preferences', 'videoQuality', e.target.value)}
                      className="form-select"
                    >
                      <option value="auto">Auto</option>
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                    </select>
                  </div>
                  
                  {Object.entries(settings.preferences).filter(([key]) => !['playbackSpeed', 'videoQuality'].includes(key)).map(([key, value]) => (
                    <div key={key} className="setting-item">
                      <label className="setting-toggle">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleSettingChange('preferences', key, e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                        <span className="setting-label">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="tab-content">
                <h2>Appearance</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Theme</label>
                    <div className="theme-options">
                      <button 
                        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                        onClick={() => theme !== 'light' && toggleTheme()}
                      >
                        ☀️ Light
                      </button>
                      <button 
                        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                        onClick={() => theme !== 'dark' && toggleTheme()}
                      >
                        🌙 Dark
                      </button>
                    </div>
                  </div>
                  
                  <div className="setting-item">
                    <label>Language</label>
                    <div className="language-options">
                      <button 
                        className={`language-btn ${language === 'en' ? 'active' : ''}`}
                        onClick={() => language !== 'en' && toggleLanguage()}
                      >
                        🇺🇸 English
                      </button>
                      <button 
                        className={`language-btn ${language === 'ar' ? 'active' : ''}`}
                        onClick={() => language !== 'ar' && toggleLanguage()}
                      >
                        🇸🇦 العربية
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="tab-content">
                <h2>Security Settings</h2>
                <div className="settings-group">
                  <div className="security-item">
                    <div className="security-info">
                      <h4>Change Password</h4>
                      <p>Update your password to keep your account secure</p>
                    </div>
                    <button className="btn btn-secondary">Change Password</button>
                  </div>
                  
                  <div className="security-item">
                    <div className="security-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn btn-primary">Enable 2FA</button>
                  </div>
                  
                  <div className="security-item danger">
                    <div className="security-info">
                      <h4>Delete Account</h4>
                      <p>Permanently delete your account and all data</p>
                    </div>
                    <button className="btn btn-danger">
                      <FaTrash /> Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="settings-actions">
              <button className="btn btn-primary" onClick={handleSaveSettings}>
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;