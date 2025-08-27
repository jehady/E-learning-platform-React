import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FaUsers, FaSearch, FaFilter, FaPlus, FaBan, 
  FaEdit, FaEye, FaTrash, FaUserShield, FaUserGraduate 
} from 'react-icons/fa';
import BanUserModal from '../../components/BanUserModal';
import './UserManagement.css';

const UserManagement = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUser, setShowAddUser] = useState(false);

  const mockUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      role: 'woman',
      status: 'active',
      joinDate: '2023-01-15',
      lastActive: '2024-01-20',
      coursesEnrolled: 8,
      coursesCompleted: 6
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: 'teacher',
      status: 'active',
      joinDate: '2022-11-20',
      lastActive: '2024-01-19',
      coursesCreated: 12,
      totalStudents: 456
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      role: 'child',
      status: 'active',
      joinDate: '2023-03-10',
      lastActive: '2024-01-18',
      coursesEnrolled: 5,
      coursesCompleted: 3
    },
    {
      id: 4,
      name: 'James Rodriguez',
      email: 'james.rodriguez@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      role: 'supervisor',
      status: 'active',
      joinDate: '2022-08-15',
      lastActive: '2024-01-20',
      managedUsers: 25,
      approvedCourses: 45
    }
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleBanUser = (user) => {
    setSelectedUser(user);
    setBanModalOpen(true);
  };

  const handleBanSuccess = () => {
    // Refresh users list
    console.log('User banned successfully');
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <FaUserShield className="role-icon admin" />;
      case 'supervisor': return <FaUserShield className="role-icon supervisor" />;
      case 'teacher': return <FaUserGraduate className="role-icon teacher" />;
      case 'woman': return <FaUsers className="role-icon woman" />;
      case 'child': return <FaUsers className="role-icon child" />;
      default: return <FaUsers className="role-icon guest" />;
    }
  };

  const getRoleStats = () => {
    const stats = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    
    return [
      { role: 'all', count: users.length, label: 'All Users' },
      { role: 'admin', count: stats.admin || 0, label: 'Admins' },
      { role: 'supervisor', count: stats.supervisor || 0, label: 'Supervisors' },
      { role: 'teacher', count: stats.teacher || 0, label: 'Teachers' },
      { role: 'woman', count: stats.woman || 0, label: 'Women' },
      { role: 'child', count: stats.child || 0, label: 'Children' }
    ];
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h1 className="page-title">
          <FaUsers /> User Management
        </h1>
        <div className="page-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddUser(true)}
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      <div className="user-stats">
        {getRoleStats().map(stat => (
          <div 
            key={stat.role}
            className={`stat-item ${activeTab === stat.role ? 'active' : ''}`}
            onClick={() => setActiveTab(stat.role)}
          >
            <div className="stat-count">{stat.count}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="users-section">
        <div className="section-header">
          <div className="search-filter">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="filter-btn">
              <FaFilter /> Filters
            </button>
          </div>
          
          <div className="section-actions">
            <button className="btn btn-secondary">Export</button>
            <select className="sort-select">
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Join Date</option>
              <option value="activity">Sort by Last Active</option>
            </select>
          </div>
        </div>

        <div className="users-table">
          <div className="table-header">
            <div className="table-cell">User</div>
            <div className="table-cell">Role</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Join Date</div>
            <div className="table-cell">Last Active</div>
            <div className="table-cell">Stats</div>
            <div className="table-cell">Actions</div>
          </div>
          
          <div className="table-body">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading users...</p>
              </div>
            ) : (
              filteredUsers.map(user => (
                <div key={user.id} className="table-row">
                  <div className="table-cell user-cell">
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                    <div className="user-info">
                      <h4 className="user-name">{user.name}</h4>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="table-cell role-cell">
                    {getRoleIcon(user.role)}
                    <span className="role-text">{user.role}</span>
                  </div>
                  
                  <div className="table-cell status-cell">
                    <span className={`status-badge ${user.status}`}>
                      {user.status}
                    </span>
                  </div>
                  
                  <div className="table-cell date-cell">
                    {user.joinDate}
                  </div>
                  
                  <div className="table-cell activity-cell">
                    {user.lastActive}
                  </div>
                  
                  <div className="table-cell stats-cell">
                    {user.role === 'teacher' ? (
                      <div className="user-stats">
                        <span>{user.coursesCreated} courses</span>
                        <span>{user.totalStudents} students</span>
                      </div>
                    ) : user.role === 'supervisor' ? (
                      <div className="user-stats">
                        <span>{user.managedUsers} users</span>
                        <span>{user.approvedCourses} approved</span>
                      </div>
                    ) : (
                      <div className="user-stats">
                        <span>{user.coursesEnrolled} enrolled</span>
                        <span>{user.coursesCompleted} completed</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="table-cell actions-cell">
                    <div className="action-buttons">
                      <button className="action-btn view-btn">
                        <FaEye />
                      </button>
                      <button className="action-btn edit-btn">
                        <FaEdit />
                      </button>
                      <button 
                        className="action-btn ban-btn"
                        onClick={() => handleBanUser(user)}
                      >
                        <FaBan />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {filteredUsers.length === 0 && !loading && (
          <div className="empty-state">
            <FaUsers className="empty-icon" />
            <h2>No users found</h2>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {banModalOpen && selectedUser && (
        <BanUserModal
          isOpen={banModalOpen}
          onClose={() => setBanModalOpen(false)}
          user={selectedUser}
          userType={selectedUser.role}
          onBanSuccess={handleBanSuccess}
        />
      )}
    </div>
  );
};

export default UserManagement;