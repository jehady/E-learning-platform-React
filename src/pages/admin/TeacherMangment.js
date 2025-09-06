import React, { useState, useEffect, useCallback } from 'react';
import { FaBan, FaSearch, FaFilter, FaEye, } from 'react-icons/fa';

import { apiService } from '../../utils/api';


const TeacherMangment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequest, setShowRequest] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);   // ✅ added
  const [error, setError] = useState(null);        // ✅ added

  
   const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiService.get("/api/show_all_teachers");
      console.log("Teachers API response:", res);

      const teachersFromApi = Array.isArray(res) ? res : [];

      const mappedTeachers = teachersFromApi.map((t) => ({
        id: t.id,
        name: t.username,
        email: t.email,
        avatar: `https://ui-avatars.com/api/?name=${t.username}`,
        status: t.is_approved === 1 ? "Active" : "Request",
        isRequest: t.is_approved === 0,
      }));

      setTeachers(mappedTeachers);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError("Failed to load teachers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleApproveTeacher = async () => {
    if (!selectedTeacher) return;
    if (confirmInput.toLowerCase() !== "verify") {
      alert("❌ You must type 'verify' to confirm.");
      return;
    }

    try {
      setLoading(true);
      const res = await apiService.post(
        `/api/handle_teacher_request/${selectedTeacher.id}?is_approved=yes`
      );
      console.log("Teacher approved:", res);

      alert(`✅ ${selectedTeacher.name} has been verified!`);
      setConfirmOpen(false);
      setConfirmInput('');
      setSelectedTeacher(null);
      fetchTeachers(); // refresh list
    } catch (err) {
      console.error("Error approving teacher:", err);
      alert("❌ Failed to approve teacher.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRequestFilter = showRequest ? teacher.isRequest : !teacher.isRequest;
    return matchesSearch && matchesRequestFilter;
  });

  
 

  const sidebarItems = [
    { icon: '📊', label: 'Dashboard', path: '/subadmin' },
    { icon: '👩‍🏫', label: 'Teachers', path: '/teachers', active: true },
    { icon: '🎓', label: 'Students', path: '/students' },
    { icon: '🔔', label: 'Notifications', path: '/notifications' },
    { icon: '🔗', label: 'Integrations', path: '/integrations' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f8f9fb',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: '#fff',
          borderRight: '1px solid #f0f1f3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              padding: '32px 0 24px 32px',
              fontWeight: 700,
              fontSize: 24,
              color: '#5d5fef',
              letterSpacing: 1,
            }}
          >
            Logo
          </div>
          <nav>
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 32px',
                  background: item.active ? '#f5f6ff' : 'none',
                  color: item.active ? '#5d5fef' : '#222',
                  borderRadius: 8,
                  margin: '0 16px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 18, marginRight: 16 }}>{item.icon}</span>{' '}
                {item.label}
              </div>
            ))}
          </nav>
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#b0b3c7',
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          Made with <span style={{ color: '#5d5fef' }}>Yisily</span>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 40px', minWidth: 0 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: '#5d5fef' }}>
            Teachers Management
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setShowRequest(!showRequest)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: showRequest ? '#ff4757' : '#f5f6ff',
                color: showRequest ? '#fff' : '#5d5fef',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              <FaBan /> {showRequest ? 'Show Active' : 'Show Request'}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <FaSearch
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#b0b3c7',
              }}
            />
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
                outline: 'none',
              }}
            />
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#f5f6ff',
              color: '#5d5fef',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: '12px 16px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <FaFilter /> Filter
          </button>
        </div>

        {/* Teachers Table */}
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 8px rgba(93,95,239,0.04)',
            padding: 32,
          }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>
                  {showRequest ? 'Request Teachers' : 'Active Teachers'} (
                  {filteredTeachers.length})
                </div>
                <div>
                  <button
                    style={{
                      border: '1px solid #e5e7eb',
                      background: '#f5f6ff',
                      color: '#5d5fef',
                      borderRadius: 8,
                      padding: '8px 16px',
                      marginRight: 8,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Export
                  </button>
                  <button
                    style={{
                      border: '1px solid #e5e7eb',
                      background: '#5d5fef',
                      color: '#fff',
                      borderRadius: 8,
                      padding: '8px 16px',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Add Teacher
                  </button>
                </div>
              </div>

              <table
                style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}
              >
                <thead>
                  <tr style={{ color: '#b0b3c7', textAlign: 'left', fontWeight: 600 }}>
                    <th style={{ padding: '12px 8px' }}></th>
                    <th style={{ padding: '12px 8px' }}>TEACHER NAME</th>
                    <th style={{ padding: '12px 8px' }}>EMAIL</th>
                    <th style={{ padding: '12px 8px' }}>STATUS</th>
                    <th style={{ padding: '12px 8px' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher, idx) => (
                    <tr
                      key={teacher.id}
                      style={{ borderTop: idx === 0 ? 'none' : '1px solid #f0f1f3' }}
                    >
                      <td style={{ padding: '12px 8px' }}>
                        <input type="checkbox" />
                      </td>
                      <td
                        style={{
                          padding: '12px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          style={{ width: 40, height: 40, borderRadius: '50%' }}
                        />
                        <span style={{ fontWeight: 600 }}>{teacher.name}</span>
                      </td>
                      <td style={{ padding: '12px 8px', color: '#666' }}>
                        {teacher.email}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span
                          style={{
                            background: teacher.isRequest ? '#ffe6e6' : '#e6f9f0',
                            color: teacher.isRequest ? '#ff4757' : '#34c759',
                            borderRadius: 8,
                            padding: '4px 14px',
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          {teacher.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                          onClick={() => {
                          setSelectedTeacher(teacher);
                          setConfirmOpen(true);
                        }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#5d5fef',
                              cursor: 'pointer',
                              padding: '4px',
                            }}
                          >
                            <FaEye />
                          </button>
                    

                         
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 24,
                }}
              >
                <div style={{ color: '#b0b3c7', fontSize: 14 }}>
                  {filteredTeachers.length} results
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, '...', 10, 11].map((n, i) => (
                    <button
                      key={i}
                      style={{
                        background: n === 1 ? '#5d5fef' : '#f5f6ff',
                        color: n === 1 ? '#fff' : '#5d5fef',
                        border: 'none',
                        borderRadius: 8,
                        width: 32,
                        height: 32,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {confirmOpen && selectedTeacher && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: 32,
              borderRadius: 12,
              width: '400px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              textAlign: 'center',
            }}
          >
            <h2 style={{ marginBottom: 16, color: '#222' }}>Confirm Verification</h2>
            <p style={{ marginBottom: 16 }}>
              Are you sure you want to verify <strong>{selectedTeacher.name}</strong>? <br />
              Type <strong style={{ color: '#5d5fef' }}>verify</strong> below to confirm.
            </p>
            <input
              type="text"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder="Type verify to confirm"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 8,
                border: '1px solid #ccc',
                marginBottom: 16,
                textAlign: 'center',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <button
                onClick={() => setConfirmOpen(false)}
                style={{
                  background: '#ccc',
                  color: '#222',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 20px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleApproveTeacher}
                style={{
                  background: '#5d5fef',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 20px',
                  cursor: 'pointer',
                }}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
              </div>
              
            </>
          )}
          
        </div>
      </main>
      



    </div>
  );
};

export default TeacherMangment;
