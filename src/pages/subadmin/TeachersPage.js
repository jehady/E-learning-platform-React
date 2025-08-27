import React, { useState, useEffect } from 'react';
import { FaUsers, FaGraduationCap, FaBan, FaSearch, FaFilter, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import BanUserModal from '../../components/BanUserModal';

const TeachersPage = () => {
  const [activeTab, setActiveTab] = useState('teachers');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBanned, setShowBanned] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch banned users from API
  const fetchBannedUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://74cda276e7e3.ngrok-free.app/api/banned_users', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': '1'
        }
      });
      
      console.log('Banned users:', response.data);
      setTeachers(response.data.data || []);
    } catch (err) {
      console.error('Error fetching banned users:', err);
      // Fallback to mock data if API fails
      setTeachers([
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          courses: 12,
          students: 245,
          rating: 4.8,
          status: 'active',
          joinDate: '2023-01-15',
          isBanned: false
        },
        {
          id: 2,
          name: 'Michael Chen',
          email: 'michael.chen@email.com',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          courses: 8,
          students: 189,
          rating: 4.6,
          status: 'active',
          joinDate: '2023-02-20',
          isBanned: false
        },
        {
          id: 3,
          name: 'Emily Davis',
          email: 'emily.davis@email.com',
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
          courses: 15,
          students: 312,
          rating: 4.9,
          status: 'active',
          joinDate: '2022-11-10',
          isBanned: false
        },
        {
          id: 4,
          name: 'Robert Wilson',
          email: 'robert.wilson@email.com',
          avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
          courses: 6,
          students: 156,
          rating: 4.3,
          status: 'banned',
          joinDate: '2023-03-05',
          isBanned: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannedUsers();
  }, []);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBannedFilter = showBanned ? teacher.isBanned : !teacher.isBanned;
    return matchesSearch && matchesBannedFilter;
  });

  const handleBanUser = (user) => {
    setSelectedUser(user);
    setBanModalOpen(true);
  };

  const handleBanSuccess = () => {
    fetchBannedUsers(); // Refresh the list after banning
  };

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', path: '/subadmin' },
    { icon: '👩‍🏫', label: 'Teachers', path: '/teachers', active: true },
    { icon: '🎓', label: 'Students', path: '/students' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
    { icon: '🔗', label: 'Integrations', path: '/integrations' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fb', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #f0f1f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ padding: '32px 0 24px 32px', fontWeight: 700, fontSize: 24, color: '#5d5fef', letterSpacing: 1 }}>Logo</div>
          <nav>
            {sidebarItems.map((item, i) => (
              <div key={item.label} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '12px 32px', 
                background: item.active ? '#f5f6ff' : 'none', 
                color: item.active ? '#5d5fef' : '#222', 
                borderRadius: 8, 
                margin: '0 16px', 
                fontWeight: 500, 
                cursor: 'pointer' 
              }}>
                <span style={{ fontSize: 18, marginRight: 16 }}>{item.icon}</span> {item.label}
              </div>
            ))}
          </nav>
        </div>
        <div style={{ fontSize: 12, color: '#b0b3c7', textAlign: 'center', marginBottom: 12 }}>Made with <span style={{ color: '#5d5fef' }}>Yisily</span></div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 40px', minWidth: 0 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#5d5fef' }}>Teachers Management</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button 
              onClick={() => setShowBanned(!showBanned)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                background: showBanned ? '#ff4757' : '#f5f6ff',
                color: showBanned ? '#fff' : '#5d5fef',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              <FaBan /> {showBanned ? 'Show Active' : 'Show Banned'}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#b0b3c7' }} />
            <input 
              placeholder="Search teachers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%',
                padding: '12px 16px 12px 40px', 
                borderRadius: 8, 
                border: '1px solid #e5e7eb', 
                fontSize: 16,
                outline: 'none'
              }} 
            />
          </div>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            background: '#f5f6ff', 
            color: '#5d5fef', 
            border: '1px solid #e5e7eb',
            borderRadius: 8, 
            padding: '12px 16px', 
            fontWeight: 500, 
            cursor: 'pointer' 
          }}>
            <FaFilter /> Filter
          </button>
        </div>

        {/* Teachers Table */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(93,95,239,0.04)', padding: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>
              {showBanned ? 'Banned Teachers' : 'Active Teachers'} ({filteredTeachers.length})
            </div>
            <div>
              <button style={{ 
                border: '1px solid #e5e7eb', 
                background: '#f5f6ff', 
                color: '#5d5fef', 
                borderRadius: 8, 
                padding: '8px 16px', 
                marginRight: 8, 
                fontWeight: 500, 
                cursor: 'pointer' 
              }}>Export</button>
              <button style={{ 
                border: '1px solid #e5e7eb', 
                background: '#5d5fef', 
                color: '#fff', 
                borderRadius: 8, 
                padding: '8px 16px', 
                fontWeight: 500, 
                cursor: 'pointer' 
              }}>Add Teacher</button>
            </div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
            <thead>
              <tr style={{ color: '#b0b3c7', textAlign: 'left', fontWeight: 600 }}>
                <th style={{ padding: '12px 8px' }}></th>
                <th style={{ padding: '12px 8px' }}>TEACHER NAME</th>
                <th style={{ padding: '12px 8px' }}>EMAIL</th>
                <th style={{ padding: '12px 8px' }}>COURSES</th>
                <th style={{ padding: '12px 8px' }}>STUDENTS</th>
                <th style={{ padding: '12px 8px' }}>RATING</th>
                <th style={{ padding: '12px 8px' }}>JOIN DATE</th>
                <th style={{ padding: '12px 8px' }}>STATUS</th>
                <th style={{ padding: '12px 8px' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, idx) => (
                <tr key={teacher.id} style={{ borderTop: idx === 0 ? 'none' : '1px solid #f0f1f3' }}>
                  <td style={{ padding: '12px 8px' }}>
                    <input type="checkbox" />
                  </td>
                  <td style={{ padding: '12px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={teacher.avatar} alt={teacher.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                    <span style={{ fontWeight: 600 }}>{teacher.name}</span>
                  </td>
                  <td style={{ padding: '12px 8px', color: '#666' }}>{teacher.email}</td>
                  <td style={{ padding: '12px 8px' }}>{teacher.courses}</td>
                  <td style={{ padding: '12px 8px' }}>{teacher.students}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ 
                      background: '#e6f9f0', 
                      color: '#34c759', 
                      borderRadius: 8, 
                      padding: '4px 8px', 
                      fontWeight: 500, 
                      fontSize: 14 
                    }}>
                      ⭐ {teacher.rating}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', color: '#666' }}>{teacher.joinDate}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ 
                      background: teacher.isBanned ? '#ffe6e6' : '#e6f9f0', 
                      color: teacher.isBanned ? '#ff4757' : '#34c759', 
                      borderRadius: 8, 
                      padding: '4px 14px', 
                      fontWeight: 500, 
                      fontSize: 14 
                    }}>
                      {teacher.isBanned ? 'Banned' : 'Active'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#5d5fef', 
                        cursor: 'pointer',
                        padding: '4px'
                      }}>
                        <FaEye />
                      </button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#ffb020', 
                        cursor: 'pointer',
                        padding: '4px'
                      }}>
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleBanUser(teacher)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#ff4757', 
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
            <div style={{ color: '#b0b3c7', fontSize: 14 }}>{filteredTeachers.length} results</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1,2,3,4,'...',10,11].map((n, i) => (
                <button key={i} style={{ 
                  background: n===1 ? '#5d5fef' : '#f5f6ff', 
                  color: n===1 ? '#fff' : '#5d5fef', 
                  border: 'none', 
                  borderRadius: 8, 
                  width: 32, 
                  height: 32, 
                  fontWeight: 600, 
                  cursor: 'pointer' 
                }}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Ban User Modal */}
      {banModalOpen && selectedUser && (
        <BanUserModal
          isOpen={banModalOpen}
          onClose={() => setBanModalOpen(false)}
          user={selectedUser}
          userType="Teacher"
          onBanSuccess={handleBanSuccess}
        />
      )}
    </div>
  );
};

export default TeachersPage; 